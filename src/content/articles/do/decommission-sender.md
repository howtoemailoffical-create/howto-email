---
title: Decommission an email sending service
description: Remove a former sender without breaking other mail paths.
section: Do
tags: [Operations, DNS]
---

Confirm the platform has stopped sending and that no application still depends on it. Remove obsolete SPF authorization, retire provider-specific DKIM selectors after an appropriate overlap period, and clean up unused verification or tracking records.

Watch DMARC and delivery telemetry after removal. Historical documentation should record when and why the sender was decommissioned so an old integration is not silently re-enabled later.
