---
title: Mail queue incident runbook
description: Use age, destination and response patterns to decide whether a queue is healthy backlog or an outage.
section: Do
tags: [Queues, Incident Response, SMTP]
---

When a queue grows, record a baseline before clearing or forcing anything.

Check:

- queue depth;
- oldest age;
- arrival rate;
- top destinations;
- top SMTP responses;
- source applications;
- available disk/resources.

If one destination dominates, investigate that route. If every destination is backing up, investigate local DNS, networking, TLS, MTA health or upstream relay.

Avoid mass-forcing retries into a destination that is explicitly throttling you.

After recovery, verify queue drain rate and watch for messages that expired during the incident.

## Reference material

- [RFC 5321 — SMTP queueing and retry](https://www.rfc-editor.org/rfc/rfc5321)
- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
