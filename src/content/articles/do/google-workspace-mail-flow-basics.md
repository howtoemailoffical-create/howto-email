---
title: Google Workspace mail flow checklist
description: Review routing, gateways, SMTP relay and authentication around Google Workspace.
section: Do
tags: [Google Workspace, Gmail, Operations]
---

A Google Workspace domain can have more than one mail path. Routing rules, inbound gateways, outbound gateways, SMTP relay and third-party senders can all change what the final receiver sees.

## Build the path first

Inventory:

- domains and aliases;
- inbound and outbound gateways;
- routing rules;
- SMTP relay users and applications;
- marketing and transactional platforms;
- systems that modify messages after DKIM signing.

## Verify authentication from the receiving side

Send controlled messages through each important path and inspect the received headers. Confirm SPF, DKIM and DMARC results and the identities that were evaluated.

Google's sender requirements change over time, especially for higher-volume senders. Treat Google's current sender-guideline page as the source of truth for Gmail-specific requirements rather than copying a threshold into a permanent internal checklist.

## Reference material

- [Google — Email sender guidelines](https://support.google.com/a/answer/81126)
- [Google — Email sender guidelines FAQ](https://support.google.com/a/answer/14229414)
- [Google — Set up SPF](https://support.google.com/a/answer/33786)
- [Google — Set up DKIM](https://support.google.com/a/answer/174124)
- [Google — Set up DMARC](https://support.google.com/a/answer/2466580)
