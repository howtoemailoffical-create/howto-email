---
title: DKIM-Signature header
description: Understand selectors, signing domains, canonicalization and signed headers.
section: Reference
tags: [DKIM, Headers]
---

A `DKIM-Signature` contains parameters describing a cryptographic signature. Important tags include `d` for signing domain, `s` for selector, `a` for algorithm, `c` for canonicalization, `h` for signed headers and `bh` for the body hash.

The selector and signing domain locate the public key in DNS under `selector._domainkey.domain`.
