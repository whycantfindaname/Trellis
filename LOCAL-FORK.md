# Personal Trellis development

This fork is `whycantfindaname/Trellis`. Its personal development branch is
`develop`: upstream beta and stable fixes, followed by personal patches.
Use `develop` as the GitHub default branch and the source for daily work.

## Branches and local checkout

| Branch in the personal fork | Purpose | Update rule |
| --- | --- | --- |
| `develop` | Personal development, including adaptive Codex auto workflows | Merge upstream changes and retain personal patches |
| `main` | Upstream stable mirror | Fast-forward only; no personal patches |
| `feat/v0.7-beta` | Upstream beta mirror | Fast-forward only; no personal patches |
| `local/beta` | Previous published development name | Historical checkpoint; use `develop` for new work |

The canonical Linux checkout remains
`Tools/Trellis/.claude/worktrees/beta4-local-fixes`. Its historical directory
name is independent of its current branch, `develop`. Other mirror and
compatibility worktrees retain their existing roles and local changes.
The earlier `jason/beta4-local-fixes` remote branch was already deleted.
The `local/beta` remote checkpoint is retained; branch deletion needs its own
authorization. Existing tags and commit identities are preserved.

On 2026-10-16, fetching upstream confirmed that both `main` (`f089cb32`) and
`feat/v0.7-beta` (`be9e19b2`, beta.4) are already ancestors of the personal
head `589efca1`. No additional merge commit is needed for those heads.
The earlier merge `7a723f1` integrated stable main into the personal beta line.

## Preserved personal fixes

| Commit | Fix |
| --- | --- |
| `c4d676b` | Skip moved archive paths; equivalent upstream fix: PR #629 / `36292d6` |
| `47d14b1` | Guard stdin reads in the other three hooks |
| `53b6f4e` | Document the changed hook functions |
| `6034627` | Allow research dispatches to write the task research directory (#634) |
| `ccc8de8` | Scope archive commits, fix list filtering and subtask unlinking, ignore `hooks.local.json` |
| `3b26d17` | Parse arriving hook stdin without waiting for EOF |
| `acbbe09` | Keep Codex research agents as leaf agents under multi-agent v2 |
| `2ab93b55`, `589efca1` | Choose Codex auto delegation by concrete benefit and align hooks, phase guidance, and trellis-meta |

Project journal/archive auto-commit remains disabled. Publication and native
adoption evidence live in
`.trellis/tasks/10-13-codex-delegation-benefit/publication-20261016.md`.

## Marketplace source inside this branch

`marketplace/` is a regular tracked directory on `develop`. Its snapshot comes
from `https://github.com/mindfold-ai/marketplace`, upstream commit `62a77c9`,
plus personal native workflow fix `f6eaa71` and TDD fix `514f4f7`.
Existing upstream files and notices are retained. The snapshot has no separate
LICENSE file; this document does not assign it a new license.
Both personal fixes travel with this Trellis branch; a separate marketplace
repository and access to unpublished submodule objects are unnecessary.

Native workflow content must remain identical to the bundled CLI workflow;
the existing template tests check that contract. Personal marketplace templates
can be selected through the existing source option:

```bash
trellis workflow --marketplace gh:whycantfindaname/Trellis/marketplace#develop --template tdd
```

The CLI's default external marketplace remains the upstream registry. Select
the personal source explicitly to use this branch's marketplace content.

Only `docs-site` remains a submodule, currently at beta pointer `ec975c3`.
When merging upstream, preserve the vendored marketplace directory and
reconcile incoming marketplace changes inside it. Read the upstream gitlink
and import its reviewed file changes; do not restore a marketplace gitlink or
overwrite the personal workflow fixes. Review docs-site pointers separately.

## Synchronizing upstream and publishing

Remote names are local configuration. In this checkout, `origin` and `upstream`
refer to `mindfold-ai/Trellis`; **`fork` refers to the personal repository**.
Verify `git remote -v` before writing. With authorized publication:

```bash
git -c fetch.recurseSubmodules=false fetch upstream main feat/v0.7-beta
git switch develop
git merge upstream/feat/v0.7-beta
git merge upstream/main
# Resolve template and docs-site conflicts, preserving personal behavior;
# run the project checks before publishing.
git push -u fork develop
```

Merge rather than rebase to preserve published history. Mirror branches may be
fast-forwarded separately after reviewing their incoming refs. Never publish
personal patches to the upstream repository or use a blanket push of all refs.
Prepare upstream PRs from an upstream branch with selected cherry-picks instead
of submitting the complete personal development branch.
