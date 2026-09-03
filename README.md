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

## Agent skills

This repo vendors a set of agent skills from Matt Pocock's
["Skills For Real Engineers"](https://github.com/mattpocock/skills). They are
committed on purpose: real files in `.agents/skills/`, symlinked from
`.claude/skills/`, with `skills-lock.json` as the manifest.

They are a **snapshot, not a pin**. `skills-lock.json` records a source and a
content hash but no version or ref, so nothing here tracks upstream
automatically and nothing tells you when it drifted. Check and refresh them
periodically:

```bash
git log -1 --date=short --format='%h %ad' -- .agents/skills/   # when last changed
npx skills@latest update -p                                    # pull latest
git diff                                                       # review before committing
```

Run these from the repo root - the tool resolves paths against the current
working directory and never walks up to the git root. Review the diff rather
than committing blind; these skills change how the agent works, sometimes
substantially. See `docs/agents/skills.md` for the full set and the install
flags.
