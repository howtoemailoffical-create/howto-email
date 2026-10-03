---
title: SMTP message submission
description: Why application/client submission is separated from server-to-server SMTP relay.
section: Reference
tags: [SMTP, Submission, Ports]
---

Message submission gives clients and applications a service with policy appropriate for **new outgoing mail**, separate from MTA-to-MTA relay.

Port **587** is reserved for message submission. Port **465** is registered for submissions using implicit TLS.

A submission service can authenticate users, enforce sender policy, add missing message fields and reject malformed submissions before the message enters normal relay.

## TLS

RFC 8314 recommends TLS for submission/access and prefers implicit TLS where practical, while also describing STARTTLS submission during the transition.

## Reference material

- [RFC 6409 — Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409)
- [RFC 8314 — TLS for Email Submission and Access](https://www.rfc-editor.org/rfc/rfc8314)
