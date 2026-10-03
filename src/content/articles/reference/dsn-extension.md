---
title: SMTP DSN extension
description: Requesting delivery status notification behavior during an SMTP transaction.
section: Reference
tags: [SMTP, DSN, ESMTP]
---

The SMTP DSN extension adds parameters that let a client request particular notification behavior and carry original-recipient information.

A supporting server advertises `DSN` through EHLO.

This is related to, but distinct from, the MIME format used for a delivery-status notification message.

## Reference material

- [RFC 3461 — SMTP Service Extension for Delivery Status Notifications](https://www.rfc-editor.org/rfc/rfc3461)
- [RFC 3464 — Delivery Status Notification message format](https://www.rfc-editor.org/rfc/rfc3464)
