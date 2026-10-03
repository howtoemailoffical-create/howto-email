---
title: Email service recovery runbook
description: Restore mail in dependency order and use SMTP retry behavior to your advantage.
section: Do
tags: [Disaster Recovery, Operations, SMTP]
---

Start by defining the failure domain: DNS, network, gateway, mail platform, identity, storage or a third-party provider.

## Restore dependencies

Bring back authoritative DNS and required network/identity services before expecting every mail component to recover.

## Watch queues

Inspect your own outbound queues and, after inbound service returns, monitor delayed traffic arriving from remote senders.

## Validate

Test inbound, outbound, internal, application relay, authentication and mailbox access separately.

## Reconcile

Look for expired messages, duplicate application notifications, missed journal/DLP processing and temporary workarounds that must be removed.

## Reference material

- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/final)
- [RFC 5321 — SMTP retries](https://www.rfc-editor.org/rfc/rfc5321)
