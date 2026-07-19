# Triage labels

The five canonical triage roles, mapped to **Linear labels** in the Jimnist team
(default names - no overrides). Apply via `labels: [...]` on `save_issue`.

| Role | Label | Meaning |
|---|---|---|
| needs-triage | `needs-triage` | maintainer needs to evaluate |
| needs-info | `needs-info` | waiting on the reporter |
| ready-for-agent | `ready-for-agent` | fully specified, AFK-ready for an agent |
| ready-for-human | `ready-for-human` | needs human implementation |
| wontfix | `wontfix` | will not be actioned |

These triage labels are orthogonal to the type labels (`Bug`, `Feature`,
`Improvement`) - an issue can carry one of each.
