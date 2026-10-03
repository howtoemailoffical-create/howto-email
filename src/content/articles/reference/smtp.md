---
title: SMTP
description: The protocol that moves email between clients, submission services and mail servers.
section: Reference
tags: [SMTP, Protocols]
---

SMTP is the transport system behind Internet email. It moves a message from one system to another; it does not define how a user reads a mailbox.

## A normal SMTP conversation

A basic server-to-server exchange looks roughly like this:

```text
S: 220 mx.example.net ESMTP
C: EHLO sender.example
S: 250-mx.example.net
S: 250-STARTTLS
C: STARTTLS
...
C: MAIL FROM:<bounce@example.org>
S: 250 2.1.0 OK
C: RCPT TO:<user@example.net>
S: 250 2.1.5 OK
C: DATA
S: 354 End data with <CRLF>.<CRLF>
...
S: 250 2.0.0 queued
C: QUIT
```

Real sessions can advertise many more ESMTP extensions, negotiate TLS, authenticate a submitting client, reject individual recipients, or temporarily defer delivery.

## Submission vs transfer

Port **25** is primarily used between mail servers. End-user and application submission normally uses **587**, or **465** with implicit TLS. Keeping submission separate from server-to-server transfer lets operators apply authentication and relay policy without breaking public mail exchange.

## The envelope matters

`MAIL FROM` and `RCPT TO` form the SMTP envelope. They are not the same thing as the visible `From:` and `To:` headers inside the message. This distinction explains a lot of behavior around Bcc, bounces, SPF and DMARC.

## Replies

A **2xx** reply is successful, **4xx** is normally temporary, and **5xx** is normally a permanent failure for that attempt. Keep the full remote reply when troubleshooting; the text and enhanced status code often tell you more than the first three digits.

## Reference material

- [RFC 5321 — Simple Mail Transfer Protocol](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 6409 — Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 8314 — Cleartext Considered Obsolete for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
