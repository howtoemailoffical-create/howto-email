---
title: SASL in email protocols
description: The authentication framework used by SMTP AUTH and other application protocols.
section: Reference
tags: [SASL, Authentication, SMTP]
---

SASL is a framework that lets application protocols plug in authentication mechanisms.

SMTP exposes SASL through the AUTH extension. IMAP and other protocols also use SASL mechanisms.

A mechanism name alone does not tell you the complete security posture. Consider whether the connection is protected by TLS, whether credentials are replayable, and how the identity system manages the account or token.

## Reference material

- [RFC 4422 — Simple Authentication and Security Layer](https://www.rfc-editor.org/rfc/rfc4422)
- [RFC 4954 — SMTP Service Extension for Authentication](https://www.rfc-editor.org/rfc/rfc4954)
