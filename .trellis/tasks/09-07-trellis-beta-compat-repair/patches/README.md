# 2026-09-14 exact release compatibility artifacts

Beta source is the original `codex/trellis-beta-compat-repair` worktree, HEAD
`631fe491277fb7e118d618f8f5fe5f05502fe0d6`, with uncommitted merge of
`v0.7.0-beta.4` (`be9e19b269c25cb2787489eb81062bf96619442c`). No commit/push occurred.
The beta local patch is recorded alongside this document.

Stable source is `v0.6.17` (`833a5846d18ad7a5ccd8c41c876d89cc936f5fd9`),
exported with `git archive` into disposable build staging. Apply
`stable-0.6.17-update-safety.patch` at the export root. It changes only init
baseline retention, dry-run manifest persistence and their tests.

Rebuild stable using the repository's pnpm 10.32.1 build scripts. Before
`pnpm --filter @mindfoldhq/trellis pack`, set the exported CLI package.json
`dependencies["@mindfoldhq/trellis-core"]` to the exact string `0.6.17`.
This is a packaging substitution for `workspace:*`, not a source API change.
Do not allow pnpm to resolve that dependency through another branch's borrowed
node_modules workspace link: it could silently package the wrong core version.
The stable runtime installation MUST report CLI=0.6.17 and core=0.6.17.

Both tarballs install via `npm install --prefix <host-prefix> <tarball>`.
Keep shared global npm untouched. Installation is not default-entry activation.
Original source task/evidence remains preserved; task and merge are still open.
