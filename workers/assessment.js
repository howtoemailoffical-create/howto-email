// Privacy-first, stateless HowToEmail assessment API.
// Correct answers and explanations are held only in private Cloudflare Workers KV.
const enc = new TextEncoder();
const dec = new TextDecoder();
const ORIGIN = 'https://howto.email';
const BANK_KEY = 'assessment-v1';
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store',
    'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer', 'vary': 'Origin'}
});
const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
const unb64 = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/') +
  '='.repeat((4 - value.length % 4) % 4)), ch => ch.charCodeAt(0));
const validId = id => typeof id === 'string' && /^[a-z0-9-]{2,64}$/i.test(id);
const validURL = url => typeof url === 'string' && /^\/(?!\/)[a-z0-9/-]+\/$/i.test(url);
const validQuestion = q => q && validId(q.id) && typeof q.category === 'string' &&
  q.category.length > 0 && q.category.length < 80 &&
  typeof q.question === 'string' && q.question.length > 15 && q.question.length < 600 &&
  Array.isArray(q.choices) && q.choices.length === 4 &&
  q.choices.every(x => typeof x === 'string' && x.length > 0 && x.length < 300) &&
  new Set(q.choices).size === 4 && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4 &&
  typeof q.explanation === 'string' && q.explanation.length > 10 && q.explanation.length < 700 &&
  validURL(q.url);
async function loadBank(env) {
  const data = await env.QUESTION_BANK.get(BANK_KEY, {type: 'json'});
  if (!Array.isArray(data) || data.length < 200 || data.length > 1000 ||
      data.some(q => !validQuestion(q)) || new Set(data.map(q => q.id)).size !== data.length) {
    throw new Error('Question bank unavailable');
  }
  return data;
}
async function signingKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign', 'verify']);
}
async function sign(key, payload) {
  const payload64 = b64(enc.encode(JSON.stringify(payload)));
  return payload64 + '.' + b64(await crypto.subtle.sign('HMAC', key, enc.encode(payload64)));
}
async function verify(key, token) {
  if (typeof token !== 'string' || token.length > 15000 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) return null;
  const [body, sig] = token.split('.');
  try {
    if (!await crypto.subtle.verify('HMAC', key, unb64(sig), enc.encode(body))) return null;
    return JSON.parse(dec.decode(unb64(body)));
  } catch { return null; }
}
function randomIndex(n) {
  const limit = Math.floor(0x100000000 / n) * n;
  const x = new Uint32Array(1);
  do { crypto.getRandomValues(x); } while (x[0] >= limit);
  return x[0] % n;
}
function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1); [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function publicQuestions(bank, ids, orders) {
  const byId = new Map(bank.map(q => [q.id, q]));
  return ids.map((id, n) => {
    const q = byId.get(id);
    return {id, category: q.category, question: q.question, choices: orders[n].map(i => q.choices[i])};
  });
}
function validSession(p, kind, n) {
  return p && p.kind === kind && p.version === 2 && Array.isArray(p.ids) &&
    p.ids.length === n && new Set(p.ids).size === n && p.ids.every(validId) &&
    Array.isArray(p.orders) && p.orders.length === n &&
    p.orders.every(v => Array.isArray(v) && v.length === 4 &&
      new Set(v).size === 4 && v.every(i => Number.isInteger(i) && i >= 0 && i < 4)) &&
    Number.isInteger(p.issued) && Number.isInteger(p.expires) && p.expires > Date.now() &&
    p.issued <= Date.now() + 60000 && p.expires - p.issued === (kind === 'exam' ? 3600000 : 7200000);
}
function makeSession(kind, questions) {
  const issued = Date.now();
  return {kind, version: 2, ids: questions.map(q => q.id),
    orders: questions.map(() => shuffled([0, 1, 2, 3])), issued,
    expires: issued + (kind === 'exam' ? 3600000 : 7200000), nonce: crypto.randomUUID()};
}
async function readBody(request) {
  if (Number(request.headers.get('content-length') || 0) > 40000) throw Error('Request too large');
  const raw = await request.text();
  if (raw.length > 40000) throw Error('Request too large');
  return JSON.parse(raw);
}
export default {async fetch(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '');
  if (!path.startsWith('/api/assessment/')) return json({error: 'Not found'}, 404);
  if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: {
    'allow': 'GET, POST, OPTIONS', 'access-control-allow-origin': ORIGIN,
    'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type',
    'access-control-max-age': '300', 'vary': 'Origin'}});
  if (request.headers.get('origin') && ![ORIGIN, url.origin].includes(request.headers.get('origin'))) return json({error: 'Origin not allowed'}, 403);
  // No per-user profiles or assessment submissions are stored by this service.
  // Optional global rate limiter keeps non-identifying short-lived request counters only.
  if (env.ASSESSMENT_RATE_LIMITER) {
    const key = path; // Global, non-identifying throttle bucket; never store an IP.
    const {success} = await env.ASSESSMENT_RATE_LIMITER.limit({key});
    if (!success) return json({error: 'Too many requests. Try again shortly.'}, 429);
  }
  if (!env.SIGNING_SECRET) return json({error: 'Assessment service is not configured'}, 503);
  const key = await signingKey(env.SIGNING_SECRET);
  if (path === '/api/assessment/verify' && (request.method === 'GET' || request.method === 'POST')) {
    let token;
    try { token = request.method === 'POST' ? (await readBody(request))?.token : url.searchParams.get('token'); }
    catch { return json({error: 'Invalid request'}, 400); }
    const p = await verify(key, token);
    const issued = p && typeof p.issued === 'string' ? Date.parse(p.issued) : NaN;
    const valid = !!(p && p.kind === 'credential' && p.version === 2 && p.passed === true &&
      typeof p.id === 'string' && /^[a-f\d-]{36}$/i.test(p.id) && Number.isInteger(p.score) &&
      p.score >= 32 && p.score <= 40 && p.total === 40 && Number.isFinite(issued) &&
      issued <= Date.now() + 60000 && issued > Date.UTC(2026, 0, 1));
    return json({valid, credential: valid ? {id: p.id, score: p.score, total: p.total,
      issued: p.issued, assessment: 'HowToEmail Email Knowledge Assessment'} : null});
  }
  if (!env.QUESTION_BANK) return json({error: 'Assessment question bank is not configured'}, 503);
  if (request.method !== 'POST') return json({error: 'Method not allowed'}, 405);
  let data;
  try { data = await readBody(request); } catch { return json({error: 'Invalid JSON or request too large'}, 400); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({error: 'Expected a JSON object'}, 400);
  if (path === '/api/assessment/start' || path === '/api/assessment/practice/start') {
    let bank;
    try { bank = await loadBank(env); } catch { return json({error: 'Assessment questions unavailable'}, 503); }
    const practice = path.includes('/practice/');
    let pool = bank;
    if (practice && data?.category && data.category !== 'all') {
      if (typeof data.category !== 'string' || data.category.length > 80) return json({error: 'Invalid category'}, 400);
      pool = pool.filter(q => q.category === data.category);
    }
    const count = practice ? (data?.count === 'all' ? pool.length : Number(data?.count || 10)) : 40;
    if (!Number.isInteger(count) || count < 1 || (practice && ![10, 25, 50, pool.length].includes(count)))
      return json({error: 'Invalid question count'}, 400);
    const selected = shuffled(pool).slice(0, Math.min(count, pool.length));
    if (selected.length === 0 || (!practice && selected.length !== 40)) return json({error: 'Insufficient questions'}, 503);
    const session = makeSession(practice ? 'practice' : 'exam', selected);
    return json({token: await sign(key, session), expires: session.expires,
      questions: publicQuestions(bank, session.ids, session.orders),
      ...(practice ? {available: pool.length} : {})});
  }
  if (path === '/api/assessment/practice/check') {
    const p = await verify(key, data?.token);
    if (!p || !Array.isArray(p.ids) || !validSession(p, 'practice', p.ids.length) ||
        !validId(data?.id) || !Number.isInteger(data?.answer) || data.answer < 0 || data.answer > 3)
      return json({error: 'Invalid or expired practice session'}, 400);
    const pos = p.ids.indexOf(data.id);
    if (pos === -1) return json({error: 'Question not in session'}, 400);
    let bank;
    try { bank = await loadBank(env); } catch { return json({error: 'Assessment questions unavailable'}, 503); }
    const q = bank.find(q => q.id === data.id);
    if (!q) return json({error: 'Question no longer available'}, 409);
    const correctIndex = p.orders[pos].indexOf(q.correct);
    return json({correct: data.answer === correctIndex, correctIndex,
      explanation: q.explanation, url: q.url});
  }
  if (path === '/api/assessment/submit') {
    const p = await verify(key, data?.token);
    if (!validSession(p, 'exam', 40)) return json({error: 'Invalid or expired assessment session'}, 400);
    if (!data.answers || typeof data.answers !== 'object' || Array.isArray(data.answers) ||
        Object.keys(data.answers).length > 40 ||
        Object.entries(data.answers).some(([id, index]) => !p.ids.includes(id) || !Number.isInteger(index) || index < 0 || index > 3))
      return json({error: 'Invalid answers'}, 400);
    let bank;
    try { bank = await loadBank(env); } catch { return json({error: 'Assessment questions unavailable'}, 503); }
    const byId = new Map(bank.map(q => [q.id, q]));
    let score = 0;
    for (let n = 0; n < p.ids.length; n++) {
      const q = byId.get(p.ids[n]);
      if (!q) return json({error: 'Question no longer available'}, 409);
      if (data.answers[q.id] === p.orders[n].indexOf(q.correct)) score++;
    }
    const passed = score >= 32;
    const result = {score, total: 40, passed, percentage: Math.round(score / 40 * 100)};
    if (passed) {
      const credential = {kind: 'credential', version: 2, id: crypto.randomUUID(), score,
        total: 40, passed: true, issued: new Date().toISOString()};
      result.credentialToken = await sign(key, credential);
      result.credentialId = credential.id;
      result.issued = credential.issued;
    }
    return json(result);
  }
  return json({error: 'Not found'}, 404);
}};