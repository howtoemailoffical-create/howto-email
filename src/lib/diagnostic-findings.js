/**
 * Shared, dependency-free diagnostic finding model and accessible DOM renderer.
 * Checks remain owned by each analyzer; this module never infers a failure.
 */
export const FINDING_LEVELS = Object.freeze(['error','warning','advisory','info','pass']);
export function finding({id,title,level='info',summary='',evidence='',action='',href='',linkText='Read guidance'}){
  if(!FINDING_LEVELS.includes(level))throw new TypeError('Unknown finding level');
  return {id:String(id||title),title:String(title),level,summary:String(summary),evidence:String(evidence),action:String(action),href:href.startsWith('/')?href:'',linkText:String(linkText)};
}
export function renderFindings(container,items,{heading='Diagnostic findings'}={}){
  container.replaceChildren();
  const section=document.createElement('section');
  section.className='diagnostic-findings';
  section.setAttribute('aria-label',heading);
  const h=document.createElement('h3');h.textContent=heading;section.append(h);
  const order={error:0,warning:1,advisory:2,info:3,pass:4};
  const sorted=[...items].sort((a,b)=>order[a.level]-order[b.level]);
  if(!sorted.length){const p=document.createElement('p');p.textContent='No findings available for this analysis.';section.append(p)}
  for(const item of sorted){
    const card=document.createElement('article');card.className='diagnostic-finding';card.dataset.level=item.level;
    const head=document.createElement('div');head.className='diagnostic-finding-head';
    const label=document.createElement('span');label.className='diagnostic-finding-level';label.textContent=item.level==='advisory'?'Advisory':item.level.charAt(0).toUpperCase()+item.level.slice(1);
    const title=document.createElement('h4');title.textContent=item.title;head.append(label,title);card.append(head);
    if(item.summary){const p=document.createElement('p');p.textContent=item.summary;card.append(p)}
    if(item.action){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent='Next step: ';p.append(strong,document.createTextNode(item.action));card.append(p)}
    if(item.href){const link=document.createElement('a');link.href=item.href;link.textContent=item.linkText+' →';card.append(link)}
    if(item.evidence){const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Evidence';const pre=document.createElement('pre');pre.textContent=item.evidence;details.append(summary,pre);card.append(details)}
    section.append(card);
  }
  container.append(section);
}
