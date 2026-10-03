---
title: Received-SPF vs Authentication-Results
description: Two ways authentication observations may appear in headers.
section: Reference
tags: [Headers, SPF, Authentication]
---

`Received-SPF` is a trace field specifically for recording an SPF evaluation. `Authentication-Results` is a broader framework that can record SPF, DKIM, DMARC and other authentication results.

Modern analysis commonly centers on trusted `Authentication-Results` fields because they can show several mechanisms together.

## Trust boundary

Neither header should be trusted merely because it exists. An attacker can place fake fields in the message before sending it. Identify which headers were added by systems inside the receiving environment's trusted boundary.

## Reference material

- [RFC 8601 — Message Header Field for Indicating Message Authentication Status](https://www.rfc-editor.org/rfc/rfc8601)
- [RFC 7208 — Received-SPF](https://www.rfc-editor.org/rfc/rfc7208)
