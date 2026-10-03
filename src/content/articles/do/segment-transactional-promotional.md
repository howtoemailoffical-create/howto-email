---
title: Separate transactional and promotional mail
description: Reduce operational coupling between critical notifications and higher-risk subscription traffic.
section: Do
tags: [Bulk Email, Architecture, Deliverability]
---

Start by defining the streams based on purpose.

Transactional mail includes things such as password resets, receipts and account alerts. Promotional/subscription mail includes newsletters, offers and marketing campaigns.

## Separate where it helps

Depending on scale and platform, separation can include:

- different From addresses;
- subdomains;
- DKIM selectors;
- provider configurations;
- bounce domains;
- IP pools.

The goal is not to hide poor reputation. It is to make ownership, authentication, monitoring and failures easier to isolate.

Google's current subscription guidance also recommends separating subscription and non-subscription messages by sending address.

## Reference material

- [Google — Email subscription guidelines](https://support.google.com/mail/answer/15263077)
- [RFC 5321 — SMTP](https://www.rfc-editor.org/rfc/rfc5321)
