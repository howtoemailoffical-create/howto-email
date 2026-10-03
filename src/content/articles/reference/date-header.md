---
title: Date header
description: What the Date field represents and why it is not a delivery timestamp.
section: Reference
tags: [Headers, Message Format]
---

The `Date:` header represents the date and time associated with message origination. It is normally supplied by the composing or submitting system.

It should not be used as the only evidence for when a receiving system actually handled the message. Client clocks can be wrong, generated messages can be malformed, and the value is part of message content.

For delivery timing, compare trusted `Received` trace fields and server logs.

## Reference material

- [RFC 5322 — Origination date field](https://www.rfc-editor.org/rfc/rfc5322)
