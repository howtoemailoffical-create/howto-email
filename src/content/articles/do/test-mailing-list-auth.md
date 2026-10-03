---
title: Test authentication through a mailing list
description: See exactly which authentication mechanisms survive redistribution.
section: Do
tags: [Mailing Lists, DKIM, DMARC]
---

Use a list and mailboxes you are authorized to test.

1. Send a message with known SPF, DKIM and DMARC behavior to the list.
2. Preserve the copy delivered to a subscriber.
3. Compare the original and redistributed headers.
4. Check the new envelope path, DKIM signatures and Authentication-Results.
5. Note subject, footer or MIME changes introduced by the list.
6. If ARC is present, inspect the chain separately from the final DMARC result.

This gives you evidence about the actual list implementation instead of assuming all mailing lists behave the same way.

## Reference material

- [RFC 6377 — DKIM and Mailing Lists](https://www.rfc-editor.org/rfc/rfc6377)
- [RFC 7960 — DMARC and Indirect Email Flows](https://www.rfc-editor.org/rfc/rfc7960)
