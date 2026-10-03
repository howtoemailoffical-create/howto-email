---
title: Monitor email infrastructure
description: What to monitor across DNS, SMTP, TLS, queues and authentication.
section: Do
tags: [Monitoring, Operations]
---

Monitor more than server uptime. Useful signals include DNS resolution, MX reachability, SMTP transaction health, certificate expiry, queue depth, bounce rates, authentication results, DMARC aggregate trends and transport-policy failures.

Use synthetic tests carefully: a successful TCP connection is weaker evidence than a controlled end-to-end transaction. Alert on conditions that require action rather than every harmless fluctuation.
