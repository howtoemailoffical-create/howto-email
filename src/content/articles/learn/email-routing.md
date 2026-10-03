---
title: How email finds the destination server
description: From recipient domain to MX lookup to SMTP connection.
section: Learn
tags: [DNS, SMTP, Routing]
---

For an address such as `person@example.com`, the sending system needs to determine where `example.com` accepts mail.

The normal path is:

1. Extract the recipient domain.
2. Query DNS for MX records.
3. Order eligible exchangers by MX preference.
4. Resolve the chosen MX hostname to IP addresses.
5. Attempt SMTP delivery, normally on TCP port 25.
6. Queue and retry when a temporary failure prevents delivery.

This is why an MX problem can look like an SMTP outage even though the receiving application itself is healthy.

## No MX?

SMTP defines fallback behavior involving address records when no MX exists, but explicit MX records are the normal configuration for domains that receive mail. A domain that intentionally accepts no mail can publish Null MX.

## Reference material

- [RFC 5321 — SMTP routing](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 7505 — Null MX](https://www.rfc-editor.org/rfc/rfc7505)
