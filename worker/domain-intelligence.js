// Public, passive domain intelligence. All outbound requests use fixed endpoints.
export function normalizeDomain(value) {
  if (typeof value !== 'string') return null;
  let raw = value.trim().toLowerCase();
  if (!raw || raw.length > 300 || /[\s@\\?#]/.test(raw)) return null;
  raw = raw.replace(/^https?:\/\//, '').split('/')[0].replace(/\.$/, '');
  if (raw.includes(':')) return null; // Do not accept ports or IP literals.
  let host;
  try { host = new URL('https://' + raw).hostname.replace(/\.$/, ''); }
  catch { return null; }
  if (host.length > 253 || !host.includes('.') || !/^[a-z0-9.-]+$/.test(host)) return null;
  const labels = host.split('.');
  if (!labels.every(x => x.length > 0 && x.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(x))) return null;
  if (!/[a-z]/.test(labels[labels.length - 1]) || labels[labels.length - 1].length < 2) return null;
  return host;
}
const fail = (error = 'Source unavailable') => ({ status: 'unavailable', error });
function iso(value) {
  const d = new Date(value || '');
  return Number.isFinite(d.getTime()) ? d.toISOString() : null;
}
async function fetchData(url, { timeout = 7500, maxBytes = 1800000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'howto.email-domain-intelligence/1.0' }, signal: controller.signal });
    if (!response.ok) throw Error(response.status === 429 ? 'Rate limited' : 'Service returned HTTP ' + response.status);
    if (Number(response.headers.get('content-length') || 0) > maxBytes) throw Error('Response too large');
    if (!response.body) return response.json();
    const reader = response.body.getReader(), decoder = new TextDecoder();
    let content = '', bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > maxBytes) { await reader.cancel(); throw Error('Response too large'); }
      content += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(content + decoder.decode());
  } finally { clearTimeout(timer); }
}
function eventDate(events, names) {
  return (Array.isArray(events) ? events : [])
    .filter(e => names.includes(String(e?.eventAction || '').toLowerCase()))
    .map(e => iso(e.eventDate)).filter(Boolean).sort().at(-1) || null;
}
function registrarName(entities) {
  for (const e of (entities || [])) {
    if (!Array.isArray(e?.roles) || !e.roles.includes('registrar')) continue;
    const props = e.vcardArray?.[1] || [];
    const name = props.find(p => Array.isArray(p) && (p[0] === 'fn' || p[0] === 'org'))?.[3];
    return (typeof name === 'string' && name.slice(0, 180)) || e.handle || null;
  }
  return null;
}
async function rdap(domain) {
  try {
    const r = await fetchData('https://rdap.org/domain/' + encodeURIComponent(domain));
    if (!r || r.objectClassName !== 'domain') return fail('No domain registration record returned');
    return {
      status: 'ok', name: r.ldhName || domain, registrar: registrarName(r.entities),
      registered: eventDate(r.events, ['registration']),
      changed: eventDate(r.events, ['last changed', 'last updated']),
      expires: eventDate(r.events, ['expiration']),
      databaseUpdated: eventDate(r.events, ['last update of rdap database']),
      statuses: (r.status || []).filter(x => typeof x === 'string').slice(0, 12),
      nameservers: (r.nameservers || []).map(x => x.ldhName).filter(Boolean).slice(0, 20),
      source: 'https://rdap.org/domain/' + encodeURIComponent(domain)
    };
  } catch (e) { return fail(e.message); }
}
async function dns(domain) {
  const types = ['A', 'AAAA', 'MX', 'NS'];
  const entries = await Promise.all(types.map(async type => {
    try {
      const url = 'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=' + type;
      const body = await fetchData(url, { timeout: 4500, maxBytes: 90000 });
      return [type, { status: 'ok', values: (body.Answer || []).filter(a => a.type === ({ A: 1, AAAA: 28, MX: 15, NS: 2 })[type]).map(a => String(a.data)).slice(0, 30) }];
    } catch (e) { return [type, fail(e.message)]; }
  }));
  const records = Object.fromEntries(entries);
  return { status: entries.some(([, v]) => v.status === 'ok') ? 'ok' : 'unavailable', records };
}
async function threats(domain) {
  try {
    const r = await fetchData('https://phishunt.io/api/v1/domains?contains=' + encodeURIComponent(domain) + '&limit=200', { timeout: 6500, maxBytes: 650000 });
    if (!Array.isArray(r.results)) return fail('Unexpected feed response');
    const matches = r.results.filter(x => {
      const host = String(x.domain || '').toLowerCase();
      return host === domain || host.endsWith('.' + domain);
    }).slice(0, 12).map(x => ({
      host: String(x.domain).slice(0, 253), brand: String(x.company || '').slice(0, 80),
      firstSeen: iso(x.first_seen), lastSeen: iso(x.date),
      detections: ['google', 'openphish', 'phishtank', 'urlscan', 'tweetfeed'].filter(k => x['malicious_' + k] === true)
    }));
    return { status: 'ok', matches, searchTruncated: Number(r.total || 0) > 200, source: 'https://phishunt.io/api/' };
  } catch (e) { return fail(e.message); }
}
async function historicalScans(domain) {
  try {
    const q = 'page.domain:' + domain;
    const r = await fetchData('https://urlscan.io/api/v1/search/?q=' + encodeURIComponent(q) + '&size=16', { timeout: 7000, maxBytes: 550000 });
    if (!Array.isArray(r.results)) return fail('Unexpected scan response');
    return { status: 'ok', scans: r.results.filter(x => {
      const host = String(x.page?.domain || '').toLowerCase();
      return host === domain || host.endsWith('.' + domain);
    }).slice(0, 12).map(x => ({
      time: iso(x.task?.time), host: String(x.page?.domain || '').slice(0, 253),
      title: String(x.page?.title || '').slice(0, 150),
      id: /^[a-f0-9-]{36}$/i.test(x._id || '') ? x._id : null
    })), source: 'https://urlscan.io/search/#' + encodeURIComponent(q) };
  } catch (e) { return fail(e.message); }
}
async function certificates(domain) {
  try {
    const r = await fetchData('https://crt.sh/?q=' + encodeURIComponent(domain) + '&output=json', { timeout: 8500, maxBytes: 1800000 });
    if (!Array.isArray(r)) return fail('Unexpected certificate response');
    const seen = new Set();
    const entries = r.filter(x => String(x.name_value || '').toLowerCase().split('\n').some(v => {
      v = v.trim().replace(/^\*\./, '');
      return v === domain || v.endsWith('.' + domain);
    })).sort((a,b) => String(b.entry_timestamp || b.not_before || '').localeCompare(String(a.entry_timestamp || a.not_before || ''))).filter(x => {
      const k = String(x.id || x.serial_number || '');
      if (seen.has(k)) return false;
      seen.add(k); return true;
    }).slice(0, 15).map(x => ({
      seen: iso(x.entry_timestamp), validFrom: iso(x.not_before), validTo: iso(x.not_after),
      issuer: String(x.issuer_name || '').slice(0, 180),
      name: String(x.common_name || '').slice(0, 253)
    }));
    return { status: 'ok', entries, source: 'https://crt.sh/?q=' + encodeURIComponent(domain) };
  } catch (e) { return fail(e.message); }
}
function respond(body, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(body), { status, headers: {
    'content-type': 'application/json; charset=utf-8', 'cache-control': cache,
    'x-content-type-options': 'nosniff'
  } });
}
export async function domainIntelligence(request) {
  if (request.method !== 'GET') return respond({ error: 'Only GET is supported.' }, 405);
  const url = new URL(request.url);
  const domain = normalizeDomain(url.searchParams.get('domain'));
  if (!domain) return respond({ error: 'Enter a valid public domain, such as example.com.' }, 400);
  const cache = typeof caches !== 'undefined' ? caches.default : null;
  const cacheKey = new Request(url.origin + '/api/domain-intelligence?domain=' + encodeURIComponent(domain) + '&v=1');
  if (cache) { const hit = await cache.match(cacheKey); if (hit) return hit; }
  const [registration, dnsRecords, threat, scans, certs] = await Promise.all([
    rdap(domain), dns(domain), threats(domain), historicalScans(domain), certificates(domain)
  ]);
  const result = respond({
    domain, checkedAt: new Date().toISOString(),
    registration, dns: dnsRecords, threat, scans, certificates: certs,
    note: 'Passive sources are incomplete. No result is proof of safety. WHOIS/RDAP is current registration data, not historical WHOIS.'
  }, 200, 'public, max-age=600');
  if (cache) await cache.put(cacheKey, result.clone());
  return result;
}
