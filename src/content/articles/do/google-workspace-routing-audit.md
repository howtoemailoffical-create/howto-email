---
title: Audit Google Workspace mail routing
description: Document default routing, split delivery, gateways and recipient changes before troubleshooting loops.
section: Do
tags: [Google Workspace, Routing, Audit]
---

Review Workspace routing settings and identify every rule that changes recipients, adds routes, sends copies or hands mail to another server.

Document inbound gateways, outbound gateways, split/dual delivery and application relay separately.

Then compare the configuration with MX records and the actual message headers from test mail.

Complex routing failures are easier to solve when each rule has an owner and purpose instead of being treated as one giant mail-flow configuration.

## Reference material

- [Google — Route and deliver email](https://support.google.com/a/topic/2921034)
- [Google — Set up an inbound mail gateway](https://support.google.com/a/answer/60730)
