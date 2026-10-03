---
title: Troubleshoot 5.1.1 recipient failures
description: Verify the address and directory before blaming sender reputation.
section: Do
tags: [Bounces, Troubleshooting, Status Codes]
---

A `5.1.1` enhanced status code indicates the destination mailbox address does not exist.

Confirm the recipient address exactly as submitted.

For your own organization, check mailbox, alias/group and directory state. During migrations, verify the recipient exists on the system currently authoritative for the domain.

For external recipients, ask the sender to confirm the address through a trusted channel.

Do not repeatedly retry a permanent invalid-recipient response.

## Reference material

- [RFC 3463 — Enhanced Status Codes](https://www.rfc-editor.org/rfc/rfc3463)
