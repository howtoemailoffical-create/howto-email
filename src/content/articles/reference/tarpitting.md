---
title: SMTP tarpitting
description: Deliberately slowing suspicious SMTP sessions to increase the cost of abuse.
section: Reference
tags: [SMTP, Anti-Spam, Security]
---

Tarpitting delays parts of an SMTP conversation instead of immediately rejecting or accepting.

The goal is to consume more time from abusive senders while legitimate systems continue to operate within protocol timeout expectations.

Poorly tuned tarpitting can consume your own connection resources or delay legitimate mail, so it is an operational control rather than a free defense.

## Reference material

- [RFC 5321 — SMTP timeouts and command behavior](https://www.rfc-editor.org/rfc/rfc5321)
