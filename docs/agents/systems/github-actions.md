# GitHub Actions

The deploy pipeline lives in `.github/workflows/deploy.yml`. It runs on every
push to **`main`** and fans out into three independent jobs - one per app:

- `deploy-jimnist-com`
- `deploy-loco8`
- `deploy-engine-earring`

Each job is the same shape:

1. `actions/checkout@v4`
2. `oven-sh/setup-bun@v2`
3. `bun install` (installs the whole workspace)
4. `cd apps/<app> && bun run build`
5. `cloudflare/wrangler-action@v3` running
   `pages deploy apps/<app>/dist --project-name=<app>`

## Required secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Notes

- The jobs are **independent** - one app failing to build does not block the
  others. Keep them that way; don't introduce cross-app coupling in CI.
- There is no test/lint gate in the workflow today; a broken build only surfaces
  at deploy time. If you add checks, add them per app so a failure is
  attributable.
- Deploy triggers only on `main`. Feature branches don't deploy.
