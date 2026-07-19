# Issue tracker - Linear

Issues for this repo live in **Linear**:

- Workspace: `jimnist`
- Team: **Jimnist** (`JIM`)
- Project: **websites** - https://linear.app/jimnist/project/websites-6dea255bc8ad

Create and read issues via the **Linear MCP tools** (`save_issue`, `list_issues`,
`get_issue`, `list_issue_statuses`, `list_issue_labels`). GitHub PRs are **not** a
triage surface for this repo.

## Creating an issue

Use `save_issue` with `team: "Jimnist"` and `project: "websites"`. `title` is
required; put the body in `description` as Markdown - send literal newlines, not
escape sequences.

Because this is a monorepo, name the app in the title or description (e.g.
`[jimnist-com]`, `[loco8]`, `[engine-earring]`, or `[monorepo]` for
repo-wide work) so issues are attributable to a context.

## Ticket dependencies

Use **native blocking links**, not prose. On `save_issue`, set `blocks` /
`blockedBy` to the identifiers/IDs of the related issues (e.g.
`blockedBy: ["JIM-12"]`). This is the dependency graph `to-tickets` relies on.

## Triage labels

Apply via `labels: [...]` on `save_issue` (see `triage-labels.md`). `to-spec`
tags a finished spec `ready-for-agent`.

## Workflow states

`Backlog -> Todo -> In Progress -> In Review -> Done` (plus `Canceled`,
`Duplicate`). New issues land in **Backlog**; move a spec/ticket to **Todo** once
it is `ready-for-agent`. Set via `state` on `save_issue` (e.g. `state: "Todo"`).
