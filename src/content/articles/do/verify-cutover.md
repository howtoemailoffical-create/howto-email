---
title: Verify an email platform cutover
description: Prove inbound, outbound, application and authentication paths after migration.
section: Do
tags: [Migration, Testing, Operations]
---

A successful mailbox login does not prove the mail migration is complete.

Test:

- external -> user;
- user -> external;
- internal -> internal;
- application/device relay;
- aliases/groups/shared mailboxes;
- replies;
- attachments;
- SPF/DKIM/DMARC;
- gateway and connector paths;
- quarantine/filtering;
- message tracing/logging;
- mobile/client access where relevant.

Keep the old platform observable during the stabilization period so forgotten senders or cached routes are visible.

## Reference material

- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5598 — Internet Mail Architecture](https://www.rfc-editor.org/rfc/rfc5598)
