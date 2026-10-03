---
title: SMTP SIZE extension
description: How a server advertises message-size support before DATA.
section: Reference
tags: [SMTP, ESMTP]
---

The SMTP SIZE extension lets a server advertise support for declaring message size. A client can include a SIZE parameter on `MAIL FROM`, allowing a server to reject an obviously oversized message before transferring the body.

The advertised number is a server capability, but real delivery paths can contain other gateways with their own limits. MIME encoding also makes a binary attachment larger on the wire.

## Reference material

- [RFC 1870 — SMTP Service Extension for Message Size Declaration](https://www.rfc-editor.org/rfc/rfc1870)
