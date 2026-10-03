---
title: Troubleshoot DKIM failures
description: Diagnose selector, DNS, signing and message-modification problems.
section: Do
tags: [DKIM, Troubleshooting]
---

Read the DKIM-Signature to identify `d=` and `s=`, then query the corresponding public-key hostname. Confirm the key exists and is syntactically usable.

If DNS is correct, determine whether the sender actually signed the message and whether an intermediary modified signed headers or body content. Compare failures with a known-good message from the same path.
