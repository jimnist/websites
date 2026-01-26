# jimnist-websites

Monorepo containing personal websites built with Astro and deployed to Cloudflare Pages.

## Sites

| App | URL | Description |
|-----|-----|-------------|
| jimnist-com | jimnist.com | Personal site with pixel art and photo galleries |
| loco8 | loco8.org | - |
| engine-earring | engine-earring.com | - |

dadbod.cc and nistyland.com redirect to jimnist.com.

## Development

Requires [Bun](https://bun.sh/) v1.3.5+.

```bash
bun install

# Run dev servers
bun run dev:jimnist         # port 4321
bun run dev:loco8           # port 4322
bun run dev:engine-earring  # port 4323

# Build
bun run build:jimnist
bun run build:loco8
bun run build:engine-earring
bun run build:all
```

## Deployment

Push to `main` to deploy all sites via GitHub Actions to Cloudflare Pages.
