---
title: Troubleshoot SMTP TLS
description: Diagnose STARTTLS, certificates, protocol compatibility and policy failures.
section: Do
tags: [TLS, Troubleshooting]
---

Confirm the destination and port, then determine whether STARTTLS is advertised. Capture the certificate chain, names, validity period and negotiated protocol/cipher where appropriate.

If transport policy is involved, compare the failure with MTA-STS, DANE or local sender policy. TLS-RPT data can expose failures that occur only between certain senders and your MX hosts.
