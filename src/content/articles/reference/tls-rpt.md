---
title: TLS-RPT
description: Aggregate reporting for SMTP TLS failures.
section: Reference
tags: [TLS, TLS-RPT]
---

SMTP TLS Reporting lets a domain request aggregate reports about TLS negotiation and policy failures observed by participating senders. It is published beneath `_smtp._tls` in DNS and can complement MTA-STS or DANE operations.

Reports help distinguish certificate, policy, DNS and negotiation failures at scale.
