---
title: Does email header order matter?
description: Some trace and repeated fields have meaningful ordering even though headers are not a simple key-value dictionary.
section: Reference
tags: [Headers, Message Format, Troubleshooting]
---

Email headers are not safely modeled as a dictionary with one value per field name.

A message can contain multiple `Received` fields, and their order is essential to reconstructing the route.

Other fields have cardinality and placement rules defined by message-format specifications.

When writing parsers, preserve repeated fields and original ordering unless the relevant standard explicitly says otherwise.

## Reference material

- [RFC 5322 — Internet Message Format](https://www.rfc-editor.org/rfc/rfc5322)
