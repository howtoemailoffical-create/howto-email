/** Browser-side routing diagnostics. Received fields are untrusted assertions. */
const MAX_HOPS=250;
export function normalizeHost(value) {
 const match=/^([a-z0-9_][a-z0-9_.-]*|\[[\da-f:.]+\])/i.exec(String(value||'').trim());
 return (match?.[1]||'').toLowerCase().replace(/^\[/,'').replace(/\]$/,'').replace(/\.$/,'');
}
export function parseReceived(raw) {
 const value=String(raw||''),pos=value.lastIndexOf(';');
 const stamp=pos>=0?value.slice(pos+1).trim():'',parsed=stamp?Date.parse(stamp):NaN;
 const from=value.match(/\bfrom\s+(.+?)(?=\s+by\s+|;|$)/i)?.[1]||'Unknown source';
 const by=value.match(/\bby\s+(.+?)(?=\s+(?:with|id|for|via)\s+|;|$)/i)?.[1]||'Unknown receiver';
 return {from,by,fromHost:normalizeHost(from),byHost:normalizeHost(by),protocol:value.match(/\bwith\s+([a-z0-9_-]+)/i)?.[1]||'',stamp,ms:Number.isFinite(parsed)?parsed:null,ip:from.match(/\[(\d{1,3}(?:\.\d{1,3}){3})\]/)?.[1]||'',raw:value};
}
export function extractQueueEvidence(headers=[]) {
 const names=new Set(['x-queue-history','x-delivery-diagnostics','x-loop-diagnostics','x-postfix-queue-id']);
 const rows=[];
 for(const item of headers) {
  const name=String(item.key||'').toLowerCase();
  if(!names.has(name))continue;
  const raw=String(item.value||'').slice(0,1500);
  rows.push({name,raw,temporaryFailures:[...raw.matchAll(/\b4\d\d\s+4\.\d+\.\d+\b/g)].map(m=>m[0])});
  if(rows.length>=12)break;
 }
 return rows;
}
function finding(id,level,title,summary,evidence,action,confidence='Moderate') {
 return {id,level,title,summary,evidence,action,confidence};
}
export function analyzeReceivedTrace(rawReceived=[],thresholds={elevated:60,long:300},headers=[]) {
 // RFC Received fields are listed newest first.
 const hops=rawReceived.slice(0,MAX_HOPS).map(parseReceived).reverse(),intervals=[],findings=[];
 let elevated=0,long=0,skew=0;
 for(let i=1;i<hops.length;i++){
  const a=hops[i-1],b=hops[i],seconds=a.ms!==null&&b.ms!==null?(b.ms-a.ms)/1000:null;
  const severity=seconds===null?'unknown':seconds<0?'clock-skew':seconds>thresholds.long?'long':seconds>=thresholds.elevated?'elevated':'normal';
  if(severity==='long')long++;if(severity==='elevated')elevated++;if(severity==='clock-skew')skew++;
  intervals.push({fromHop:i,toHop:i+1,seconds,severity,evidence:a.raw+'\n---\n'+b.raw});
 }
 const edges=new Map();
 hops.forEach((h,i)=>{
  if(!h.fromHost||!h.byHost||h.fromHost==='unknown'||h.byHost==='unknown')return;
  const edge=h.fromHost+' -> '+h.byHost,list=edges.get(edge)||[];
  list.push(i);edges.set(edge,list);
 });
 const repeats=[...edges.entries()].filter(([,indices])=>indices.length>=2);
 if(repeats.length)findings.push(finding('routing-repeat','warning','Possible mail-routing loop',
  'The same relay handoff occurs more than once. A forwarding or transport-map loop is possible; duplicate or forged Received fields can produce a similar pattern.',
  repeats.slice(0,4).map(([edge,indices])=>edge+' (hops '+indices.map(i=>i+1).join(', ')+')\n'+indices.slice(0,2).map(i=>hops[i].raw).join('\n')).join('\n\n'),
  'Check forwarding rules, routing connectors, transport maps and message-tracking logs.'));
 if(long)findings.push(finding('routing-long','warning',long+' long trace interval(s)',
  'Adjacent Received timestamps differ by more than '+thresholds.long+' seconds. This does not prove an SMTP retry or identify a responsible server.',
  intervals.filter(x=>x.severity==='long').sort((a,b)=>b.seconds-a.seconds).slice(0,3).map(x=>'Hops '+x.fromHop+'–'+x.toHop+': '+Math.round(x.seconds)+' seconds\n'+x.evidence).join('\n\n'),
  'Inspect queue telemetry, transport logs, filtering and retry schedules.'));
 if(elevated)findings.push(finding('routing-elevated','advisory',elevated+' elevated trace interval(s)',
  'Intervals exceeded the configurable '+thresholds.elevated+'-second threshold; this is a heuristic, not proof of a fault.',
  intervals.filter(x=>x.severity==='elevated').slice(0,3).map(x=>'Hops '+x.fromHop+'–'+x.toHop+': '+Math.round(x.seconds)+' seconds').join('\n'),
  'Compare against normal traffic for your environment.','Low'));
 if(skew)findings.push(finding('routing-skew','advisory','Inconsistent Received timestamps',
  skew+' adjacent interval(s) run backward in time. Clock skew, edited headers or inconsistent Received order may explain this.',
  intervals.filter(x=>x.severity==='clock-skew').slice(0,3).map(x=>'Hops '+x.fromHop+'–'+x.toHop+': '+Math.round(x.seconds)+' seconds\n'+x.evidence).join('\n\n'),
  'Verify clocks and trust boundaries for the relevant servers.'));
 const queueEvidence=extractQueueEvidence(headers),deferrals=queueEvidence.flatMap(x=>x.temporaryFailures);
 if(deferrals.length)findings.push(finding('queue-evidence','advisory','Queue retry diagnostics present',
  'Non-standard diagnostic headers report '+deferrals.length+' temporary SMTP response(s). These are claims, not verified server logs.',
  queueEvidence.filter(x=>x.temporaryFailures.length).map(x=>x.name+': '+x.raw).join('\n'),
  'Correlate queue IDs and timestamps with server logs.','Low'));
 if(rawReceived.length>MAX_HOPS)findings.push(finding('trace-truncated','advisory','Received trace truncated',
  'Only '+MAX_HOPS+' fields were analyzed for performance.','','Review complete headers.','High'));
 if(!hops.length)findings.push(finding('no-received','info','No Received trace available','No Received fields were provided.','','Obtain the original full headers.','High'));
 const timed=hops.filter(x=>x.ms!==null),elapsedSeconds=timed.length>=2&&timed.at(-1).ms>=timed[0].ms?(timed.at(-1).ms-timed[0].ms)/1000:null;
 return {hops,intervals,findings,queueEvidence,elapsedSeconds,count:{elevated,long,skew,loopEdges:repeats.length}};
}
