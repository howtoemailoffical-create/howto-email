---
title: PTR and reverse DNS
description: How reverse DNS is used around outbound email infrastructure.
section: Reference
tags: [DNS, Deliverability]
---

A PTR record maps an IP address to a hostname. For outbound mail, receivers commonly inspect reverse DNS as one infrastructure-quality signal.

PTR zones are controlled by the owner of the IP space, so senders usually configure reverse DNS through their hosting or network provider rather than their normal domain DNS zone.

A sensible mail host configuration uses stable naming and forward DNS that agrees with the intended host identity.
