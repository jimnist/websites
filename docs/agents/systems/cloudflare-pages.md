# Cloudflare Pages

The hosting target. Each app is a **separate Cloudflare Pages project**, deployed
from its own built `dist/`:

| App | Pages project | Domain |
|---|---|---|
| `apps/jimnist-com` | `jimnist-com` | jimnist.com |
| `apps/loco8` | `loco8` | loco8.org |
| `apps/engine-earring` | `engine-earring` | engine-earring.com |

Deploys happen from CI via `wrangler pages deploy` - see
`systems/github-actions.md`. The account is selected by
`CLOUDFLARE_ACCOUNT_ID`; auth is `CLOUDFLARE_API_TOKEN` (both GitHub secrets).

## Basic auth on jimnist-com

jimnist-com gates two route prefixes behind HTTP basic auth using a Pages
Functions middleware at `apps/jimnist-com/functions/_middleware.ts`:

- Protected prefixes: `/2bwed` and `/photos` (matched with `startsWith`).
- Credentials come from Cloudflare env vars `BASIC_AUTH_USER` and
  `BASIC_AUTH_PASS`, configured on the `jimnist-com` Pages project.
- If those env vars are **unset**, the middleware falls through and allows
  access (intended for local/dev). Setting them is what actually enforces the
  gate in production - don't assume the routes are protected unless the Pages
  project has both vars.

Only jimnist-com has a `functions/` directory; the other two apps are pure
static output with no middleware.
