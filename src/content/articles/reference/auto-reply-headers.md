---
title: Auto-reply and precedence headers
description: Common metadata used by automated mail systems and responders.
section: Reference
tags: [Headers, Automation]
---

Automated systems use headers such as `Auto-Submitted` to identify automatically generated messages. Mailing software may also use list metadata and historically uses fields such as `Precedence`.

Auto-response logic should be conservative to avoid mail loops. Do not rely on one non-standard header as the only loop-prevention control.
