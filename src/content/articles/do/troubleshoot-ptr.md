---
title: Troubleshoot reverse DNS for a sending IP
description: Verify the PTR at the IP owner and the corresponding forward address record.
section: Do
tags: [PTR, DNS, Deliverability]
---

Start with the exact public IP used for outbound SMTP.

Perform a reverse lookup and note the PTR hostname.

Then resolve that hostname forward and confirm it maps appropriately back to the sending address.

If the PTR is missing or wrong, contact the provider that controls the IP allocation. Adding a PTR-looking record inside your normal forward DNS zone will not fix reverse DNS.

After changes, verify from public recursive resolvers and retest delivered mail.

## Reference material

- [RFC 1035 — DNS](https://www.rfc-editor.org/rfc/rfc1035)
- [RFC 1912 — Common DNS Errors](https://www.rfc-editor.org/rfc/rfc1912)
