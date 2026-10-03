---
title: Null MX
description: How a domain explicitly states that it accepts no email.
section: Reference
tags: [DNS, MX]
---

A Null MX record signals that a domain does not accept email. It uses preference 0 and the root label as the exchanger.

```text
example.com. IN MX 0 .
```

This is clearer than leaving ambiguous DNS for domains that intentionally never receive mail.
