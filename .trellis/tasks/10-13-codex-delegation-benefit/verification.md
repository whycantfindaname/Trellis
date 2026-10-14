# Adaptive Codex auto verification

Date: 2026-10-13. Source actor: windows+codex (Windows-driven edits over SSH).
Canonical repository: oppo-remote-8A100, Trellis beta4-local-fixes worktree,
branch local/beta, starting/current committed HEAD 6908246978e79678b28bfa48796280062ad7e6a1.
The user approved implementation with "整体上没问题". Scoped source and deployment commits were approved on 2026-10-14.

## Delivered behavior

Default auto and its sub-agent alias select adaptive planning/execution guidance.
Continuous coupled work stays in the main session; bounded delegation needs actual
parallel, isolation, specialized-capability or independent-review benefit. Explicit
inline remains available. Main-session before-dev/check, review/commit gates,
manifests, native SubagentStart, child fallback and role model pins remain intact.
The existing codex-sub-agent virtual label preserves custom-workflow compatibility.
The repository dogfood and marketplace native workflow mirror the source policy.

## Verification evidence

Windows FastCtx job logs are under D:/Users/S9063923/.fastctx/jobs/<id>/output.log.

- Before implementation: six codex-adaptive-auto regressions failed against the
  previous forced-dispatch guidance (j-rog48u), demonstrating the bug.
- Regression/templates/Codex configurator/registry invariants: 591 passed (j-3frhxe).
- Init/update first run: 110 passed, one outdated platform-marker assertion failed
  (j-f00k9o). The actual generated template already contained adaptive routing.
  Updated that assertion to require separate Codex auto blocks and both auto tags.
- Full update integration rerun: 57 passed (j-k2izen); init's 54 tests passed in
  the previous run. Total distinct focused tests: 702.
- ESLint and TypeScript typecheck passed initially and after the assertion update
  (j-enrei2, j-k2izen). Existing npm project-config deprecation warnings remain.
- basedpyright: 0 errors, 68 existing unused-import warnings in unchanged modules
  (j-enrei2).
- GitNexus 1.6.12 index-only analysis completed before symbol edits. Five impact
  queries returned LOW (j-kaox77); final detect-changes returned low (j-qwfvpy).
  Indexed flow coverage is incomplete; this is supporting evidence, not proof
  that no consumers exist.
- Byte equality checked: template/shared hook against both hook copies; config.py
  and workflow_phase.py against dogfood; native marketplace workflow against CLI
  workflow template. Dogfood workflow preserves its three existing description args.
- task.py validate passed both five-entry manifests. Two long specs exceed injection
  budgets; relevant source sections were read directly in the main session.
- Trellis and marketplace git diff --check passed.
- Full CLI suite first run: 2108 passed, 2 skipped, one unchanged platforms-list
  test exceeded its existing 10-second limit (j-3gv43a). The three tests in that
  file passed independently (j-tdwpdw). A complete rerun with --maxWorkers=4
  passed all 87 files: 2109 passed, 2 existing skips (j-ggv0i7). No assertion or
  timeout was weakened. Final CLI verification is complete.

- Final compatibility regression: legacy custom no_task-inline and arbitrary
  status-inline tags must retain their prior selection and breadcrumb behavior.
  The new assertions failed before the correction (j-hk4m28). Inline suffixes
  now remain valid for every status; adaptive auto variants cover active phases.
- Final complete validation after that correction (j-ri9om3): all 87 CLI files
  passed, 2109 tests passed, 2 existing skips; ESLint and TypeScript passed;
  basedpyright reported 0 errors and the same 68 existing warnings. Hook mirror
  equality and both repository diff checks passed afterward (j-iaxt0m).

These tests verify emitted guidance, generation/update behavior and runtime parsers.
They do not prove every future model will choose the correct owner. Existing user
custom workflows retained their fallback content during source validation. Subsequent
authorized rollout and custom-workflow adoption are recorded in deployment.md.

## Approved commit batch (2026-10-14)

1. Marketplace submodule: `fix(workflows): make Codex auto delegation adaptive`
   - workflows/native/workflow.md
2. Trellis local/beta: `fix(codex): choose auto delegation by actual benefit`
   - .claude/hooks/inject-workflow-state.py
   - .codex/hooks/inject-workflow-state.py
   - .trellis/config.yaml
   - .trellis/scripts/common/config.py
   - .trellis/scripts/common/workflow_phase.py
   - .trellis/spec/cli/backend/platform-integration.md
   - .trellis/spec/cli/backend/workflow-state-contract.md
   - .trellis/workflow.md
   - marketplace (gitlink to the approved submodule commit)
   - packages/cli/src/templates/shared-hooks/inject-workflow-state.py
   - packages/cli/src/templates/trellis/config.yaml
   - packages/cli/src/templates/trellis/scripts/common/config.py
   - packages/cli/src/templates/trellis/scripts/common/workflow_phase.py
   - packages/cli/src/templates/trellis/workflow.md
   - packages/cli/test/commands/update.integration.test.ts
   - packages/cli/test/regression.test.ts
   - packages/cli/test/templates/trellis.test.ts
   - .trellis/tasks/10-13-codex-delegation-benefit/task.json
   - .trellis/tasks/10-13-codex-delegation-benefit/prd.md
   - .trellis/tasks/10-13-codex-delegation-benefit/design.md
   - .trellis/tasks/10-13-codex-delegation-benefit/implement.md
   - .trellis/tasks/10-13-codex-delegation-benefit/implement.jsonl
   - .trellis/tasks/10-13-codex-delegation-benefit/check.jsonl
   - .trellis/tasks/10-13-codex-delegation-benefit/research/evidence.md
   - .trellis/tasks/10-13-codex-delegation-benefit/verification.md

No foreign dirty paths were observed in this worktree or marketplace. Preserve any
later concurrent changes. Apply Source-Actor: windows+codex to approved commits.
Task archive/journal and source publication remain outside this proposed work batch.
Do not invoke finish-work while these work changes remain uncommitted.

## 2026-10-14 installed-project rollout

See [deployment.md](deployment.md) and [deployment-manifest.json](deployment-manifest.json) for exact changed paths, backups, native checks and blockers. Windows 19/19 and three reachable Linux hosts each 30/30 passed actual hook/workflow probes; Linux CLI fresh generation passed. 8A100 native verification is blocked by SSH connection refusal. Windows currently has no resolvable CLI. No commits or publication were performed; original commit gates remain.

## Commit-time check

The user approved the source, marketplace and exact deployment commit batch.
Previous final code tests and GitNexus low-risk evidence remain applicable. A fresh
4L40S detect-changes invocation found no registered index; index-only rebuild then
failed in a native worker (Napi::Error). This failed retry is not reported as passing.
No implementation change followed the completed 2109-pass validation.
Marketplace commit: `f6eaa7163dbcf002a3b46c2f6cbd1bde5297b7e3`. No publication was authorized or performed.
