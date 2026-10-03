---
title: DNSSEC
description: Authenticated DNS data and its relevance to email security.
section: Reference
tags: [DNSSEC, DNS]
---

DNSSEC provides origin authentication and integrity for DNS data using a chain of signed records. It does not encrypt DNS queries.

Email technologies such as DANE depend on DNSSEC's authenticated data model. DNSSEC deployment requires correct signing and delegation; broken validation can make records appear unavailable to validating resolvers.
