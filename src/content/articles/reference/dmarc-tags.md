---
title: DMARC tags
description: Reference for common DMARC policy and reporting tags.
section: Reference
tags: [DMARC, DNS]
---

A DMARC record begins with `v=DMARC1`. Common tags include `p` for requested policy, `sp` for subdomain policy, `rua` for aggregate reporting, `adkim` and `aspf` for alignment modes, and `pct` where supported by the specification and receiver behavior.

Treat reporting addresses as operational endpoints: reports can be numerous and contain infrastructure metadata.
