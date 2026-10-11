/** Shared, conservative DNS syntax checks. Sender compliance requires live message testing. */
export function validateEmailDns(type, value) {
 const v=String(value||'').trim(),issues=[];
 if(!v){issues.push('Record is empty');return {status:'fail',issues};}
 if(type==='SPF'){
  if(!/^v=spf1(?:\s|$)/i.test(v))issues.push('SPF must begin with v=spf1');
  if((v.match(/\bv=spf1\b/gi)||[]).length!==1)issues.push('Exactly one SPF version token is required');
  if(!/(?:^|\s)[~+?-]all(?:\s|$)/.test(v)&&!/\bredirect=/.test(v))issues.push('No explicit all mechanism or redirect');
  const terms=v.split(/\s+/).slice(1);if(terms.some(t=>!/^(?:[+?~-]?(?:all|a(?::[^\s]+)?|mx(?::[^\s]+)?|ip4:[^\s]+|ip6:[^\s]+|include:[^\s]+|exists:[^\s]+|ptr(?::[^\s]+)?)|redirect=[^\s]+|exp=[^\s]+)$/.test(t)))issues.push('Unrecognized SPF mechanism or modifier');
 }else if(type==='DMARC'){
  if(!/^v=DMARC1\s*;/i.test(v))issues.push('DMARC must begin with v=DMARC1;');
  const tags=v.split(';').map(x=>x.trim()).filter(Boolean).map(x=>x.split('=')[0].trim().toLowerCase());
  if(new Set(tags).size!==tags.length)issues.push('Duplicate DMARC tag');
  if(!/\bp=(?:none|quarantine|reject)(?:\s*;|\s*$)/i.test(v))issues.push('DMARC requires p=none, quarantine, or reject');
 }else if(type==='MTA-STS'){
  if(!/^v=STSv1\s*;/i.test(v)||!/\bid=[a-z0-9]+\b/i.test(v))issues.push('MTA-STS requires v=STSv1 and an id');
 }else if(type==='TLS-RPT'){
  if(!/^v=TLSRPTv1\s*;/i.test(v)||!/\brua=(?:mailto:|https:\/\/)/i.test(v))issues.push('TLS-RPT requires v=TLSRPTv1 and a reporting URI');
 }else if(type==='BIMI'){
  if(!/^v=BIMI1\s*;/i.test(v))issues.push('BIMI must begin with v=BIMI1;');
 }else if(type==='DKIM'){
  if(!/\bv=DKIM1\b/i.test(v))issues.push('DKIM TXT should contain v=DKIM1');
  if(!/\bp=[a-z0-9+/=]+/i.test(v))issues.push('DKIM public key is missing');
 }
 return {status:issues.length?'warning':'pass',issues};
}
export function senderReadinessNote(){return 'DNS syntax alone cannot certify Google or Yahoo sender compliance. Verify actual SPF/DKIM authentication and DMARC alignment, forward and reverse DNS, TLS, complaint rates, and bulk-sender unsubscribe requirements.';}
