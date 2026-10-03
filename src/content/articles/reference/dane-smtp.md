---
title: DANE for SMTP
description: Using DNSSEC-backed TLSA records to authenticate SMTP TLS.
section: Reference
tags: [DANE, TLS, DNSSEC]
---

DANE for SMTP uses DNSSEC-authenticated TLSA records to associate mail services with TLS credentials or keys. Unlike MTA-STS, its trust model depends on DNSSEC rather than an HTTPS policy channel.

Operational deployment requires correct DNSSEC, TLSA publication and key/certificate lifecycle management.
