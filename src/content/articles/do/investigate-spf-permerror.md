---
title: Investigate SPF permerror
description: Treat a permanent SPF evaluation error as a broken policy, not a neutral result.
section: Do
tags: [SPF, Troubleshooting, DNS]
---

Capture the domain SPF evaluated from a real message.

Retrieve its TXT policy and validate syntax.

Then follow DNS-triggering mechanisms and count processing according to RFC 7208. Look for:

- multiple SPF records;
- invalid syntax;
- too many DNS-querying terms;
- broken includes;
- recursive problems.

Fix the policy at its source instead of adding more mechanisms to compensate.

## Reference material

- [RFC 7208 — SPF](https://www.rfc-editor.org/rfc/rfc7208)
