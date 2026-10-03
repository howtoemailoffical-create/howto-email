---
title: Email system architecture
description: Understand MUAs, submission services, MTAs, gateways and mailbox stores.
section: Learn
tags: [Architecture, SMTP]
---

A user typically composes mail in a mail user agent (MUA). The message is submitted to a mail submission service, transferred between mail transfer agents (MTAs), filtered by gateways or security services, and ultimately stored for the recipient.

## The useful mental model

Separate **submission**, **transfer**, **filtering**, and **mailbox access**. SMTP handles submission and transfer; IMAP and POP3 are mailbox-access protocols. Hosted platforms may hide these boundaries, but the boundaries still matter when troubleshooting.
