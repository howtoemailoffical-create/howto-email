---
title: SMTP PIPELINING
description: Why some SMTP clients send multiple commands without waiting for each reply.
section: Reference
tags: [SMTP, ESMTP]
---

PIPELINING is an ESMTP extension that lets a client send groups of commands without waiting for an individual reply after every command. This reduces round trips, especially on higher-latency links.

The server advertises `PIPELINING` in its EHLO response. Clients still have to associate returned replies with the commands in the correct order.

When reading packet captures, a pipelined session can look unusual if you expect strict command-response-command-response behavior.

## Reference material

- [RFC 2920 — SMTP Service Extension for Command Pipelining](https://www.rfc-editor.org/rfc/rfc2920)
