---
title: Audit a DMARC deployment
description: Review policy, alignment, reporting and subdomain behavior as one system.
section: Do
tags: [DMARC, Audit, Authentication]
---

Query the current DMARC policy and identify:

- policy mode;
- aggregate reporting destinations;
- alignment modes;
- subdomain policy;
- any rollout/testing controls.

Review recent aggregate reports and compare sources with the sender inventory.

Then inspect real messages from major mail streams to confirm the aligned authentication path.

A policy can look strict in DNS while legitimate senders still fail or while important subdomains follow a different effective policy.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
