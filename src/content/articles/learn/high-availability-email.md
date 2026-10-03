---
title: High availability for email
description: Redundancy, queues and failure behavior in mail infrastructure.
section: Learn
tags: [Architecture, Resilience]
---

SMTP is store-and-forward, so temporary destination failure does not always require immediate message loss. Sending MTAs queue and retry according to policy.

Multiple MX records can provide receiving alternatives, but simply adding servers is not enough. Configuration, certificates, filtering policy, DNS, storage and downstream dependencies must also survive failures.
