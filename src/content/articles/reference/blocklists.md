---
title: Email blocklists
description: DNS-based reputation lists are signals used by some receivers, not a universal Internet ban list.
section: Reference
tags: [Deliverability, Reputation, DNSBL]
---

A DNS-based blocklist can publish information about IP addresses or domains associated with unwanted behavior according to that list operator's criteria.

Receiving systems decide whether and how to use a list.

Being listed does not mean every provider will reject mail, and being absent does not guarantee inbox placement.

If listed, first stop any underlying abuse. Then follow the specific list operator's documented remediation process.

## Reference material

- [RFC 5782 — DNS Blacklists and Whitelists](https://www.rfc-editor.org/rfc/rfc5782)
