---
title: Configure DKIM
description: Publish a selector and verify production signing end to end.
section: Do
tags: [DKIM, DNS]
---

Generate or enable DKIM in the sending platform, publish the provider's public-key record at the exact selector hostname, and wait until public DNS returns the expected value.

Then send through the production path and inspect the received message. Confirm DKIM passes, the expected selector is used, and the `d=` signing domain is appropriate for DMARC alignment.
