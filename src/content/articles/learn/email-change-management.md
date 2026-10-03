---
title: Change management for email infrastructure
description: Treat DNS, routing and authentication changes as production changes with observable rollback.
section: Learn
tags: [Operations, Change Management, DNS]
---

Email changes can affect systems outside your direct control because DNS caches, remote queues and third-party providers participate in delivery.

A good change plan states:

- current state;
- desired state;
- exact records/rules changing;
- validation tests;
- expected propagation or queue behavior;
- rollback conditions;
- owner and maintenance window.

## Avoid simultaneous mystery

Changing MX, SPF, DKIM, gateway routing and application credentials at the same time makes failures harder to isolate.

Stage changes where the architecture allows it.

## Reference material

- [NIST SP 800-128 — Security-Focused Configuration Management](https://csrc.nist.gov/pubs/sp/800/128/upd1/final)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
