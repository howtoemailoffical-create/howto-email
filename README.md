# howto.email

Free, open-source, vendor-neutral documentation and troubleshooting tools for email infrastructure.

Production: https://howto.email

## What is here

The knowledge base covers SMTP, DNS, SPF, DKIM, DMARC, TLS, deliverability, security, mailbox protocols, Microsoft 365, Google Workspace, application sending, troubleshooting, and email operations. Interactive tools such as Domain Check connect public configuration findings to the relevant documentation.

## Development

Requires Node.js 22 or later.

```bash
npm ci
npm run validate
npm run build
npm run dev
```

`npm run validate` performs repository-specific content checks. `npm run build` remains the authoritative Astro production-build check.

Cloudflare deploys the static Astro output and Worker/API routes from this repository.

## Contributing and security

See `CONTRIBUTING.md` before submitting content or code. See `SECURITY.md` for security-reporting guidance.

## Licensing

Project code is licensed under the MIT License. Original article content is licensed separately under CC BY 4.0; see `CONTENT-LICENSE.md`.
