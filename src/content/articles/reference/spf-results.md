---
title: SPF result meanings
description: Pass, fail, softfail, neutral, none, temperror and permerror.
section: Reference
tags: [SPF, Troubleshooting]
---

SPF returns more than pass or fail.

| Result | Meaning |
| --- | --- |
| pass | Source is authorized by the evaluated policy |
| fail | Policy explicitly says the source is not authorized |
| softfail | Weak negative result |
| neutral | Policy makes no assertion |
| none | No applicable SPF policy |
| temperror | Temporary evaluation problem |
| permerror | Policy cannot be correctly evaluated |

A `permerror` can result from malformed policy or exceeding SPF's DNS lookup limits. Treating it as "basically a pass" defeats the point of having a policy.

## Reference material

- [RFC 7208 — SPF result definitions](https://www.rfc-editor.org/rfc/rfc7208)
