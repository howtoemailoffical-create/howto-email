---
title: Mailing lists and authentication
description: Why legitimate mailing lists can break SPF, DKIM and DMARC, and how to reason about the result.
section: Learn
tags: [Mailing Lists, DMARC, DKIM, Forwarding]
---

A mailing list is not a transparent SMTP relay. It receives a message and redistributes it, often with a new envelope sender and sometimes with changes to the message itself.

That matters to authentication.

## SPF

The list server becomes the SMTP source seen by the final recipient. SPF for the original sender normally no longer describes that connection.

## DKIM

DKIM can survive redistribution if the signed content stays intact. Lists commonly add subject tags, footers, headers, or modify MIME content. Depending on what was signed, those changes can invalidate the original signature.

## DMARC

If SPF no longer aligns and the aligned DKIM signature is broken, DMARC can fail even though the original message was legitimate.

ARC gives intermediaries a way to preserve authentication observations, but the final receiver still decides whether it trusts the chain.

## Reference material

- [RFC 6377 — DKIM and Mailing Lists](https://www.rfc-editor.org/rfc/rfc6377)
- [RFC 7960 — DMARC and Indirect Email Flows](https://www.rfc-editor.org/rfc/rfc7960)
- [RFC 8617 — Authenticated Received Chain](https://www.rfc-editor.org/rfc/rfc8617)
