---
title: Hunt a malicious attachment across email
description: Use hashes and message metadata to scope attachment-based campaigns.
section: Do
tags: [Threat Hunting, Malware, Security]
---

Preserve the original attachment through approved incident tooling.

Calculate or obtain a cryptographic hash without opening the file on a normal workstation.

Search mail/security telemetry for that hash where supported, then pivot to filenames, message identifiers, sender infrastructure and recipients.

Determine which copies were blocked, quarantined or delivered and coordinate endpoint investigation for recipients who may have opened the file.

Filename equality alone is weak evidence; hashes and message context are stronger pivots.

## Reference material

- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
- [NIST FIPS 180-4 — Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
