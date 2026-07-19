# Agent documentation

These files provide project-specific context for AI agents working in this
repository.

Use this directory for durable knowledge about the repository, its systems,
workflows, and conventions.

Skills do **not** live here. Skills describe reusable, cross-repo workflows and
are installed under `.claude/skills/` and `.agents/skills/` (see `skills.md`).
These docs describe *this* repository and the systems around it.

## Common starting points

- `systems.md` - external systems this repo depends on
- `systems/` - one file per external system (Cloudflare Pages, GitHub Actions)
- `skills.md` - installed agent skills and how to add more
- `issue-tracker.md`, `triage-labels.md`, `domain.md` - the tracker, triage
  vocabulary, and domain-doc layout (written by `setup-matt-pocock-skills`)

## Domain docs

This is a **multi-context** repo: one `CONTEXT.md` per app, indexed by
`CONTEXT-MAP.md` at the repo root, plus `docs/adr/` for architectural decisions.
See `domain.md`.
