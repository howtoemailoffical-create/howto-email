---
title: Troubleshoot SMTP timeouts
description: Find the exact transaction phase that stalled before blaming the network.
section: Do
tags: [SMTP, Troubleshooting, Network]
---

Capture the remote hostname/IP, timestamp and timeout wording.

Then determine the phase:

- TCP connection;
- waiting for 220 greeting;
- EHLO response;
- STARTTLS handshake;
- MAIL/RCPT response;
- DATA transfer;
- final response after message body.

A connection timeout points somewhere different from a server that accepts the entire body and never returns the final `250`.

Check packet/firewall telemetry, server load, DNS, TLS and remote logs according to the phase.

## Reference material

- [RFC 5321 — SMTP timeouts](https://www.rfc-editor.org/rfc/rfc5321)
