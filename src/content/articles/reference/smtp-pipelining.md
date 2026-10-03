---
title: SMTP PIPELINING
description: An ESMTP extension that reduces round trips by allowing commands to be sent without waiting for every reply.
section: Reference
tags: [SMTP, ESMTP, Performance]
---

A server advertising `PIPELINING` allows a client to send certain SMTP commands in groups without waiting for each individual response first.

The client must still correctly match replies to commands and stop where the protocol requires it.

PIPELINING improves efficiency on higher-latency links; it does not change relay authorization or message semantics.

## Reference material

- [RFC 2920 — SMTP Service Extension for Command Pipelining](https://www.rfc-editor.org/rfc/rfc2920)
