import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto, createHmac} from 'node:crypto';
import worker from './assessment.js';
globalThis.crypto ??= webcrypto;

const categories = ['Fundamentals','Authentication','Security','Deliverability','Troubleshooting'];
const questions = Array.from({length:200}, (_, i) => ({
  id: 'q' + String(i).padStart(3,'0'),
  category: categories[i % categories.length],
  question: 'What is the correct technical answer for question number ' + i + '?',
  choices: ['Option alpha','Option bravo','Option charlie','Option delta'],
  correct: i % 4,
  explanation: 'This is a detailed explanation about the correct choice.',
  url: '/reference/smtp/'
}));
let sourceBank = questions;
const redeemed = new Map();
const secret = 'local-test-secret-do-not-deploy';
const env = {
  SIGNING_SECRET: secret,
  QUESTION_BANK: {
    get: async (key) => key === 'assessment-v1' ? sourceBank : redeemed.get(key),
    put: async (key, value) => {redeemed.set(key, value);}
  }
};
function post(path, body, envOverride = env, origin = 'https://howto.email') {
  return worker.fetch(new Request('https://howto.email/api/assessment/' + path, {
    method:'POST',headers:{'content-type':'application/json',origin},body:JSON.stringify(body)
  }),envOverride);
}
async function data(path, body, envOverride) {
  return (await post(path,body,envOverride)).json();
}
function correctAnswers(session) {
  const byId = new Map(questions.map(q => [q.id,q]));
  return Object.fromEntries(session.questions.map(q => {
    const source = byId.get(q.id);
    return [q.id,q.choices.indexOf(source.choices[source.correct])];
  }));
}
function resign(changes, token) {
  const session = JSON.parse(Buffer.from(token.split('.')[0],'base64url').toString('utf8'));
  const modified = Object.assign(session,changes);
  const payload = Buffer.from(JSON.stringify(modified)).toString('base64url');
  const signature = createHmac('sha256',secret).update(payload).digest('base64url');
  return payload + '.' + signature;
}
test('assessment returns 40 distinct shuffled questions without answer material',async () => {
  const response = await post('start',{});
  assert.equal(response.status,200);
  const session = await response.json();
  assert.equal(session.questions.length,40);
  assert.equal(new Set(session.questions.map(q => q.id)).size,40);
  assert.ok(session.questions.every(q => !('correct' in q) && !('explanation' in q)));
  assert.equal(typeof session.token,'string');
  const answers = correctAnswers(session);
  const result = await data('submit',{token:session.token,answers});
  assert.equal(result.score,40);
  assert.equal(result.passed,true);
  assert.ok(result.credentialToken);
  const verified = await data('verify',{token:result.credentialToken});
  assert.equal(verified.valid,true);
  assert.equal(verified.credential.id,result.credentialId);
  assert.equal(verified.credential.score,40);
});
test('practice filters categories, randomizes choices and returns explanations after an answer',async () => {
  const session = await data('practice/start',{category:'Authentication',count:25});
  assert.equal(session.questions.length,25);
  assert.equal(session.available,40);
  assert.ok(session.questions.every(q => q.category==='Authentication'));
  const target = session.questions[0];
  const answer = correctAnswers({questions:[target]})[target.id];
  const checked = await data('practice/check',{token:session.token,id:target.id,answer});
  assert.equal(checked.correct,true);
  assert.ok(checked.explanation.length>10);
  assert.equal(checked.url,'/reference/smtp/');
  assert.equal(checked.correctIndex,answer);
  const wrong = await data('practice/check',{token:session.token,id:target.id,answer:(answer+1)%4});
  assert.equal(wrong.correct,false);
});
test('all practice questions and exact category counts can be fetched',async () => {
  const session = await data('practice/start',{category:'all',count:'all'});
  assert.equal(session.questions.length,200);
  const checked = await data('practice/check',{token:session.token,id:session.questions[199].id,answer:0});
  assert.ok(typeof checked.correct === 'boolean');
  const subset = await data('practice/start',{category:'Security',count:50});
  assert.equal(subset.questions.length,40);
});
test('failing or incomplete assessment cannot issue a credential',async () => {
  const session = await data('start',{});
  const good = correctAnswers(session);
  const wrong = Object.fromEntries(session.questions.map(q => [q.id,(good[q.id]+1)%4]));
  const failed = await data('submit',{token:session.token,answers:wrong});
  assert.equal(failed.score,0);
  assert.equal(failed.passed,false);
  assert.equal(failed.credentialToken,undefined);
  const retry = await data('start',{});
  const incomplete = await data('submit',{token:retry.token,answers:{}});
  assert.equal(incomplete.score,0);
  assert.equal(incomplete.passed,false);
});
test('tampering, expiry, disallowed origins and unexpected answers are rejected',async () => {
  const session = await data('start',{});
  const answers = correctAnswers(session);
  const token = session.token;
  const old = resign({issued:Date.now()-7200000,expires:Date.now()-3600000},token);
  assert.equal((await post('submit',{token:old,answers})).status,400);
  assert.equal((await post('submit',{token,answers:{[session.questions[0].id]:7}})).status,400);
  assert.equal((await post('submit',{token,answers:{'unrelated-question':1}})).status,400);
  assert.equal((await post('start',{},env,'https://attacker.invalid')).status,403);
  assert.equal((await data('verify',{token:'bad.token'})).valid,false);
  const valid = await data('submit',{token,answers});
  assert.equal((await data('verify',{token:valid.credentialToken+'x'})).valid,false);
});
test('malformed or missing private configuration causes safe failures',async () => {
  const missing = await post('start',{},{});assert.equal(missing.status,503);
  const former = sourceBank;
  try {
    sourceBank = questions.slice(0,199);
    assert.equal((await post('start',{})).status,503);
    sourceBank = questions.map(q => ({...q,choices:['Too few options']}));
    assert.equal((await post('start',{})).status,503);
  } finally {sourceBank = former;}
});
test('rate limiter refuses excessive requests before reading sensitive content',async () => {
  const blocked = {...env,ASSESSMENT_RATE_LIMITER:{limit:async()=>({success:false})}};
  const response = await post('start',{},blocked);
  assert.equal(response.status,429);
});
test('a completed attempt rejects later sequential submissions without storing identity', async () => {
  const session = await data('start',{});
  const answers = correctAnswers(session);
  const first = await post('submit',{token:session.token,answers});
  assert.equal(first.status,200);
  const replay = await post('submit',{token:session.token,answers});
  assert.equal(replay.status,409);
  const body = await replay.json();
  assert.match(body.error, /already submitted/i);
  assert.ok([...redeemed.keys()].every(k => k.startsWith('assessment-redeemed-v2:') && k.length === 'assessment-redeemed-v2:'.length + 36));
});

test('compact LinkedIn links verify, resist tampering, and preserve legacy credentials', async () => {
  const session = await data('start', {});
  const result = await data('submit', {token: session.token, answers: correctAnswers(session)});
  const url = new URL('/verify/', 'https://howto.email');
  url.searchParams.set('token', result.credentialToken);
  assert.ok(url.href.length < 150);
  assert.equal(url.hash, '');
  assert.match(result.credentialToken, /^v3\./);
  const verified = await data('verify', {token: result.credentialToken});
  assert.equal(verified.valid, true);
  assert.equal(verified.credential.id, result.credentialId);
  assert.equal(verified.credential.score, 40);
  const parts = result.credentialToken.split('.');
  const payload = Buffer.from(parts[1], 'base64url');
  payload[16] = 32;
  parts[1] = payload.toString('base64url');
  assert.equal((await data('verify', {token: parts.join('.')})).valid, false);
  const old = {kind:'credential', version:2, id:result.credentialId, score:40, total:40, passed:true, issued:result.issued};
  const body = Buffer.from(JSON.stringify(old)).toString('base64url');
  const legacy = body + '.' + createHmac('sha256', secret).update(body).digest('base64url');
  const migrated = await data('verify', {token: legacy});
  assert.equal(migrated.valid, true);
  assert.equal((await data('verify', {token:migrated.credentialToken})).credential.id, old.id);
  assert.equal((await data('verify', {token:result.credentialToken.slice(0,-5)})).valid, false);
});
