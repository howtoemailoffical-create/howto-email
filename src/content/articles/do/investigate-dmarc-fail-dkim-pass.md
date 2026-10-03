---
title: DMARC fails even though DKIM passes
description: A valid signature from the wrong domain does not satisfy DMARC alignment.
section: Do
tags: [DMARC, DKIM, Troubleshooting]
---

Read the passing signature's `d=` domain and compare it with the visible From domain.

A provider can produce:

```text
From: alerts@example.com
DKIM-Signature: ... d=provider.example; ...
dkim=pass
```

The signature is cryptographically valid, but its domain may not align with `example.com`.

Configure custom DKIM signing for the From domain or another aligned domain according to the provider's capabilities.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
