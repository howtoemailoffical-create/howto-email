/** Conservative shared email DNS validation. Passing syntax is not proof of deliverability. */
export function validateEmailDns(type, raw) {
 const v=String(raw??'').trim(), issues=[];
 if(!v)return {status:'fail',issues:['Missing record value']};
 if(type==='SPF'){
  if(!/^v=spf1(?:\s|$)/i.test(v))issues.push('SPF must start with v=spf1');
  const terms=v.split(/\s+/).slice(1);
  if(terms.some(x=>!/^(?:[+?~-]?(?:all|a(?::[^\s]+)?(?:\/\d+)?|mx(?::[^\s]+)?(?:\/\d+)?|ip4:[^\s]+|ip6:[^\s]+|include:[^\s]+|exists:[^\s]+|ptr(?::[^\s]+)?)|redirect=[^\s]+|exp=[^\s]+)$/.test(x)))issues.push('Unknown SPF mechanism or modifier');
  if(terms.filter(x=>/^[+?~-]?all$/.test(x)).length>1)issues.push('Multiple all mechanisms');
 } else if(type==='DMARC'){
  if(!/^v=DMARC1\s*;/i.test(v))issues.push('DMARC must begin with v=DMARC1;');
  const tags=v.split(';').map(x=>x.trim()).filter(Boolean).map(x=>x.split('=')[0].trim().toLowerCase());
  if(tags.length!==new Set(tags).size)issues.push('Duplicate DMARC tag');
  if(!/(?:^|;)\s*p\s*=\s*(?:none|quarantine|reject)\s*(?:;|$)/i.test(v))issues.push('Missing or invalid DMARC policy');
 } else if(type==='MTA-STS'){
  if(!/^v=STSv1\s*;/i.test(v)||!/(?:^|;)\s*id=[a-z0-9]+\s*(?:;|$)/i.test(v))issues.push('MTA-STS requires STSv1 and id');
 } else if(type==='TLS-RPT'){
  if(!/^v=TLSRPTv1\s*;/i.test(v)||!/(?:^|;)\s*rua=(?:mailto:|https:\/\/)/i.test(v))issues.push('TLS-RPT requires version and reporting URI');
 } else if(type==='BIMI'){
  if(!/^v=BIMI1\s*;/i.test(v))issues.push('BIMI must start with v=BIMI1;');
 } else if(type==='DKIM'){
  if(!/(?:^|;)\s*p=[a-z0-9+/=]+/i.test(v))issues.push('Missing DKIM public key');
 }
 return {status:issues.length?'warning':'pass',issues};
}
export const senderReadinessNote='Google/Yahoo readiness cannot be certified from DNS syntax alone. Verify live SPF/DKIM authentication, DMARC alignment, PTR, TLS, spam complaints and unsubscribe requirements.';
