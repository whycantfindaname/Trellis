# Implementation plan

Status: implementation and compatibility verification complete.
Final-plan approval was received on
2026-10-13. Full CLI suite: 87 files passed, 2109 tests passed, 2 existing skips.
Lint, type checks, generated init/update, mirror checks and scope review passed.
See verification.md for evidence, limits, owned paths and the proposed commit
batch. The task remains in_progress at the user commit-decision gate; no commit,
archive, journal auto-commit, installed-project rollout or publication occurred.

1. Read the current task artifacts and relevant specs. Recheck branch, dirty
   baseline, remote source identity, and the available GitNexus impact route.
   Keep implementation in the main session unless this task itself gains a
   concrete independent delegation benefit.
2. Update workflow-state/platform-integration specs first, describing adaptive
   auto ownership and the unchanged authorization/context contracts.
3. Add focused regression cases exposing the current unconditional Codex auto
   breadcrumb and walkthrough. Cover auto/default/legacy alias/inline/invalid
   config/non-Codex behavior, and task planning-to-execution continuity.
4. Change template breadcrumbs and walkthrough sections, hook selection, and
   common phase selection together. Update explanatory config/parser comments
   and any generated Codex instructions that still require unconditional dispatch.
   Keep DEFAULT_CODEX_DISPATCH_MODE equal to auto.
5. Synchronize corresponding dogfood files. Run generated-project init/update
   checks and existing native context/model-pin regressions.
6. From packages/cli run focused Vitest files (`test/regression.test.ts`,
   `test/templates/trellis.test.ts`, plus affected configurator/update tests),
   `pnpm lint`, `pnpm typecheck`, and relevant Python checks per the spec.
   Finish with `git diff --check` and scope review. Fix real failures; do not
   turn prompt-output assertions into claims of live model behavior.
7. Record actual source/validation status, known limits, and exact changed paths.
   Present the scoped commit decision under Infra main's provenance policy.
   Deployment to existing projects and publication retain separate authorization.

## Expected owned paths

- packages/cli/src/templates/trellis/workflow.md and config.yaml
- packages/cli/src/templates/shared-hooks/inject-workflow-state.py
- packages/cli/src/templates/trellis/scripts/common/workflow_phase.py
- packages/cli/src/templates/trellis/scripts/common/config.py (semantics/docs only)
- Matching .trellis/.codex/.claude dogfood copies when changed
- Relevant Codex template/generated-instruction paths only if they repeat the bug
- Focused CLI regression/template/configurator tests
- .trellis/spec/cli/backend/workflow-state-contract.md and platform-integration.md
- This task directory

Do not claim unrelated source files or another task's active work. Inspect each
current target before editing and refine this path list from the actual diff.
