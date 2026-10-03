---
title: SMTP queues and retry behavior
description: How MTAs handle temporary delivery failures.
section: Reference
tags: [SMTP, Operations]
---

When a remote system returns a temporary failure or cannot be reached, an MTA normally queues the message and retries according to its configured schedule. Retry intervals and total queue lifetime vary by implementation and operator policy.

Operators should distinguish healthy temporary queueing from a growing backlog caused by DNS, routing, TLS, reputation or downstream outages.
