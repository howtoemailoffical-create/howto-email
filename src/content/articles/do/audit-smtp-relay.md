---
title: Audit an SMTP relay
description: Review authorization, TLS, logging and abuse controls on application relay infrastructure.
section: Do
tags: [SMTP, Security, Operations]
---

An SMTP relay audit starts with one question: **who is allowed to send through this system, and why?**

Document authentication methods, trusted source networks, connectors, allowed sender domains, recipient restrictions and downstream routes.

Then verify:

- unauthorized external clients cannot relay;
- TLS is used where required;
- application credentials are scoped and rotated;
- source IP trust is as narrow as practical;
- rate and volume anomalies are visible;
- logs preserve enough detail to trace a transaction.

Use test domains and recipients you control when validating relay behavior.

## Reference material

- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 5321 — SMTP relay behavior](https://www.rfc-editor.org/rfc/rfc5321)
