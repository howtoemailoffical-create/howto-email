import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeReceivedTrace,parseReceived,normalizeHost} from '../src/lib/header-trace.js';
import {validDomain,isPublicIPv4,reverseIPv4,verifyHeaderDns} from '../src/lib/header-dns.js';

const received=(from,by,clock)=>'from '+from+' ('+from+' [198.51.100.1]) by '+by+' with ESMTPS; Sun, 11 Oct 2026 '+clock+' +0000';
const trace=[
 received('a.example','b.example','10:00:00'),
 received('b.example','a.example','10:00:10'),
 received('a.example','b.example','10:00:20'),
 received('b.example','a.example','14:37:00')
];

test('Extracts hostnames and timestamps from Received fields',()=>{
 const hop=parseReceived(received('a.example','b.example','10:00:00'));
 assert.equal(hop.fromHost,'a.example');
 assert.equal(hop.byHost,'b.example');
 assert.equal(hop.ip,'198.51.100.1');
 assert.equal(hop.ms,Date.parse('2026-10-11T10:00:00Z'));
 assert.equal(normalizeHost('mail.example (comment)'),'mail.example');
});
test('Recognizes recurring relay handoffs and long delay',()=>{
 const result=analyzeReceivedTrace([...trace].reverse(),{elevated:60,long:300});
 assert.equal(result.hops.length,4);
 assert.equal(result.count.loopEdges,2);
 assert.equal(result.count.long,1);
 assert.equal(result.elapsedSeconds,4*3600+37*60);
 assert.ok(result.findings.some(x=>x.id==='routing-repeat'));
 assert.ok(result.findings.some(x=>x.id==='routing-long'));
});
test('Does not hallucinate SMTP retries from mere Received timestamps',()=>{
 const result=analyzeReceivedTrace([received('b.example','c.example','11:00:00'),received('a.example','b.example','10:00:00')]);
 assert.ok(!result.findings.some(x=>x.id==='queue-evidence'));
});
test('Records ambiguous negative timestamps as clock skew',()=>{
 const result=analyzeReceivedTrace([received('b.example','c.example','09:00:00'),received('a.example','b.example','10:00:00')]);
 assert.equal(result.count.skew,1);
});
test('Reports explicit queue-header evidence but calls it unverified',()=>{
 const result=analyzeReceivedTrace([],{elevated:60,long:300},[{key:'x-queue-history',value:'451 4.7.1 temporary deferral'}]);
 assert.ok(result.findings.some(x=>x.id==='queue-evidence'&&x.summary.includes('claims')));
});
test('Handles missing and malformed header timestamps',()=>{
 const result=analyzeReceivedTrace(['from nowhere'],{elevated:60,long:300});
 assert.equal(result.hops.length,1);
 assert.equal(result.elapsedSeconds,null);
});
test('Keeps private and documentation IPv4 out of external lookups',()=>{
 assert.equal(validDomain('example.com'),true);
 assert.equal(validDomain('not a domain'),false);
 for(const ip of ['10.0.0.1','127.0.0.1','198.51.100.1','203.0.113.5','192.168.1.2','999.1.1.1'])assert.equal(isPublicIPv4(ip),false);
 assert.equal(isPublicIPv4('8.8.8.8'),true);
 assert.equal(reverseIPv4('8.8.8.8'),'8.8.8.8.in-addr.arpa');
});
test('Looks up SPF, DMARC, MX and limited PTR with only selected public data',async()=>{
 const urls=[];
 const fetchFn=async url=>{
  urls.push(url);
  return {ok:true,json:async()=>({Status:0,Answer:url.includes('type=MX')?[{type:15,data:'10 mail.example.com.'}]:
   url.includes('type=PTR')?[{type:12,data:'dns.google.'}]:
   [{type:16,data:url.includes('_dmarc.')?'"v=DMARC1; p=none"':'"v=spf1 -all"'}]})};
 };
 const result=await verifyHeaderDns({domain:'example.com',ips:['8.8.8.8','198.51.100.1']},{fetchFn});
 assert.equal(result.results.length,4);
 assert.ok(result.results.every(x=>x.state==='found'));
 assert.ok(urls.every(x=>!x.includes('Subject:')&&!x.includes('198.51.100.1')));
});
test('Resolver errors show unavailable, never a false missing-record conclusion',async()=>{
 const result=await verifyHeaderDns({domain:'example.com'},{fetchFn:async()=>{throw Error('offline')}});
 assert.ok(result.results.every(x=>x.state==='unavailable'));
});