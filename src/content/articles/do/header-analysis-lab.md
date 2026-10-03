---
title: Lab: analyze a message header
description: Practice separating transport, authentication and visible message identities.
section: Do
tags: [Lab, Headers, Authentication]
---

Take a raw message from a mailbox you control.

Find:

1. `From`;
2. `Reply-To` if present;
3. `Return-Path`;
4. `Message-ID`;
5. trusted `Received` fields;
6. trusted `Authentication-Results`;
7. DKIM `d=` and `s=`;
8. SPF identity;
9. DMARC result.

Now answer three separate questions:

- What identity did the user see?
- What path transported the message?
- What domains actually authenticated?

Keeping those questions separate prevents a lot of bad header analysis.

## Reference material

- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 8601 — Authentication-Results](https://www.rfc-editor.org/rfc/rfc8601)
- [RFC 9989 — DMARC](https://www.rfc-editor.org/rfc/rfc9989)
