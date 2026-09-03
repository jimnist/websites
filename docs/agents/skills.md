# Skills

This repo ships with agent skills from Matt Pocock's
["Skills For Real Engineers"](https://github.com/mattpocock/skills), installed
via the `skills.sh` tool at **project level** - not globally.

## Layout

- `.agents/skills/` - the real skill files (agent-agnostic canonical location).
- `.claude/skills/` - **symlinks** into `.agents/skills/` so Claude Code finds
  them.
- `skills-lock.json` - records what's installed, from where, with `skills.sh`
  content hashes.

## Installed

| Skill | Purpose |
|---|---|
| `grill-with-docs` | A relentless interview that sharpens a plan/design **and** writes docs (ADRs + glossary) as you go. Run before building anything non-trivial. |
| `grilling` | The interview engine `grill-with-docs` drives - one hard question at a time until shared understanding. |
| `domain-modeling` | The doc-writing engine - builds the glossary (`CONTEXT.md`) and ADRs (`docs/adr/`). |
| `setup-matt-pocock-skills` | One-time setup: picks the issue tracker, triage labels, and where docs live. **Prerequisite** for `to-spec`/`to-tickets`. |
| `to-spec` | Synthesizes the current conversation into a spec/PRD and publishes it to the tracker (`ready-for-agent`). No interview. |
| `to-tickets` | Breaks a spec/plan into tracer-bullet, vertical-slice tickets with blocking edges, published to the tracker. |
| `implement` | Builds a ticket end to end. |

All are **user-invoked** (`/skill-name`); the agent does not auto-invoke them.

## The flow

```
/setup-matt-pocock-skills   (once - configures tracker + labels + doc dir)
        |
        v
/grill-with-docs            (align on the design -> CONTEXT.md + docs/adr/)
        |
        v
/to-spec                    (synthesize the spec -> tracker)
        |
        v
/to-tickets                 (slice into tracer-bullet tickets -> tracker)
        |
        v
implement                   (build ticket by ticket)
```

## Adding / updating skills

Run these from the repo root - the directory that owns `skills-lock.json`. The
tool resolves everything relative to the current working directory and never
walks up to the git root.

```bash
# add a skill: project-level (no -g), Claude Code only, named skills, no prompts
npx skills@latest add mattpocock/skills -a claude-code -s <name> -y

# see what the repo offers without installing
npx skills@latest add mattpocock/skills -l

# pull latest versions of what is already installed here
npx skills@latest update -p

# restore everything from skills-lock.json (fresh clone)
npx skills experimental_install
```

Never pass `-g/--global` - that installs into `~/.claude/skills`, where the
skills load their descriptions into every session of every repo. Never pass
`--help` after `add`; it is ignored and the full install runs anyway.

Browse the catalog in the
[`mattpocock/skills`](https://github.com/mattpocock/skills) README.
