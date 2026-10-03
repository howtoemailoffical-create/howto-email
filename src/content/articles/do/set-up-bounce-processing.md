---
title: Set up bounce processing
description: Classify delivery failures and suppress addresses appropriately.
section: Do
tags: [Bounces, Operations]
---

Capture DSNs or provider event data and retain the SMTP/enhanced status details. Distinguish permanent invalid-recipient failures from temporary deferrals and policy/reputation blocks.

Suppress recipients when the evidence indicates the address should no longer be attempted. Avoid treating every 4xx deferral as an invalid address, and monitor sudden bounce-rate changes as an operational signal.
