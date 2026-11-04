import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import worker from './assessment.js';

globalThis.crypto ??= webcrypto;
const questions=Array.from({length:200},(_,i)=>({id:'q'+i,category:'Fundamentals',question:'Question '+i,choices:['Correct','Wrong','Other'],correct:0}));
const env={SIGNING_SECRET:'test-secret-not-for-production',QUESTION_BANK:{get:async()=>questions}};
const post=(path,data)=>worker.fetch(new Request('https://howto.email/api/assessment/'+path,{method:'POST',headers:{'content-type':'application/json','origin':'https://howto.email'},body:JSON.stringify(data)}),env);
const get=(path)=>worker.fetch(new Request('https://howto.email/api/assessment/'+path),env);
test('assessment issues 40 questions without exposing answers',async()=>{
 const response=await post('start',{});assert.equal(response.status,200);
 const data=await response.json();assert.equal(data.questions.length,40);
 assert.equal(new Set(data.questions.map(q=>q.id)).size,40);
 assert.ok(data.questions.every(q=>!('correct' in q)));
 const answers=Object.fromEntries(data.questions.map(q=>[q.id,0]));
 const result=await (await post('submit',{token:data.token,answers})).json();
 assert.equal(result.score,40);assert.equal(result.passed,true);
 const verified=await (await get('verify?token='+encodeURIComponent(result.credentialToken))).json();
 assert.equal(verified.valid,true);assert.equal(verified.credential.score,40);
});
test('failed attempt does not issue credential',async()=>{
 const data=await (await post('start',{})).json();
 const answers=Object.fromEntries(data.questions.map(q=>[q.id,1]));
 const result=await (await post('submit',{token:data.token,answers})).json();
 assert.equal(result.passed,false);assert.equal(result.credentialToken,undefined);
});
test('tampered credential fails verification',async()=>{
 const verified=await (await get('verify?token=abc.def')).json();
 assert.equal(verified.valid,false);
});
test('malformed answers rejected',async()=>{
 const data=await (await post('start',{})).json();
 const response=await post('submit',{token:data.token,answers:Array(40).fill(0)});
 assert.equal(response.status,400);
});
test('rejects untrusted browser origins',async()=>{
 const response=await worker.fetch(new Request('https://howto.email/api/assessment/start',{method:'POST',headers:{origin:'https://evil.example'}}),env);
 assert.equal(response.status,403);
});
