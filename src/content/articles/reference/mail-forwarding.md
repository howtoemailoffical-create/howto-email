---
title: Mailbox forwarding
description: Automatic forwarding is useful, but it changes routing, data exposure and authentication behavior.
section: Reference
tags: [Forwarding, Mailbox, Security]
---

Mailbox forwarding redirects or copies messages to another address after they reach a mailbox or service.

External forwarding can move organizational data outside managed boundaries. It can also complicate SPF/DMARC because the forwarded SMTP connection is different from the original delivery.

## Security angle

Attackers who compromise accounts sometimes create forwarding rules to retain visibility into conversations.

Monitor administrative and user-created forwarding according to the platform's capabilities and organizational policy.

## Reference material

- [RFC 7960 — DMARC and Indirect Email Flows](https://www.rfc-editor.org/rfc/rfc7960)
- [Microsoft — Configure email forwarding](https://learn.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-user-mailboxes/configure-email-forwarding)
