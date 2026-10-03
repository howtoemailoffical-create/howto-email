---
title: How mailbox migrations work
description: Separate data migration, coexistence and mail-flow cutover.
section: Learn
tags: [Migration, Mailbox, Operations]
---

A mailbox migration can involve several independent jobs:

- creating identities and mailboxes;
- copying historical data;
- preserving folders/labels and metadata;
- coexistence between platforms;
- changing mail routing;
- reconfiguring clients;
- moving applications and relays;
- updating authentication.

## Data and routing are different

Copying all historical mail does not move new inbound delivery. Changing MX does not migrate old messages.

Treat those as separate workstreams and define when each source becomes authoritative.

## Reference material

- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
