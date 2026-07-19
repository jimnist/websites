# CONTEXT-MAP

This repo has **multiple bounded contexts** - one per app. Each has its own
`CONTEXT.md` (ubiquitous language + durable domain facts). Architectural
decisions that span the monorepo live in `docs/adr/` at the repo root.

When working in an app, read its `CONTEXT.md` before naming things or writing
specs/tickets. If it's unclear which context a topic belongs to, ask.

## Contexts

| Context | Lives in | What it is |
|---|---|---|
| `jimnist-com` | `apps/jimnist-com/CONTEXT.md` | Personal site (jimnist.com); pixel-art homepage, projects, wedding, photo galleries; basic-auth-gated routes. |
| `loco8` | `apps/loco8/CONTEXT.md` | loco8.org. |
| `engine-earring` | `apps/engine-earring/CONTEXT.md` | engine-earring.com; minimal, early-stage. |

## Shared support

`packages/components` is a shared component library backing the apps. It is not
its own bounded context yet - it is underdeveloped and shares no runtime code
across the apps today. Document a shared component inside the first app's
`CONTEXT.md` that depends on it; promote `packages/components` to its own
`CONTEXT.md` only if it grows into a real shared domain.
