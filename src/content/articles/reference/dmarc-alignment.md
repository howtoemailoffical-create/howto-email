---
title: DMARC alignment
description: How SPF and DKIM identities relate to the visible From domain.
section: Reference
tags: [DMARC, SPF, DKIM]
---

DMARC does not ask only whether SPF or DKIM passed. It asks whether a passing authentication identity is **aligned** with the author domain in the visible From field.

## SPF alignment

The SPF-authenticated domain must align with the From domain.

## DKIM alignment

The `d=` domain of a valid DKIM signature must align with the From domain.

## Relaxed vs strict

Relaxed alignment allows an organizational-domain relationship. Strict alignment requires the domains to match exactly.

Only one aligned authentication path is required for DMARC to pass.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
