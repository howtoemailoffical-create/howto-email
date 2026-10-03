---
title: Plan an email platform migration
description: Reduce delivery and authentication failures during a mail-platform change.
section: Do
tags: [Migration, Operations]
---

Inventory domains, aliases, mailboxes, applications, relays, connectors, DKIM selectors, SPF sources, DMARC reporting and inbound routing before changing anything.

Plan coexistence where required, lower DNS TTLs only when useful, stage authentication records, test representative inbound/outbound paths and preserve rollback options.

After cutover, monitor queues, bounces, authentication results, DMARC data and application-generated mail. Forgotten SMTP devices and SaaS senders are common migration failures.
