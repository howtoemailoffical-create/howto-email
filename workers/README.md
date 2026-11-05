# HowToEmail assessment — deployment

This feature branch implements a server-graded educational assessment with practice explanations, a printable certificate, a PNG badge, and signed public verification. It is NOT YET deployed: the Cloudflare environment requires a private question bank and signing secret.

## Required Cloudflare configuration

The existing howto-email Worker is already configured to serve API routes through worker/index.js and to serve Astro static assets from dist/. The new routes require:

- QUESTION_BANK — Workers KV binding with key assessment-v1 containing the private, reviewed JSON array of 200 questions.
- SIGNING_SECRET — Cloudflare Worker secret with at least 32 random bytes of entropy.
- ASSESSMENT_RATE_LIMITER — optional global, non-identifying rate-limiting binding. Configure a high shared limit; a per-user counter is deliberately not used.

The private bank must never enter the public repository, the Astro assets, an Actions artifact, or a public issue.

## One-time setup, from an authenticated local clone

1. Run npm ci, npm run validate, npm test, and npm run build.
2. Authenticate with npx wrangler login.
3. Create KV: npx wrangler kv namespace create howto-email-private-questions --binding QUESTION_BANK --update-config
4. Ensure wrangler.jsonc contains a kv_namespaces entry with binding QUESTION_BANK and the actual namespace ID returned by Wrangler. Cloudflare can also be configured through the dashboard if that binding is kept in sync with the deployment configuration.
5. Obtain private-question-bank.json from the owner, outside the repository. Validate it with:

    npm run validate:assessment-bank -- /secure/path/private-question-bank.json

6. Upload it to the remote namespace with:

    npx wrangler kv key put assessment-v1 --binding QUESTION_BANK --path /secure/path/private-question-bank.json --remote

7. Set the secret without committing it or putting it in shell history:

    openssl rand -hex 32 | npx wrangler secret put SIGNING_SECRET

8. Deploy the existing Worker and its built static assets:

    npx wrangler deploy

For a GitHub-connected automatic deployment, configure the same KV binding and secret in the Cloudflare project BEFORE merging this branch. No GitHub Actions are necessary.

## Production acceptance tests

- Visit https://howto.email/quiz/ and complete a practice quiz: check randomized questions, explanation, reference link, exit score and no account request.
- Visit https://howto.email/quiz/assessment/ and confirm 40 randomized questions, back/next navigation, answered count and 60-minute timer.
- In a controlled staging test, pass with 32/40 or higher and confirm the printable certificate, downloadable badge, credential ID and LinkedIn instructions.
- Open https://howto.email/verify/ with a valid credential link, then test a modified token and an invalid token.
- Confirm mobile and desktop layout, screen reader/keyboard navigation, iOS print to PDF, and that the existing Domain Check and Domain Intelligence tools remain operational.

## Privacy, integrity and trust boundaries

The app does not create users, save names, store submitted answers, retain attempt history, or persist verification tokens. The display name is only inserted by the browser into its own printable certificate. Cloudflare may still process network request metadata under its infrastructure logging policies. The bank and its correct-answer indices live only in a private KV namespace.

The server signs exam sessions and credentials using HMAC-SHA256. Each exam has 40 cryptographically randomized questions and choices; a session expires after 60 minutes and 32 answers must be correct to pass. A bearer verification link confirms issuance and score, NOT identity; a printed name does not constitute identity verification. Verification uses URL fragments and POST to minimize leaked URL query parameters.

This is an educational assessment, not an accredited or proctored professional certification. An anonymous system cannot stop all cheating: practice feedback can be used for learning, exams may be retaken, signed session tokens can be replayed until expiry, and credentials can be shared. Strong anti-replay would require additional server-side storage. Do not advertise tamper-proof testing or identity proof.

The current HMAC key MUST remain stable for long-lived certificate verification; rotating it without multi-key support invalidates old credentials. The optional global limiter does not store client addresses or IDs, but Cloudflare-side protection and logging settings remain infrastructure considerations.

## Endpoints

- POST /api/assessment/practice/start — select topic and 10, 25, 50, or all questions.
- POST /api/assessment/practice/check — return correctness, explanation and documentation URL for a practice question.
- POST /api/assessment/start — start a signed 40-question examination.
- POST /api/assessment/submit — grade against the private bank and issue a signed passing credential.
- POST /api/assessment/verify — validate a credential token without a URL query string.
