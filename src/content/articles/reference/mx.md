---
title: MX records
description: Syntax and behavior of DNS mail exchanger records.
section: Reference
tags: [DNS, MX]
---

MX records identify hosts that accept email for a domain.

```text
example.com. 3600 IN MX 10 mx1.example.net.
example.com. 3600 IN MX 20 mx2.example.net.
```

Lower preference values are attempted first. Targets should be hostnames that resolve appropriately; an MX target is not an outbound authorization mechanism.
