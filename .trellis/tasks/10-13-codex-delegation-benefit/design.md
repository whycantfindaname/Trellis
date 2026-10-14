# Adaptive Codex auto routing

## Decision

Keep the existing configuration surface: auto remains default, inline remains
an explicit user choice, and sub-agent remains the legacy alias for auto.
The agent decides ownership from the documented criteria. Do not implement a
heuristic classifier, scoring table, new task flag, or external coordinator.

## Routing changes

Introduce Codex-specific adaptive planning/execution breadcrumb variants and
matching phase sections in the workflow template. Route Codex auto to those
variants instead of the shared mandatory-dispatch sections. Keep other platforms
on their existing routes and preserve no-task/error/finish behavior. Align the
mode banner and full walkthrough so neither contradicts the other.

The adaptive execution path first checks explicit user intent and ownership.
For coupled work the main session reads artifacts/specs through before-dev,
implements, and uses the check skill. For a genuinely independent assignment it
uses the existing Trellis role, Active task header, manifests, native hook,
child-side fallback, and one-writer ownership rules. The parent continues useful
independent work or waits only for a genuinely needed result. An independent
review is a separate value judgment, not a mandatory phase handoff.

Keep existing manifest curation as available shared task context; files being
present or required by planning must not imply that a child must be launched.
No manifest/schema change is planned. If inspection reveals that the current
gate makes main-session auto execution impossible, resolve it with the existing
context-loading contract before proposing any new state.

## Source and generated copies

Primary files are the CLI workflow/config templates, the shared workflow hook,
common workflow-phase resolver, Codex-facing generated instructions where they
repeat the old semantics, and relevant tests/specs. Mirror changed Python and
workflow/config files to the repository's dogfood copies using the existing
project conventions. Preserve model keys and native SubagentStart behavior.

Use actual init/update or template-rendering tests to verify generated projects;
checking only this worktree's workflow file would leave downstream behavior
unchanged. Installed project rollouts are a separate selected-delivery step.

## Constraints and risks

The workflow parser must recognize any new platform/tag variant. Test CLI phase
selection and native hook selection together. Existing project customizations
must retain normal update conflict handling. Stale installed templates may
continue the old behavior until updated; report source versus activated state.
GitNexus 1.6.12 was indexed with analyze --index-only before symbol edits.
Impact checks for the five affected routing/config symbols returned LOW risk.
The existing codex-sub-agent virtual label is retained for custom-workflow
compatibility; only its native content becomes adaptive. Custom workflows
without auto breadcrumbs keep their existing plain-status fallback.

Rollback is a scoped reversal of this task's changes, preserving all concurrent
work. No service restart, global mode change, branch rename, commit, or push is
included in the implementation approval.
