const UPSTREAM = 'https://dmarc.mx/api/check';

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  });
}

function validDomain(value) {
  if (!value || value.length > 253) return false;
  if (value.endsWith('.')) value = value.slice(0, -1);
  if (!value.includes('.') || /[^a-z0-9.-]/i.test(value)) return false;
  return value.split('.').every(label =>
    label.length > 0 &&
    label.length <= 63 &&
    !label.startsWith('-') &&
    !label.endsWith('-')
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/domain-check') {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed.' }, 405, { allow: 'GET' });
    }

    const domain = (url.searchParams.get('domain') || '').trim().toLowerCase().replace(/\.$/, '');
    if (!validDomain(domain)) {
      return json({ error: 'Enter a valid domain name, such as example.com.' }, 400);
    }

    const cache = caches.default;
    const cacheKey = new Request(`${url.origin}/api/domain-check?domain=${encodeURIComponent(domain)}`);
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const upstream = await fetch(`${UPSTREAM}?domain=${encodeURIComponent(domain)}`, {
        headers: { accept: 'application/json', 'user-agent': 'howto.email-domain-check/1.0' },
        cf: { cacheTtl: 0 },
      });

      if (!upstream.ok) {
        if (upstream.status === 429) {
          return json({ error: 'The lookup service is temporarily rate limited. Try again shortly.' }, 503);
        }
        return json({ error: 'The lookup service could not analyze this domain right now.' }, 502);
      }

      const data = await upstream.json();
      const response = new Response(JSON.stringify(data), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=300',
          'x-content-type-options': 'nosniff',
        },
      });
      await cache.put(cacheKey, response.clone());
      return response;
    } catch {
      return json({ error: 'The lookup service is unavailable right now.' }, 502);
    }
  },
};
