---
title: SPF mechanisms and qualifiers
description: Reference for include, ip4, ip6, a, mx, exists, all and qualifiers.
section: Reference
tags: [SPF, DNS]
---

SPF mechanisms describe authorized sources. Common mechanisms include `ip4`, `ip6`, `include`, `a`, `mx`, `exists` and `all`. Qualifiers include `+`, `-`, `~` and `?`.

SPF evaluation has DNS lookup limits. Deep chains of provider `include` statements can cause permanent errors even when the record looks syntactically valid.
