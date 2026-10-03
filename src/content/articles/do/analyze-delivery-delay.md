---
title: Analyze an email delivery delay
description: Use Received timestamps and queue logs to find where the time was actually spent.
section: Do
tags: [Troubleshooting, Headers, Queues]
---

Get the raw delivered header and read trusted `Received` fields from the receiving side backward.

Compare timestamps between hops.

Then correlate the largest gap with queue or gateway logs.

A message can be delayed:

- before the sender submitted it;
- in the sender's queue;
- during remote throttling;
- in a gateway;
- after final delivery due to mailbox/client behavior.

Do not call a message "SMTP delayed" until you know which interval was slow.

## Reference material

- [RFC 5321 — Received trace fields](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5322 — Date fields](https://www.rfc-editor.org/rfc/rfc5322)
