---
title: Greylisting
description: Temporary SMTP deferral as an anti-abuse technique.
section: Reference
tags: [SMTP, Anti-Spam]
---

Greylisting temporarily rejects or defers an initial delivery attempt, expecting a legitimate sending MTA to retry. It can reduce some low-quality automated abuse but also adds latency and is less useful against well-behaved malicious infrastructure.

A temporary greylisting response should be handled as a 4xx condition by a conforming sender.
