const UPSTREAM='https://dmarc.mx/api/check';
function json(body,status=200,headers={}){return new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff',...headers}})}
function validDomain(v){if(!v||v.length>253)return false;if(v.endsWith('.'))v=v.slice(0,-1);if(!v.includes('.')||/[^a-z0-9.-]/i.test(v))return false;return v.split('.').every(l=>l.length>0&&l.length<=63&&!l.startsWith('-')&&!l.endsWith('-'))}
async function txt(name){try{const r=await fetch('https://cloudflare-dns.com/dns-query?name='+encodeURIComponent(name)+'&type=TXT',{headers:{accept:'application/dns-json'}});if(!r.ok)return[];const d=await r.json();return(d.Answer||[]).filter(x=>x.type===16).map(x=>String(x.data||'').replace(/^"|"$/g,'').replace(/"\s+"/g,''))}catch{return[]}}
async function addLiteralRecords(data,domain){
 const p=data.protocols||{},records={};
 if(p.dmarc?.record)records.dmarc=[{name:'_dmarc.'+domain,type:'TXT',value:p.dmarc.record}];
 if(p.spf?.record)records.spf=[{name:domain,type:'TXT',value:p.spf.record}];
 if(p.bimi?.record)records.bimi=[{name:'default._bimi.'+domain,type:'TXT',value:p.bimi.record}];
 if(p.mta_sts?.dns_record)records.mta_sts=[{name:'_mta-sts.'+domain,type:'TXT',value:p.mta_sts.dns_record}];
 if(p.mta_sts?.policy)records.mta_sts_policy=[{name:'https://mta-sts.'+domain+'/.well-known/mta-sts.txt',type:'POLICY',value:['version: '+p.mta_sts.policy.version,'mode: '+p.mta_sts.policy.mode,...(p.mta_sts.policy.mx||[]).map(x=>'mx: '+x),'max_age: '+p.mta_sts.policy.max_age].join('\n')}];
 if(p.tls_rpt?.record)records.tls_rpt=[{name:'_smtp._tls.'+domain,type:'TXT',value:p.tls_rpt.record}];
 if(Array.isArray(p.mx?.records))records.mx=p.mx.records.map(x=>({name:domain,type:'MX',value:x.priority+' '+x.exchange}));
 const selectors=Object.entries(p.dkim?.selectors||{}).filter(([,v])=>v?.found).slice(0,12);
 if(selectors.length){records.dkim=(await Promise.all(selectors.map(async([selector])=>{const name=selector+'._domainkey.'+domain,values=await txt(name);return values.map(value=>({name,type:'TXT',value,selector}))}))).flat()}
 data.howto_records=records;return data;
}
export default{async fetch(request,env){const url=new URL(request.url);if(url.pathname!=='/api/domain-check')return env.ASSETS.fetch(request);if(request.method!=='GET')return json({error:'Method not allowed.'},405,{allow:'GET'});const domain=(url.searchParams.get('domain')||'').trim().toLowerCase().replace(/\.$/,'');if(!validDomain(domain))return json({error:'Enter a valid domain name, such as example.com.'},400);const cache=caches.default,cacheKey=new Request(url.origin+'/api/domain-check?domain='+encodeURIComponent(domain)+'&v=2'),cached=await cache.match(cacheKey);if(cached)return cached;try{const upstream=await fetch(UPSTREAM+'?domain='+encodeURIComponent(domain),{headers:{accept:'application/json','user-agent':'howto.email-domain-check/1.1'},cf:{cacheTtl:0}});if(!upstream.ok){if(upstream.status===429)return json({error:'The lookup service is temporarily rate limited. Try again shortly.'},503);return json({error:'The lookup service could not analyze this domain right now.'},502)}let data=await upstream.json();data=await addLiteralRecords(data,domain);const response=new Response(JSON.stringify(data),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=300','x-content-type-options':'nosniff'}});await cache.put(cacheKey,response.clone());return response}catch{return json({error:'The lookup service is unavailable right now.'},502)}}};
