---
title: DNS for email
description: How DNS controls email routing, identity and policy.
section: Learn
tags: [DNS, Architecture]
---

Email depends on DNS for routing and policy. MX records advertise receiving hosts; A and AAAA resolve hostnames; TXT commonly carries SPF, DKIM-related data and DMARC; PTR provides reverse DNS for sending IPs.

## Receiving is not sending

MX records control inbound routing. They do not authorize outbound senders. SPF, DKIM and DMARC solve different identity problems.

## Troubleshooting order

Start at delegation, query authoritative answers, resolve MX targets, then inspect the authentication records relevant to the sending path. This avoids changing mail systems when the fault is actually DNS.
