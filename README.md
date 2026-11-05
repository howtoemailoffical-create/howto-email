# howto.email

Free, open-source, vendor-neutral documentation and troubleshooting tools for email infrastructure.

Production: https://howto.email

## What is here

The knowledge base covers SMTP, DNS, SPF, DKIM, DMARC, TLS, deliverability, security, mailbox protocols, Microsoft 365, Google Workspace, application sending, troubleshooting, and email operations. Interactive tools such as Domain Check connect public configuration findings to the relevant documentation.

## Development

Requires Node.js 22 or later.

```bash
npm install
npm run validate
npm run build
npm run dev
```

`npm run validate` performs repository-specific content checks. `npm run build` remains the authoritative Astro production-build check.

Cloudflare deploys the static Astro output and Worker/API routes from this repository.

## Email knowledge assessment

The /quiz/ practice tool and /quiz/assessment/ 40-question knowledge assessment run against a **private Cloudflare KV question bank**. Passing results are signed and publicly verifiable at /verify/ without user accounts or stored names. The badge is a downloadable SVG and the printable certificate is generated entirely in the browser. Only the signed verification link proves an issued result; names printed on certificates and SVG badges are local display text and are not identity-verified. This is educational evidence of an assessment result, not a proctored or accredited qualification.

Run `npm test` to execute the JavaScript regression tests, and see `workers/README.md` for the private question bank, Cloudflare secret provisioning and deployment checklist. Do not include the private bank in the public GitHub repository or static build output.

## Contributing and security

See `CONTRIBUTING.md` before submitting content or code. See `SECURITY.md` for security-reporting guidance.

## Licensing

Project code is licensed under the MIT License. Original article content is licensed separately under CC BY 4.0; see `CONTENT-LICENSE.md`.
