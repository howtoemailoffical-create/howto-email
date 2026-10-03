---
title: Decommission a SaaS email sender
description: Remove the vendor from mail flow, DNS and credentials instead of merely canceling the subscription.
section: Do
tags: [SaaS, Decommission, Security]
---

Inventory what the service was allowed to use:

- API keys/OAuth grants;
- SMTP credentials;
- SPF authorization;
- DKIM selectors/CNAMEs;
- tracking domains;
- bounce domains;
- webhooks;
- verification TXT records.

Stop production sending and verify no application still depends on the service.

Revoke credentials and application access, then remove obsolete DNS after appropriate overlap.

Watch DMARC and logs for unexpected traffic that still references the retired vendor.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
