---
title: IMAP and POP3
description: The traditional protocols used by clients to access stored email.
section: Reference
tags: [IMAP, POP3, Mailbox]
---

IMAP and POP3 are mailbox-access protocols. They are not the protocols used to transfer mail between Internet mail servers.

**IMAP** is designed around server-side mailbox state and synchronization. It supports folders, message flags and clients that leave the authoritative mailbox on the server.

**POP3** is a simpler retrieval model historically associated with downloading messages to a client.

## Common ports

| Protocol | Cleartext / STARTTLS | Implicit TLS |
| --- | ---: | ---: |
| IMAP | 143 | 993 |
| POP3 | 110 | 995 |

Modern deployments should protect authentication and message content with TLS. Many hosted services also favor modern token-based authentication over long-lived mailbox passwords.

## Reference material

- [RFC 9051 — Internet Message Access Protocol (IMAP) Version 4rev2](https://www.rfc-editor.org/rfc/rfc9051)
- [RFC 1939 — Post Office Protocol Version 3](https://www.rfc-editor.org/rfc/rfc1939)
- [RFC 8314 — Cleartext Considered Obsolete for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
