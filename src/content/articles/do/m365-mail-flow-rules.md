---
title: Work safely with Exchange Online mail flow rules
description: Avoid broad transport-rule changes that unexpectedly rewrite, redirect or reject production mail.
section: Do
tags: [Microsoft 365, Exchange Online, Operations]
---

Mail flow rules can inspect messages and take actions such as adding headers, redirecting, rejecting, moderating or applying disclaimers.

That power makes testing important.

## Before enforcement

Write down exactly what should match and what should not. Test representative internal, inbound and outbound messages, including exceptions.

## Watch interactions

Rules can overlap. Order, stop-processing behavior, exceptions and later changes can produce results that are hard to predict from one rule viewed in isolation.

## Message modification

Rules that alter subjects, bodies or headers can affect downstream processing and, in some architectures, DKIM signatures.

## Reference material

- [Microsoft — Best practices for mail flow rules](https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/configuration-best-practices)
- [Microsoft — Mail flow rule actions](https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/mail-flow-rule-actions)
