// Cloudflare Worker assessment API. The private bank is loaded from KV, never bundled in public source.
// Bind QUESTION_BANK (KV), and set SIGNING_SECRET with wrangler secret put SIGNING_SECRET.
// KV key "assessment-v1" must contain an array of 200 reviewed question objects:
// {id,category,question,choices:[...],correct:0..3}. Do not store names, emails or user submissions.
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","access-control-allow-origin":"https://howto.email","vary":"Origin"}});
const enc=new TextEncoder();
const b64=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const unb64=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
async function key(secret){return crypto.subtle.importKey('raw',enc.encode(secret),'HMAC',{hash:'SHA-256'},false,['sign','verify'])}
async function sign(k,payload){const body=b64(enc.encode(JSON.stringify(payload)));return body+'.'+b64(await crypto.subtle.sign('HMAC',k,enc.encode(body)))}
async function verify(k,token){if(typeof token!=='string'||token.length>8000)return null;const parts=token.split('.');if(parts.length!==2)return null;try{if(!await crypto.subtle.verify('HMAC',k,unb64(parts[1]),enc.encode(parts[0])))return null;return JSON.parse(new TextDecoder().decode(unb64(parts[0])))}catch{return null}}
function sample(items,n){const a=[...items];for(let i=a.length-1;i>0;i--){const v=new Uint32Array(1);crypto.getRandomValues(v);const j=v[0]%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
async function bank(env){const b=await env.QUESTION_BANK.get('assessment-v1',{type:'json'});if(!Array.isArray(b)||b.length<200||new Set(b.map(q=>q.id)).size!==b.length||b.some(q=>typeof q.id!=='string'||typeof q.question!=='string'||!Array.isArray(q.choices)||q.choices.length<2||q.choices.length>6||q.choices.some(c=>typeof c!=='string')||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.choices.length))throw Error('Question bank unavailable');return b}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'access-control-allow-origin':'https://howto.email','access-control-allow-methods':'GET, POST, OPTIONS','access-control-allow-headers':'content-type'}});
 if(request.headers.get('origin')&&request.headers.get('origin')!=='https://howto.email')return json({error:'Origin not allowed'},403);
 if(!env.SIGNING_SECRET||!env.QUESTION_BANK)return json({error:'Assessment not configured'},503);
 const k=await key(env.SIGNING_SECRET);
 if(url.pathname==='/api/assessment/verify'&&request.method==='GET'){
  const p=await verify(k,url.searchParams.get('token'));const valid=!!(p&&p.kind==='credential'&&p.version===1&&p.passed===true&&Number.isInteger(p.score)&&p.score>=32&&p.score<=40&&p.total===40&&typeof p.id==='string'&&typeof p.issued==='string');return json({valid,credential:valid?{id:p.id,score:p.score,total:p.total,issued:p.issued,assessment:'HowToEmail Email Knowledge Assessment'}:null});
 }
 if(url.pathname==='/api/assessment/start'&&request.method==='POST'){
  try{const b=await bank(env);const qs=sample(b,40);const issued=Date.now();const ids=qs.map(q=>q.id);const token=await sign(k,{kind:'session',version:1,ids,issued,expires:issued+60*60*1000,nonce:crypto.randomUUID()});return json({token,expires:issued+60*60*1000,questions:qs.map(q=>({id:q.id,category:q.category,question:q.question,choices:q.choices}))})}catch{return json({error:'Assessment unavailable'},503)}
 }
 if(url.pathname==='/api/assessment/submit'&&request.method==='POST'){
  let data;try{data=await request.json()}catch{return json({error:'Invalid JSON'},400)}
  const p=await verify(k,data?.token);
  if(!p||p.kind!=='session'||p.version!==1||!Array.isArray(p.ids)||p.ids.length!==40||new Set(p.ids).size!==40||!Number.isFinite(p.expires)||!Number.isFinite(p.issued)||p.expires-p.issued!==3600000||Date.now()>p.expires||Date.now()<p.issued)return json({error:'Invalid or expired session'},400);
  if(!data.answers||typeof data.answers!=='object'||Array.isArray(data.answers)||Object.keys(data.answers).length>40)return json({error:'Invalid answers'},400);
  let b;try{b=await bank(env)}catch{return json({error:'Assessment unavailable'},503)}
  const byId=new Map(b.map(q=>[q.id,q]));let score=0;
  for(const id of p.ids){const q=byId.get(id);if(!q)return json({error:'Assessment version unavailable'},409);if(Number.isInteger(data.answers[id])&&data.answers[id]===q.correct)score++}
  const passed=score>=32;const result={score,total:40,passed,percentage:Math.round(score/40*100)};
  if(passed){const credential={kind:'credential',version:1,id:crypto.randomUUID(),score,total:40,passed:true,issued:new Date().toISOString()};result.credentialToken=await sign(k,credential);result.credentialId=credential.id}
  return json(result);
 }
 return json({error:'Not found'},404);
}};