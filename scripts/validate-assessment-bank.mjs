// Verify a PRIVATE question bank before uploading it to Cloudflare KV.
// Never commit the bank or its answers to the public repository.
import {readFile} from 'node:fs/promises';

const path = process.argv[2];
if (!path) {
  console.error('Usage: npm run validate:assessment-bank -- /path/to/private-question-bank.json');
  process.exit(2);
}
const allowed = new Set(['Fundamentals','Authentication','Security','Deliverability','Troubleshooting']);
const errors = [];
let bank;
try {bank = JSON.parse(await readFile(path, 'utf8'));}
catch (e) {console.error('Unable to read question bank:',e.message);process.exit(1);}
if (!Array.isArray(bank)) {console.error('Question bank must be a JSON array');process.exit(1);}
if (bank.length < 200 || bank.length > 1000) errors.push('Expected 200 to 1000 questions; received '+bank.length);
const ids = new Set(), questions = new Set(), categories = Object.fromEntries([...allowed].map(c=>[c,0]));
bank.forEach((q,i)=>{
  const location='Question '+(i+1)+': ';
  if (!q || typeof q !== 'object') {errors.push(location+'not an object');return;}
  if (typeof q.id!=='string' || !/^[a-z0-9-]{2,64}$/i.test(q.id)) errors.push(location+'invalid ID');
  else if (ids.has(q.id)) errors.push(location+'duplicate ID'); else ids.add(q.id);
  if (!allowed.has(q.category)) errors.push(location+'unexpected category');
  else categories[q.category]++;
  if (typeof q.question!=='string' || q.question.length<16 || q.question.length>=600) errors.push(location+'invalid question text');
  else if (questions.has(q.question.trim().toLowerCase())) errors.push(location+'duplicate question wording');
  else questions.add(q.question.trim().toLowerCase());
  if (!Array.isArray(q.choices) || q.choices.length!==4 ||
      q.choices.some(c=>typeof c!=='string' || !c.trim() || c.length>=300) ||
      new Set(q.choices).size!==4) errors.push(location+'choices must be four distinct short strings');
  if (!Number.isInteger(q.correct) || q.correct<0 || q.correct>3) errors.push(location+'invalid correct choice index');
  if (typeof q.explanation!=='string' || q.explanation.length<11 || q.explanation.length>=700) errors.push(location+'missing or invalid explanation');
  if (typeof q.url!=='string' || !/^\/(?!\/)[a-z0-9/-]+\/$/i.test(q.url)) errors.push(location+'invalid internal reference URL');
});
for (const [category,count] of Object.entries(categories)) if(count<40) errors.push(category+' needs at least 40 questions, has '+count);
if (errors.length) {
  console.error('Question bank did not pass validation:\n'+errors.slice(0,30).join('\n')+
    (errors.length>30 ? '\n... and '+(errors.length-30)+' more issues' : ''));
  process.exit(1);
}
console.log('Validated '+bank.length+' private questions. Topic totals: '+JSON.stringify(categories));
console.log('The validation output excludes question text and correct answers.');