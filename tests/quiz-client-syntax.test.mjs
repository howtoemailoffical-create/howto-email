import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const pages = [
  'src/pages/quiz/index.astro',
  'src/pages/quiz/assessment.astro',
  'src/pages/verify/index.astro'
];

test('quiz and credential browser scripts parse as JavaScript', async () => {
  for (const path of pages) {
    const file = await readFile(path, 'utf8');
    const match = file.match(/<script>([\s\S]*?)<\/script>/);
    assert.ok(match, path + ' contains a client-side script');
    assert.doesNotThrow(() => new Script(match[1], { filename: path }), path);
    assert.ok(!file.includes('innerHTML='), path + ' never inserts untrusted HTML');
  }
});

test('private answers cannot be read from practice and assessment markup', async () => {
  const practice = await readFile(pages[0], 'utf8');
  const exam = await readFile(pages[1], 'utf8');
  const verifier = await readFile(pages[2], 'utf8');
  assert.match(practice, /\/api\/assessment\//);
  assert.match(exam, /\/api\/assessment\//);
  assert.match(verifier, /\/api\/assessment\/verify/);
  assert.doesNotMatch(exam, /\bconst\s+bank\s*=/);
  assert.match(verifier, /location\.hash/);
});

test('existing Cloudflare Worker has exactly one assessment router', async () => {
  const file = await readFile('worker/index.js', 'utf8');
  assert.equal((file.match(/assessment\.fetch\(request,env\)/g) || []).length, 1);
  assert.match(file, /env\.ASSETS\.fetch\(request\)/);
});

test('private question banks and local secrets are gitignored', async () => {
  const ignores = await readFile('.gitignore', 'utf8');
  assert.match(ignores, /^private-question-bank\.json$/m);
  assert.match(ignores, /^question-bank\.json$/m);
  assert.match(ignores, /^\.dev\.vars$/m);
});