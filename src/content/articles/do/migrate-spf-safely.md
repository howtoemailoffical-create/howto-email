---
title: Change SPF during a sender migration
description: Authorize overlapping legitimate sources without creating multiple SPF policies.
section: Do
tags: [SPF, Migration, DNS]
---

During a migration, old and new senders may legitimately operate at the same time.

Maintain **one** SPF policy for the evaluated domain and temporarily authorize both sets of required sources.

Watch the DNS lookup limit when adding another provider include.

After the old sender stops, remove its authorization rather than letting SPF accumulate years of abandoned services.

Validate real messages because the provider's recommended include may authenticate a return-path domain that differs from the visible From domain.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
