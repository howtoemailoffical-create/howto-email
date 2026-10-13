import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeDomain, domainIntelligence } from '../worker/domain-intelligence.js';

test('domain normalization rejects non-domain and injection input', () => {
  assert.equal(normalizeDomain('https://Example.COM/path'), 'example.com');
  assert.equal(normalizeDomain('bücher.de'), 'xn--bcher-kva.de');
  for (const value of ['localhost', '192.0.2.1', 'evil.com@localhost', 'evil.com:8000', 'evil.com?x=1', 'a..com', '-a.com', 'example.com#x']) {
    assert.equal(normalizeDomain(value), null, value);
  }
});

test('domain intelligence preserves source provenance and filters feed hits', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async url => {
    url = String(url);
    if (url.startsWith('https://rdap.org/')) return Response.json({
      objectClassName: 'domain', ldhName: 'example.com',
      status: ['active'], entities: [{ roles: ['registrar'], vcardArray: ['vcard', [['fn', {}, 'text', 'Example Registrar']]] }],
      events: [{ eventAction: 'registration', eventDate: '2026-09-30T01:00:00Z' },
        { eventAction: 'last changed', eventDate: '2026-10-10T02:00:00Z' }],
      nameservers: [{ ldhName: 'ns1.example.net' }]
    });
    if (url.startsWith('https://cloudflare-dns.com/')) {
      const type = new URL(url).searchParams.get('type');
      return Response.json({ Answer: [{ type: type === 'MX' ? 15 : type === 'NS' ? 2 : type === 'AAAA' ? 28 : 1, data: type === 'A' ? '192.0.2.1' : 'value' }] });
    }
    if (url.startsWith('https://phishunt.io/')) return Response.json({
      total: 3, results: [
        { domain: 'sub.example.com', company: 'example', malicious_urlscan: true, first_seen: '2026-10-12T00:00:00Z' },
        { domain: 'notexample.com', company: 'false match' },
        { domain: 'example.com.bad.tld', company: 'false match' }
      ]
    });
    if (url.startsWith('https://urlscan.io/')) return Response.json({
      results: [{ _id: 'b42a5b8f-534c-4c22-8128-369198b9b8ab', task: { time: '2026-10-11T11:00:00Z' }, page: { domain: 'example.com', title: 'Example' } }]
    });
    if (url.startsWith('https://crt.sh/')) return Response.json([
      { id: 1, name_value: 'example.com', common_name: 'example.com', not_before: '2026-10-01T00:00:00Z', entry_timestamp: '2026-10-02T00:00:00Z' },
      { id: 2, name_value: 'unrelated.com', common_name: 'unrelated.com' }
    ]);
    throw Error('Unexpected upstream: ' + url);
  };
  try {
    const response = await domainIntelligence(new Request('https://howto.email/api/domain-intelligence?domain=EXAMPLE.com'));
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.domain, 'example.com');
    assert.equal(data.registration.registrar, 'Example Registrar');
    assert.equal(data.registration.changed, '2026-10-10T02:00:00.000Z');
    assert.equal(data.dns.records.A.values[0], '192.0.2.1');
    assert.deepEqual(data.threat.matches.map(x => x.host), ['sub.example.com']);
    assert.deepEqual(data.threat.matches[0].detections, ['urlscan']);
    assert.equal(data.certificates.entries.length, 1);
    assert.equal(data.scans.scans.length, 1);
  } finally { globalThis.fetch = original; }
});

test('upstream errors stay unavailable, never display as safe', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response('error', { status: 503 });
  try {
    const response = await domainIntelligence(new Request('https://howto.email/api/domain-intelligence?domain=example.com'));
    const data = await response.json();
    assert.equal(data.registration.status, 'unavailable');
    assert.equal(data.dns.status, 'unavailable');
    assert.equal(data.threat.status, 'unavailable');
    assert.equal(data.scans.status, 'unavailable');
    assert.equal(data.certificates.status, 'unavailable');
  } finally { globalThis.fetch = original; }
});
