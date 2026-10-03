---
title: Validate a bulk email before launch
description: Check a real rendered message and its transport metadata before sending at scale.
section: Do
tags: [Bulk Email, Testing, Deliverability]
---

Send a small controlled test through the **same production path** the campaign will use.

Check:

1. visible From and Reply-To;
2. SPF, DKIM and DMARC;
3. links and redirect domains;
4. plain-text and HTML rendering;
5. unsubscribe behavior;
6. List-Unsubscribe headers where applicable;
7. MIME/attachment structure;
8. actual SMTP source and bounce domain;
9. message size;
10. provider-specific requirements.

A template preview inside the marketing platform does not prove the delivered message has the right headers or authentication.

## Reference material

- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
- [RFC 8058 — One-Click Unsubscribe](https://www.rfc-editor.org/rfc/rfc8058)
- [Google — Email sender guidelines](https://support.google.com/mail/answer/81126)
