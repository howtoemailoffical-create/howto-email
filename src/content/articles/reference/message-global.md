---
title: Internationalized email messages
description: How SMTPUTF8 and UTF-8 message headers extend traditional Internet mail.
section: Reference
tags: [SMTPUTF8, Internationalization, Headers]
---

Traditional Internet mail placed strong ASCII constraints on addresses and headers. The internationalized email standards extend SMTP and message format to support UTF-8 where participating systems advertise the required capabilities.

A system that accepts internationalized addresses needs to consider the entire downstream path. Not every older server, application or integration can handle those addresses correctly.

## Reference material

- [RFC 6530 — Overview and Framework for Internationalized Email](https://www.rfc-editor.org/rfc/rfc6530)
- [RFC 6531 — SMTP Extension for Internationalized Email](https://www.rfc-editor.org/rfc/rfc6531)
- [RFC 6532 — Internationalized Email Headers](https://www.rfc-editor.org/rfc/rfc6532)
