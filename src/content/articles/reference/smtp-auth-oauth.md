---
title: OAuth with SMTP, IMAP and POP
description: How token-based authorization can replace long-lived mailbox passwords.
section: Reference
tags: [OAuth, SMTP, IMAP]
---

OAuth-capable mail services can accept access tokens through SASL mechanisms instead of an application's stored mailbox password.

The token is issued by an identity platform and carries authorization context such as audience, scope and lifetime.

## Operations still matter

OAuth moves the problem; it does not remove it. Applications still need secure client credentials or another token-acquisition method, token caching, renewal, least privilege and a way to revoke access.

Provider implementation details differ, so use the provider's current OAuth documentation for configuration.

## Reference material

- [RFC 7628 — A Set of SASL Mechanisms for OAuth](https://www.rfc-editor.org/rfc/rfc7628)
- [RFC 4954 — SMTP Service Extension for Authentication](https://www.rfc-editor.org/rfc/rfc4954)
