---
title: Received header
description: Reference for SMTP Received trace fields.
section: Reference
tags: [Headers, SMTP]
---

SMTP systems normally prepend a `Received` trace field when accepting a message. A chain can show hostnames, IPs, protocol details, timestamps and identifiers.

Because earlier fields may originate outside your trust boundary, anchor analysis in headers added by systems you trust and work backward through the chain.
