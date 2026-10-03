# Domain Check architecture

## Purpose

Domain Check turns public email configuration into an educational workflow:

**Check → identify → understand → read → fix → recheck**

It is not intended to produce a universal security score.

## Current architecture

1. The Astro page at `/tools/domain-check/` accepts a domain.
2. The browser calls the same-origin `/api/domain-check` endpoint.
3. The Cloudflare Worker validates the domain and proxies the read-only lookup to the public dmarc.mx JSON API.
4. Successful results are cached at the edge for five minutes.
5. The browser derives a small set of clearly labeled findings from the returned summary.
6. Findings map to existing howto.email articles.

The upstream project is MIT-licensed and can be self-hosted. The proxy is intentionally isolated so the backend can later be replaced without changing the public tool URL.

## Finding language

Use four states:

- **Error** — returned data indicates a concrete invalid/failing condition.
- **Warning** — configuration is missing, weak, or deserves investigation.
- **Optional** — enhancement that is not required for normal email operation.
- **Pass** — the scanner reported the expected capability.

Do not convert these states into a numeric or letter security score.

## Privacy

Only the submitted public domain is sent to the upstream scanner. No account or credential is required. If analytics or persistent lookup history are added later, update the privacy notice before deployment.

## Future work

- Self-host the scanner Worker to remove dependency on the hosted API and its public rate limit.
- Expand finding mappings using stable scanner fields rather than text parsing.
- Add deeper findings for SPF lookup count, DMARC reporting, MTA-STS validation, DKIM key quality and BIMI prerequisites.
- Add article metadata such as `findings: []` so recommendations can be generated from the content collection.
- Add MX, TLS, SMTP status and header-analysis tools.
- Add abuse controls if public usage warrants them.
