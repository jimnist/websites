# Domain docs

**Multi-context** repo: a `CONTEXT-MAP.md` at the repo root lists the contexts
(one per app, plus the shared `packages/components`), each with its own
`CONTEXT.md`. Architectural decisions live in `docs/adr/` at the repo root.

Consumers (`to-spec`, `to-tickets`, `improve-codebase-architecture`,
`diagnosing-bugs`, `tdd`):

- Read **`CONTEXT-MAP.md`** first to find which context a topic belongs to. If
  it's unclear, ask.
- Read that context's **`CONTEXT.md`** for its ubiquitous language before naming
  things or writing specs/tickets - use its vocabulary throughout.
- Read **`docs/adr/`** for past architectural decisions and respect them in the
  area you're touching.
- When you resolve a new term or make a new architectural decision, update the
  relevant `CONTEXT.md` / add an ADR - that is the `domain-modeling` skill's job.

## Contexts

| Context | Lives in |
|---|---|
| `jimnist-com` | `apps/jimnist-com/CONTEXT.md` |
| `loco8` | `apps/loco8/CONTEXT.md` |
| `engine-earring` | `apps/engine-earring/CONTEXT.md` |

The `packages/components` package is a shared support library, not its own
bounded context yet; document it inside whichever app's `CONTEXT.md` first
depends on it, or promote it to its own `CONTEXT.md` if it grows.
