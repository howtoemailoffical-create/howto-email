---
title: Test SPF DKIM and DMARC
description: Validate real production authentication from received message evidence.
section: Do
tags: [SPF, DKIM, DMARC]
---

DNS presence is not proof that production mail authenticates.

Send a controlled message through each important sending path. In the received headers, inspect `Authentication-Results`, the envelope identity, DKIM signing domain and visible From domain. Confirm SPF/DKIM outcomes and DMARC alignment.

Repeat with more than one receiving environment when investigating provider-specific behavior.
