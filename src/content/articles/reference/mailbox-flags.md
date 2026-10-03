---
title: IMAP message flags
description: Seen, Answered, Flagged, Deleted and Draft state in IMAP mailboxes.
section: Reference
tags: [IMAP, Mailbox, Clients]
---

IMAP maintains message state on the server through flags.

Common system flags include `\Seen`, `\Answered`, `\Flagged`, `\Deleted` and `\Draft`.

Because multiple clients can access the same mailbox, flags are part of synchronization rather than purely local UI state.

Provider-specific labels, categories and archive behavior can sit above or beside standard IMAP semantics, so migrations should test the user-visible result rather than assuming every product maps folders and flags identically.

## Reference material

- [RFC 9051 — IMAP4rev2](https://www.rfc-editor.org/rfc/rfc9051)
