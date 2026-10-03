---
title: Troubleshoot DNSSEC-related email failures
description: Recognize when signed DNS is failing validation rather than simply returning no record.
section: Do
tags: [DNSSEC, DNS, Troubleshooting]
---

A DNSSEC failure can make valid-looking DNS data unusable to validating resolvers.

Compare:

1. authoritative answers;
2. a validating recursive resolver;
3. DNSSEC chain information.

Look for expired or missing signatures, incorrect DS data at the parent, key rollover mistakes and delegation problems.

If DANE is in use, DNSSEC validation is part of the SMTP security decision, so a DNSSEC problem can directly affect TLS-authenticated delivery.

Do not disable validation as the permanent fix. Repair the chain of trust.

## Reference material

- [RFC 4033 — DNSSEC Introduction](https://www.rfc-editor.org/rfc/rfc4033)
- [RFC 4035 — DNSSEC Protocol Modifications](https://www.rfc-editor.org/rfc/rfc4035)
- [RFC 7672 — SMTP DANE](https://www.rfc-editor.org/rfc/rfc7672)
