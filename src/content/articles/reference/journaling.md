---
title: Email journaling
description: Capturing message copies for organizational retention or compliance workflows.
section: Reference
tags: [Journaling, Compliance, Architecture]
---

Journaling captures messages or message metadata into a separate repository or compliance workflow.

It is not the same as a user's Sent Items folder and should not be treated as a general-purpose backup without understanding the product design.

A journal path needs monitoring. If the journal destination rejects mail or fills up, the organization needs to know whether messages queue, fail, or continue without being captured.

## Reference material

- [Microsoft — Journaling in Exchange Online](https://learn.microsoft.com/en-us/purview/journaling)
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
