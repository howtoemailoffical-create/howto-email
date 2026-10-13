# Domain Intelligence Lookup

Public page: \`/tools/domain-intelligence/\`; API: \`GET /api/domain-intelligence?domain=example.com\`.

This is a **passive** investigation tool. It never fetches the target website, attempts to log in, or submits a URL for an active scan. It uses fixed upstream endpoints only.

## Data sources

- **RDAP.org** routes registration lookups to the authoritative TLD RDAP operator, returning the registrar, created/changed/expiration events (when disclosed), registration statuses and name servers. RDAP data is **current**, not a historical WHOIS archive. "Last changed" does not explain which field changed and does not prove a domain was transferred.
- **Cloudflare DNS-over-HTTPS** provides current A, AAAA, MX and NS responses. An empty answer is not the same as source failure.
- **phishunt.io** provides public phishing intelligence (CC0) aggregated from public signals. The API \`/api/v1/domains?contains=\` is used; results are host-matched again locally to avoid substring false matches. Positive source flags are displayed, but absence of a flag is not a clean verdict. Search is limited to 200 upstream records and 12 matches in the response.
- **crt.sh** provides logged public TLS certificates. This is issuance evidence, not proof of a DNS, ownership or content change. Large responses/timeouts can make certificate history unavailable.
- **urlscan.io** provides existing public website scan metadata. The tool never submits new scans. Only public scans returned by the service are visible; missing history is not evidence that a site never existed.

API calls can be rate-limited or unavailable; each provider has an explicit status and error rather than a false green result. Responses are cached at the Cloudflare edge for 10 minutes.

## History

On each lookup, the browser saves a registration/DNS snapshot in localStorage, capped at 12 observations per domain (up to 25 domains). Follow-up searches show which RDAP and DNS fields changed compared with the previous saved snapshot. The user can clear saved snapshots for the current domain. Snapshots are **not shared across devices** and cannot show DNS state before the first saved observation. No KV/D1/history database is required.

The timeline combines current RDAP creation/change dates, certificates' issuance or log dates, and prior public urlscan observations. These are different event types with different evidentiary value.

## Investigating a suspected bank lookalike

1. Search the suspicious domain, not the login page.
2. Optionally enter the bank's official domain from a known trusted source. The comparison is only a spelling/substring heuristic, not an ownership check.
3. Review domain creation and registrar-change dates and the nameservers.
4. Check the current public phishing feed and read any individual source flags. No match is not a safety assurance.
5. Look for newly logged TLS certificates and existing historical scans; do not click the suspicious domain.
6. Check saved DNS changes on subsequent investigations, then escalate findings to the bank's abuse/security contact or an internal SOC.

## Local development

\`\`\`sh
npm install
npm run build
node --test tests/domain-intelligence.test.mjs
\`\`\`

The static Astro build does not itself serve the Worker API. The Worker is routed through \`wrangler.jsonc\` using \`/api/*\`. Use Wrangler's local Worker preview to exercise the whole UI and API together.

No API keys or paid services are required. Do not introduce licensed OpenPhish/URLhaus/VirusTotal bulk API use into this endpoint without verifying usage rights and credentials.
