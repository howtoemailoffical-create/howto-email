---
title: IMAP IDLE
description: How an IMAP client can wait for mailbox changes without constant polling.
section: Reference
tags: [IMAP, Mailbox, Clients]
---

IMAP IDLE lets a client keep a connection open and receive notifications about mailbox changes instead of repeatedly polling.

The server advertises IDLE support as a capability. Clients still need reconnect and resynchronization logic because long-lived network connections fail.

## Reference material

- [RFC 2177 — IMAP4 IDLE command](https://www.rfc-editor.org/rfc/rfc2177)
- [RFC 9051 — IMAP4rev2](https://www.rfc-editor.org/rfc/rfc9051)
