---
title: TXT and CNAME records in email
description: Common DNS record patterns used by hosted email services.
section: Reference
tags: [DNS]
---

TXT records carry arbitrary text and are widely used for SPF, DMARC, service verification and DKIM public-key data. CNAME records alias one hostname to another and are often used by providers to delegate selectors, tracking hosts or service endpoints.

Follow the provider's exact hostname and record type. Publishing a value at the zone apex versus a prefixed hostname such as `_dmarc` or `selector._domainkey` changes what protocol can find it.
