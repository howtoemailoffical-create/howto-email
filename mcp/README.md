# howto.email — MCP server and public DNS REST API

Cloudflare Worker deployed from this directory using `npx wrangler deploy`.

## Public endpoints

- MCP: `POST https://howto.email/mcp` (Streamable HTTP; stateless)
- REST API: `GET https://howto.email/api/analyze?domain=google.com`
- API index: `GET https://howto.email/api`
- API documentation: `https://howto.email/integrations/api/`

Other REST endpoints: `/api/spf`, `/api/dmarc`, `/api/mx`, `/api/dkim`, `/api/mta-sts`, `/api/tls-rpt`, `/api/bimi`. All require a public `domain` query parameter. DKIM requires `selector`; BIMI optionally accepts `selector`; combined analysis optionally accepts `dkim_selector`.

## Deployment routing

The Worker needs Cloudflare routes for **both** `howto.email/mcp*` and `howto.email/api*`. The existing MCP route does not cover API paths. The Astro Pages site serves `/integrations/api/` and `/integrations/mcp/`.

## Behavior and limits

- Public, read-only DNS checks through Cloudflare DNS-over-HTTPS.
- MTA-STS also fetches a policy from `https://mta-sts.<domain>/.well-known/mta-sts.txt`.
- API supports GET, HEAD and OPTIONS and sets `Access-Control-Allow-Origin: *`.
- API and MCP requests share a Cloudflare per-IP rate-limit binding: 30 requests per 60 seconds per Cloudflare location.
- 400 invalid input, 404 unknown route, 405 wrong method, 429 rate limited, 502 DNS/policy upstream failure.
- JSON API results are cacheable for up to five minutes by clients; caching at the edge is not guaranteed.
- No account, database, API key, or paid external API required.
- Findings are informational, not a complete email security audit or SMTP test.

## Quick check

```sh
curl -i "https://howto.email/api/analyze?domain=google.com"
curl -i "https://howto.email/api/dkim?domain=google.com&selector=google"
```
