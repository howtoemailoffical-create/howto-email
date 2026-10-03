---
title: Why email is store-and-forward
description: Queues and retries are a core feature, not necessarily a failure.
section: Learn
tags: [SMTP, Architecture]
---

Email was built to tolerate temporary unavailability. A sending MTA can accept responsibility for a message, queue it locally and keep attempting delivery when the destination cannot accept it immediately.

That is different from an interactive protocol where both endpoints need to stay connected for the entire transaction.

## What this means operationally

A few queued messages are not automatically an incident. The useful questions are whether the queue is growing, how old the oldest messages are, which destinations are affected, and what SMTP or network errors caused the deferral.

## Reference material

- [RFC 5321 — SMTP queueing and retry behavior](https://www.rfc-editor.org/rfc/rfc5321)
