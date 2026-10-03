---
title: Migrate DKIM between email providers
description: Use selectors to overlap old and new signing rather than forcing a flag-day key replacement.
section: Do
tags: [DKIM, Migration, DNS]
---

DKIM selectors are designed to let multiple keys coexist.

## Before cutover

Publish the new provider's DKIM record or CNAME and verify it resolves correctly.

## During overlap

Allow the old provider's selector to remain published while old messages can still be in queues and while traffic transitions.

Verify delivered messages from the new provider show a valid signature with the expected `d=` domain and new selector.

## Retire

After the old sender is fully decommissioned and its signed messages have had time to clear normal delivery paths, remove the obsolete key according to your operational policy.

## Reference material

- [RFC 6376 — DKIM](https://www.rfc-editor.org/rfc/rfc6376)
