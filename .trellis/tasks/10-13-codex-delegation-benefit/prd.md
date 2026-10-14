# Codex auto mode: choose delegation by actual benefit

## Goal

Keep `codex.dispatch_mode: auto` as the default and make it adaptive. Codex
should preserve continuity for coupled work while delegating independently
useful work. Completing a plan must not automatically spawn an implementation
or check agent.

## Background and evidence

- The user approved creation and planning on 2026-10-13, then clarified:
  "我的意思就是这个auto模式智能一点，现在全是派出子代理的".
- Canonical checkout: `Tools/Trellis/.claude/worktrees/beta4-local-fixes`;
  actual branch `local/beta`, initial HEAD `cc04bedf`, fast-forwarded to the
  verified remote HEAD `69082469` (one LOCAL-FORK.md-only commit). The checkout
  was clean before this task. The historical directory name is not a branch name.
- `packages/cli/src/templates/trellis/workflow.md:240` tells the main session
  to dispatch implement/check agents by default. Phase 2 walkthroughs and
  active-task routing repeat this direction.
- `packages/cli/src/templates/shared-hooks/inject-workflow-state.py:335`
  already describes an ownership choice, but `resolve_breadcrumb_key` at
  line 356 sends auto mode into the unconditional shared dispatch breadcrumb.
- `packages/cli/src/templates/trellis/scripts/common/workflow_phase.py:198`
  maps auto mode to `codex-sub-agent`, selecting the same mandatory walkthrough.
- The referenced OpenKnowledge chat used one child while the parent performed
  real preflight/recovery work. This is evidence of some parallelism, not proof
  that every individual dispatch was wasteful. The repeated source instruction
  is the confirmed systematic problem. See `research/evidence.md`.

## Requirements

1. Preserve the default `auto` configuration and the existing `sub-agent` alias.
   Auto means choosing ownership from task structure and actual benefit; it
   does not mean unconditional delegation or silently changing to inline mode.
2. Prefer the main session for a continuous, tightly coupled implementation,
   quick change, or work that relies heavily on context already held there.
   A task being complex, planned, or in `in_progress` is insufficient reason
   to delegate. Do not delegate the entire next serial phase merely to wait.
3. Delegate only with a bounded deliverable and a concrete benefit: independent
   parallel work, useful context isolation, specialized capability, or an
   authorized independent review. Parallel benefit can be one child plus useful
   independent parent work; there is no minimum child count.
4. Reassess ownership at meaningful boundaries without repeatedly spawning new
   children. Keep one writer per scope, preserve authorization, and use existing
   dispatch/context-injection contracts when delegation is selected.
5. A user request to continue inline takes precedence. Main-session execution
   still loads the relevant before-dev/check skills, artifacts, and specs and
   performs required verification. The existence of roles or JSONL manifests
   is not a dispatch requirement.
6. Keep generated Codex breadcrumbs, phase detail, config help, and dogfood
   copies consistent. Preserve other platforms' behavior, model pins, task
   review/commit gates, native context injection, and task identity isolation.

## Acceptance criteria

- Default and explicit auto both present adaptive ownership guidance in planning
  and execution; neither tells Codex to dispatch implement/check unconditionally.
- A serial single-scope fix routes to main-session work; two independent scopes
  may delegate; a bounded noisy investigation may use one isolated child; an
  authorized independent review remains available. Instructions explain these
  outcomes without numeric scoring or invented quotas.
- Explicit inline execution is respected. Auto does not bypass required spec,
  artifact, testing, planning-review, or commit-decision gates.
- Real hook and phase-parser fixtures cover auto, the legacy alias, inline,
  invalid configuration, and a non-Codex platform. Generated init/update content
  includes both usable main-session skills and delegation support.
- Existing context-injection/model-preservation regressions, focused tests,
  lint, and typecheck pass. Prompt-output tests prove routing text, not that a
  live model will always make the right judgment; report that boundary.

## Out of scope

No new model, paid benchmark, scoring system, delegation framework, automatic
global rollout, source publication, or changes to other platforms' default
strategy. Global routing rules already allow solo/parallel/isolation/review;
they do not need rewriting to forbid all sequential subagents. The independent
OpenKnowledge task keeps its owner. The user approved this plan on 2026-10-13
with "整体上没问题"; commits, installed-project rollout and publication remain
separate decisions.
