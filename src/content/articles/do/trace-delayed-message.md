---
title: Trace a delayed message
description: Use Received headers and server logs to find where time was actually lost.
section: Do
tags: [Headers, Troubleshooting, SMTP]
---

Start with the full raw headers from the delivered message.

## 1. Build the timeline

Read trusted `Received` fields and record each timestamp. Work from systems you trust backward through the path.

## 2. Find the gap

If one hop accepted the message at 10:02 and the next did not receive it until 10:47, investigate the system responsible for that interval.

## 3. Correlate logs

Use queue IDs, Message-ID, envelope addresses and timestamps to find the transaction in SMTP or gateway logs. Look for 4xx responses, connection failures, DNS errors, rate limiting or TLS failures.

## 4. Separate queue delay from mailbox delay

If the final receiving service accepted the message promptly, later client synchronization or mailbox processing is a different problem.

## Reference material

- [RFC 5321 — SMTP trace and queue behavior](https://www.rfc-editor.org/rfc/rfc5321)
- [RFC 5322 — Message trace fields](https://www.rfc-editor.org/rfc/rfc5322)
