# Systems

This repo is three static sites and their delivery pipeline. It talks to two
external systems, both about shipping the built output - there is no runtime
backend, database, or third-party API.

## Cloudflare Pages

The hosting target. Each app deploys to its own Cloudflare Pages project.
jimnist-com additionally runs a Pages Functions middleware for basic auth on a
couple of routes.

Used for:

- Hosting the three built Astro sites
- Basic-auth gating jimnist-com's `/2bwed/` and `/photos/` routes

Read more:

- `systems/cloudflare-pages.md`

## GitHub Actions

The deploy pipeline. On every push to `main`, three parallel jobs build and
deploy the three apps to their Cloudflare Pages projects.

Used for:

- Building and deploying each app on push to `main`

Read more:

- `systems/github-actions.md`
