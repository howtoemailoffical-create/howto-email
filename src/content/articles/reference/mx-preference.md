---
title: MX preference values
description: Lower MX numbers are preferred, but preference is not a traffic-weighting percentage.
section: Reference
tags: [DNS, MX, Routing]
---

An MX record contains a preference value and an exchanger hostname.

Example:

```text
10 mx1.example.net.
20 mx2.example.net.
```

A sender normally prefers the lower value. If exchangers have equal preference, senders can choose among them according to SMTP routing rules.

Do not treat values 10 and 20 as a 2:1 traffic ratio. They express ordering, not weight.

## Reference material

- [RFC 5321 — Mail routing and MX records](https://www.rfc-editor.org/rfc/rfc5321)
