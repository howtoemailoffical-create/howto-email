---
title: OAuth and modern mail authentication
description: Token-based authorization for mail clients and applications.
section: Reference
tags: [OAuth, Authentication]
---

Modern mail platforms can use OAuth-based authorization instead of storing a long-lived mailbox password in a client or application. The application obtains scoped tokens through an identity provider and presents them to supported mail or API services.

OAuth reduces some password-handling risks but introduces application registration, token scope, consent and secret/certificate lifecycle considerations.
