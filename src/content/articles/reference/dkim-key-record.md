---
title: DKIM public key records
description: What lives under selector._domainkey and how receivers use it.
section: Reference
tags: [DKIM, DNS]
---

A DKIM verifier takes the selector (`s=`) and signing domain (`d=`) from the signature and queries:

```text
selector._domainkey.example.com
```

The returned record contains key and policy information used to verify the signature.

A simplified record might look like:

```text
v=DKIM1; k=rsa; p=MIIB...
```

Hosted providers may ask you to publish a CNAME instead, allowing the provider to manage the actual key record under its own DNS.

## Rotation

Selectors make safe rotation possible. Publish the new key first, switch signing, verify production mail, then retain the old public key long enough for delayed messages signed with it to finish moving through the system.

## Reference material

- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
