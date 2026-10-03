---
title: SMTP timeouts and slow sessions
description: Why mail servers cannot wait forever for the next command or response.
section: Reference
tags: [SMTP, Operations, Troubleshooting]
---

SMTP defines minimum timeout expectations for parts of a transaction, while implementations can have additional operational controls.

Slow or stalled sessions consume connections and resources. At the same time, overly aggressive timeouts can break delivery across slow networks or overloaded systems.

When diagnosing intermittent SMTP timeout failures, identify **which phase** timed out: connect, greeting, EHLO, STARTTLS, MAIL, RCPT, DATA transfer or final acceptance.

## Reference material

- [RFC 5321 — SMTP timeouts](https://www.rfc-editor.org/rfc/rfc5321)
