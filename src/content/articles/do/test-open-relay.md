---
title: Test relay controls safely
description: Verify your own SMTP server cannot relay arbitrary third-party mail.
section: Do
tags: [SMTP, Security, Relay]
---

Only test infrastructure you own or are authorized to assess.

A public inbound MX should accept recipients in domains it serves while refusing unauthorized relay to unrelated external domains.

Test from a network that is **not** implicitly trusted and without authenticating.

Compare:

- external sender -> your local recipient;
- external sender -> unrelated external recipient.

The first can be legitimate inbound mail. The second should not be accepted as unrestricted relay.

Do not actually deliver spam or use third-party recipients for the test.

## Reference material

- [RFC 5321 — SMTP relay](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 6409 — Message Submission](https://www.rfc-editor.org/rfc/rfc6409)
