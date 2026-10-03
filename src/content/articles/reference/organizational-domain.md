---
title: DMARC organizational domain
description: How DMARC determines the policy domain around subdomains.
section: Reference
tags: [DMARC, DNS]
---

DMARC uses the concept of an organizational domain to find policy and evaluate relaxed alignment across related names. Determination relies on the prevailing public-suffix boundary model rather than simply taking the last two labels of every hostname.

This matters for domains under multi-label public suffixes and for subdomain policy behavior.
