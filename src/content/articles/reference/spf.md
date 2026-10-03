---
title: SPF
description: Sender Policy Framework syntax, evaluation and operational guidance.
section: Reference
tags: [SPF, DNS, Authentication]
---
SPF lets a domain publish which infrastructure is authorized to send mail for the domain evaluated during SMTP.

## Example

```text
v=spf1 ip4:192.0.2.10 include:_spf.example.net -all
```

An SPF policy is published as a DNS TXT record. Common mechanisms include `ip4`, `ip6`, `a`, `mx`, and `include`.

## Operational warning

SPF evaluation has a DNS lookup limit. Repeatedly adding third-party includes without understanding the resulting lookup tree can produce `permerror` and weaken a deployment.