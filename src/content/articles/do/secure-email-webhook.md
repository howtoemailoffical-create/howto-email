---
title: Secure an email event webhook
description: Treat delivery callbacks as untrusted Internet requests until verified.
section: Do
tags: [Webhooks, Security, API]
---

Expose the webhook only over HTTPS and use the provider's documented request-verification method.

## Processing pattern

1. Verify signature/authentication.
2. Parse the event defensively.
3. Record the provider event ID.
4. Deduplicate retries.
5. Queue expensive processing.
6. Return a success response promptly.
7. Correlate the provider message ID with your internal send ID.

Do not trust a JSON field saying `delivered` merely because somebody can POST it to your endpoint.

Keep webhook secrets out of source control and design rotation before production.

## Reference material

- [NIST SP 800-63B — Authentication and authenticator management](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
