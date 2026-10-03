---
title: Message-ID
description: A message identifier useful for correlation but not a cryptographic identity.
section: Reference
tags: [Headers, Troubleshooting]
---

`Message-ID` is a globally unique-style identifier associated with a message.

```text
Message-ID: <20261003.abc123@example.com>
```

It is extremely useful when correlating a message across client, gateway and server logs.

## What it does not prove

Message-ID is message content, not a cryptographic proof of origin. A malicious sender can choose a value, and some systems can generate or replace missing identifiers.

Use it as a correlation key together with trusted logs, timestamps and other evidence.

## Reference material

- [RFC 5322 — Message-ID and identification fields](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 6409 — Message submission](https://www.rfc-editor.org/rfc/rfc6409)
