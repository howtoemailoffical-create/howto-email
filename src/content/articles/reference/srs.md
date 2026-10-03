---
title: Sender Rewriting Scheme
description: How forwarders can rewrite the envelope sender to address SPF forwarding failures.
section: Reference
tags: [SRS, SPF, Forwarding]
---

Forwarding creates a basic SPF problem: the final receiver sees the forwarder's IP but may evaluate the original envelope sender's SPF policy.

Sender Rewriting Scheme changes the envelope sender into a domain controlled by the forwarder while encoding enough information to route bounces appropriately.

## What SRS fixes

SRS addresses the SPF identity problem created by forwarding.

It does not repair a DKIM signature that was broken by content modification, and it does not guarantee DMARC success. DMARC still needs an aligned authentication path.

## Reference material

- [RFC 7208 — Sender Policy Framework](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 7960 — DMARC and Indirect Email Flows](https://www.rfc-editor.org/rfc/rfc7960)
