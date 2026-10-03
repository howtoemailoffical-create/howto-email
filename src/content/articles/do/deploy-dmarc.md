---
title: Deploy DMARC safely
description: Move from visibility to enforcement without blocking legitimate senders.
section: Do
tags: [DMARC, Operations]
---

Start with a complete sender inventory and working SPF/DKIM. Publish DMARC reporting, review aggregate data, identify legitimate sources, and correct alignment problems before enforcement.

Move toward quarantine or reject deliberately. Continue monitoring after enforcement because new SaaS platforms and forgotten application senders can reintroduce failures.

DMARC protects use of the domain in the visible From field; it is not a universal anti-spoofing control for every lookalike domain.
