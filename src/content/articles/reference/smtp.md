---
title: SMTP
 description: Simple Mail Transfer Protocol reference for message submission and server-to-server email transport.
section: Reference
tags: [SMTP, Transport]
---
**SMTP** is the application-layer protocol used to transfer email.

## Common ports

- **25** — server-to-server SMTP transport.
- **587** — commonly used for authenticated message submission.
- **465** — message submission using implicit TLS.

## Typical conversation

A basic SMTP session uses commands such as `EHLO`, `MAIL FROM`, `RCPT TO`, `DATA` and `QUIT`.

SMTP reply codes indicate whether an operation succeeded, temporarily failed or permanently failed. In general, 2xx responses indicate success, 4xx responses indicate temporary failure, and 5xx responses indicate permanent failure.