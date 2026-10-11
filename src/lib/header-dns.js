/** Optional DNS enrichment: only the selected public domain and public IPv4 addresses are sent. */
export function validDomain(name) {
 return typeof name==='string' && /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(name);
}
export function isPublicIPv4(value){
 if(!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value||''))return false;
 const p=value.split('.').map(Number);
 if(p.some(n=>n<0||n>255)||p[0]===0||p[0]>=224)return false;
 if(p[0]===10||p[0]===127||p[0]===169&&p[1]===254||p[0]===172&&p[1]>=16&&p[1]<=31||p[0]===192&&p[1]===168)return false;
 if(p[0]===100&&p[1]>=64&&p[1]<=127||p[0]===192&&p[1]===0&&p[2]===0||p[0]===192&&p[1]===0&&p[2]===2)return false;
 if(p[0]===198&&(p[1]===18||p[1]===19||p[1]===51&&p[2]===100)||p[0]===203&&p[1]===0&&p[2]===113)return false;
 if(p[0]===192&&p[1]===88&&p[2]===99)return false;
 return true;
}
export function reverseIPv4(ip){return ip.split('.').reverse().join('.')+'.in-addr.arpa'}
function unquote(data){return String(data||'').replace(/^"|"$/g,'').replace(/"\s+"/g,'').trim()}
export async function queryDns(name,type,{fetchFn=fetch,signal}={}){
 const url=new URL('https://dns.google/resolve');
 url.searchParams.set('name',name);url.searchParams.set('type',type);
 const response=await fetchFn(url.toString(),{headers:{accept:'application/dns-json'},signal});
 if(!response.ok)throw Error('DNS resolver HTTP '+response.status);
 const payload=await response.json();
 if(typeof payload.Status!=='number')throw Error('Unexpected DNS response');
 if(payload.Status!==0&&payload.Status!==3)throw Error('DNS response code '+payload.Status);
 const types={TXT:16,MX:15,PTR:12};
 const records=Array.isArray(payload.Answer)?payload.Answer.filter(x=>x.type===types[type]).slice(0,15).map(x=>unquote(x.data)):[];
 return {records,rcode:payload.Status};
}
export async function verifyHeaderDns({domain,ips=[]},{fetchFn=fetch,timeoutMs=9000}={}){
 if(!validDomain(domain))throw TypeError('Invalid public domain');
 const publicIps=[...new Set(ips.filter(isPublicIPv4))].slice(0,2);
 const requests=[
  {name:domain,type:'TXT',label:'SPF',match:x=>/^v=spf1(?:\s|$)/i.test(x)},
  {name:'_dmarc.'+domain,type:'TXT',label:'DMARC',match:x=>/^v=DMARC1\s*;/i.test(x)},
  {name:domain,type:'MX',label:'MX',match:()=>true},
  ...publicIps.map(ip=>({name:reverseIPv4(ip),type:'PTR',label:'PTR for '+ip,match:()=>true}))
 ];
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  const results=await Promise.all(requests.map(async item=>{
   try{
    const response=await queryDns(item.name,item.type,{fetchFn,signal:controller.signal});
    const records=response.records.filter(item.match);
    return {label:item.label,name:item.name,type:item.type,state:records.length?'found':'not-found',records,message:records.length?'Record found':'No matching record returned (not necessarily a sending failure)'};
   }catch(error){
    return {label:item.label,name:item.name,type:item.type,state:'unavailable',records:[],message:error?.name==='AbortError'?'Lookup timed out':'DNS lookup unavailable: '+String(error?.message||'request failed')};
   }
  }));
  return {domain,checkedAt:new Date().toISOString(),resolver:'Google Public DNS over HTTPS',results,warning:'This is a point-in-time public DNS lookup, not proof of historical SPF, DKIM or DMARC authentication. No raw message headers were sent.'};
 }finally{clearTimeout(timer)}
}
