---
title: Move DMARC toward reject
description: Use reporting and sender inventory to reach enforcement without breaking legitimate mail.
section: Do
tags: [DMARC, Operations, Migration]
---

Do not treat `p=reject` as the first DMARC step.

## Inventory

Use known application inventories plus DMARC aggregate data to identify legitimate senders.

## Fix alignment

For each legitimate stream, establish aligned DKIM and/or SPF. DKIM is especially valuable where forwarding can break SPF.

## Observe

Keep monitoring for forgotten systems, new vendors and subdomains.

## Enforce

Move policy deliberately according to your organization's risk tolerance and current DMARC specification. Understand subdomain policy and any percentage/testing behavior you choose to use.

## Continue monitoring

Enforcement is not the end. New SaaS tools and application changes can reintroduce alignment failures.

## Reference material

- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
