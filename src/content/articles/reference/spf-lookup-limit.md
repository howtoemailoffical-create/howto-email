---
title: SPF DNS lookup limit
description: Why a syntactically valid SPF record can still return permerror.
section: Reference
tags: [SPF, DNS, Troubleshooting]
---

SPF limits the number of terms that cause DNS queries during one evaluation.

Mechanisms and modifiers such as `include`, `a`, `mx`, `ptr`, `exists` and `redirect` can contribute according to RFC 7208's processing rules.

Exceeding the permitted limit produces `permerror`.

## Includes hide complexity

A short-looking record can exceed the limit because each provider include can recursively reference more DNS-triggering terms.

Count the evaluation path, not the number of words in the top-level TXT record.

## Reference material

- [RFC 7208 — SPF processing limits](https://www.rfc-editor.org/rfc/rfc7208)
