---
title: Troubleshoot DKIM that fails after a gateway
description: Compare the message before and after the intermediary instead of rotating keys blindly.
section: Do
tags: [DKIM, Gateway, Troubleshooting]
---

If DKIM passes before a gateway and fails after it, the key is probably not your first suspect.

Capture both versions where possible.

Compare:

- Subject changes;
- disclaimer/footer insertion;
- MIME boundary changes;
- content encoding;
- modified signed headers;
- body changes.

Read the signature's `h=` list and `c=` canonicalization setting.

If the gateway must modify outbound mail, consider whether DKIM signing should happen after that modification instead of before it.

## Reference material

- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 6377 — DKIM and Mailing Lists](https://www.rfc-editor.org/rfc/rfc6377)
