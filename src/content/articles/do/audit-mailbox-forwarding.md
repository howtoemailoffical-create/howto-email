---
title: Audit mailbox forwarding
description: Find intentional and suspicious forwarding before it becomes invisible data movement.
section: Do
tags: [Forwarding, Security, Audit]
---

Build an inventory of server-side forwarding configured across the mail platform.

For each forward, identify:

- source mailbox;
- destination;
- internal or external;
- who configured it where logs permit;
- business owner;
- whether a copy remains locally.

Review external destinations more closely and compare them with organizational policy.

During incident response, also inspect inbox rules and application/OAuth access because forwarding can be implemented through more than one feature.

## Reference material

- [Microsoft — Configure email forwarding](https://learn.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-user-mailboxes/configure-email-forwarding)
- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
