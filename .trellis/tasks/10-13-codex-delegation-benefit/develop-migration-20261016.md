# Personal develop branch and self-contained marketplace

## Authorized continuation

The user requested `develop` as the personal branch integrating upstream and
personal fixes, and asked to store marketplace changes in Trellis instead of
creating another repository. This continues the approved source publication
task; existing scoped commit and cross-device publication authorization applies.
No new remote repository, forced update, tag, or remote branch deletion is needed.

## Requirements and design

- Rename the canonical checkout's local `local/beta` branch to `develop`, retaining
  its path, commits, and other worktrees. Publish `develop` to the existing personal
  fork and select it as that fork's default branch. Keep the old remote checkpoint.
- Fetch current upstream stable and beta heads. Both `f089cb32` and `be9e19b2`
  are ancestors of `589efca1` (zero commits behind); preserve that integration.
- Replace only the marketplace gitlink with its 160 tracked snapshot files at
  `514f4f7`, including native ancestor fix `f6eaa71`. Preserve docs-site and the
  original child Git objects. Remove obsolete marketplace-submodule calls.
- Keep normal mirror tests, build, lint, typecheck, and full pre-commit checks.
  CI must watch the new development branch and files inside marketplace.
- Keep the current CLI installation and external-registry default. Document the
  existing explicit marketplace-source option for consuming this personal copy.

## Implementation and acceptance

1. Save actual parent/child status, refs, source bundles, and changed-file backups.
2. Update current fork guidance before changing marketplace handling; preserve
   historical receipts. Read relevant CLI test/release/workflow specs.
3. Convert the gitlink to regular files without replacing any source content;
   update hook/CI handling and scoped task pointers.
4. Run GitNexus impact before any function edit and detect-changes before commit.
   Run lint, typecheck, build, full pre-commit tests, and tracked-file integrity
   checks; verify a fresh export contains the personal workflows without a child
   Git repository.
5. Publish the exact accepted commit to `fork/develop`, change the GitHub default,
   verify remote identities and retrieve the personal marketplace via the existing
   registry interface. Report native activation separately.

The baseline contains only a dirty marketplace gitlink: child HEAD is `514f4f7`,
its files are clean, and the old parent pointer is `f6eaa71`. Cold backups and
actual command evidence are under
`WS/backup/hosts/oppo-remote-8A100/manual/20261016-trellis-develop/`, retained until
2026-11-16. Restore only reviewed task differences after checking current files;
bundles preserve old objects, and rollback must retain concurrent changes.

Current reference lookup found no Infra registry row selecting this checkout's
branch. The installed CLI resolves to its global npm installation; renaming the
source branch does not activate a different installed package. The old worktree
directory name is retained to preserve current references and tooling.

## Owned paths

`LOCAL-FORK.md`, `.gitmodules`, `.husky/pre-commit`, `.github/workflows/ci.yml`,
`marketplace/**`, affected release helper handling if necessary, and the current
task's metadata, publication guide, and this record; the CLI release-process
and repository-package-map specs reflect the new layout. No other checkout is written.

## Verification environment adjustment

The first full pre-commit run passed core 399/399 and CLI 2108 tests, with one
CLI platform integration timeout and three intentional skips overall. Running
the three platform tests alone reproduced the ten-second limit; the actual CLI
returned correct JSON and exit status zero in 9.248 seconds. A Node compile cache
did not reliably bring the tests below the limit. This is a startup-duration
budget issue on the shared filesystem, not an incorrect platform result.

The platform integration suite therefore gets a 30-second subprocess-test
budget. Its three cases, commands, exit-code assertions, and output assertions
remain intact; unit-test defaults remain ten seconds. This file is added to the
owned paths because the reproduced timeout blocks the required full pre-commit
check. GitNexus found no callers for its test helper (UNKNOWN rather than a
claimed low risk); source inspection confirms its three local test call sites.
