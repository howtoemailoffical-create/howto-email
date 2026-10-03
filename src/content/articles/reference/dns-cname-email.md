---
title: CNAME records in email configurations
description: Where CNAME is useful and where it cannot replace MX or coexist with other data.
section: Reference
tags: [DNS, CNAME, Email]
---

Email providers commonly use CNAME records for DKIM selectors, tracking domains or service discovery.

A CNAME makes one DNS name an alias of another name. The aliased name has restrictions on coexisting DNS data.

## MX is different

An MX record contains the hostname of a mail exchanger. You do not publish a CNAME *instead of* an MX just because a provider gives you a hostname.

Follow the exact record type the service documents.

## Reference material

- [RFC 1034 — Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 1035 — Domain Names: Implementation and Specification](https://www.rfc-editor.org/rfc/rfc1035)
