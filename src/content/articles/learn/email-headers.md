---
title: Reading email headers
description: Use headers to reconstruct routing, authentication and message identity.
section: Learn
tags: [Headers, Troubleshooting]
---

Headers are evidence. `Received` fields record hops, `Authentication-Results` records receiver authentication conclusions, and fields such as `Return-Path`, `Message-ID`, `From`, `Date` and DKIM signatures expose message identity and processing.

## Read the path correctly

Trusted systems prepend Received fields, so analysts normally reconstruct the route from the bottom upward while treating untrusted, sender-supplied fields cautiously.

## Authentication

Do not stop at seeing the word `pass`. Identify which domain passed SPF or DKIM and whether that identity aligns with the visible From domain for DMARC.
