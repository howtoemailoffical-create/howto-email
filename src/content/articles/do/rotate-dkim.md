---
title: Rotate DKIM keys
description: Rotate selectors without breaking validation for in-flight mail.
section: Do
tags: [DKIM, Operations]
---

Create a new selector and key, publish its public key, and verify DNS before switching signing. After production begins using the new selector, confirm received messages validate.

Keep the previous public key available during an overlap period so queued or delayed messages signed with the old selector can still validate. Retire it only after the old selector is no longer needed.
