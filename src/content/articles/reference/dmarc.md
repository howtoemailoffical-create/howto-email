---
title: DMARC
description: Domain-based Message Authentication, Reporting and Conformance policy and reporting reference.
section: Reference
tags: [DMARC, SPF, DKIM, DNS]
---
DMARC evaluates whether SPF or DKIM authentication aligns with the domain in the visible From header.

## Example

```text
v=DMARC1; p=none; rua=mailto:dmarc@example.com
```

Policies include `none`, `quarantine`, and `reject`. Moving to enforcement should follow sender discovery and authentication work rather than treating `p=reject` as a first step.

Aggregate reports can help domain owners identify legitimate senders, authentication failures and unauthorized use of their domain.