---
title: Test an email disaster-recovery plan
description: Exercise mail dependencies without learning the plan is theoretical during a real outage.
section: Do
tags: [Disaster Recovery, Testing, Operations]
---

Choose a scenario and define what is allowed to fail.

Examples include loss of the primary gateway, identity outage, DNS failure, certificate failure or loss of an application relay.

Measure whether the team can:

- identify the failure;
- access required credentials/documentation;
- restore or reroute service;
- communicate while email itself is impaired;
- validate inbound/outbound delivery;
- reconcile queued and failed messages.

Record recovery time and gaps, then update the runbook.

Do not perform destructive production failovers without change approval and a rollback plan.

## Reference material

- [NIST SP 800-34 Rev. 1 — Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/final)
