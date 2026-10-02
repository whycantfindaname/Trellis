# 本 fork 的现状与管理方案

> 本文件只存在于 `local/beta` 分支,是本 fork 自己的说明,不属于上游。
> 文件为新增文件,不会与上游改动产生合并冲突。

## 1. 仓库现状

本仓库是上游 Trellis(`mindfold-ai/Trellis`,见 `packages/cli/package.json` 的 `repository` 字段)的 fork,submodule `mindfold-ai/docs`、`mindfold-ai/marketplace` 同属该组织。
fork 时带入了上游的全部开发分支,已清理,现在远程只保留 3 个分支:

| 分支 | 作用 | 规则 |
|---|---|---|
| `main` | 上游 main 的镜像(0.6 线,最近为 PR #629 合并) | 只快进,不放自己的提交 |
| `feat/v0.7-beta` | 上游 beta 线的镜像(当前即 tag `v0.7.0-beta.4`,`be9e19b`) | 只快进,不放自己的提交 |
| `local/beta` | **日常使用分支**:beta 线 + 本地补丁 | 保持最新,上游更新时合并进来 |

`local/beta` 同时是 GitHub 默认分支。旧分支名 `jason/beta4-local-fixes` 已删除。

tag 全部保留(约 149 个,含 `v0.6.*`、`v0.7.0-beta.0` 到 `beta.4`),不影响分支列表。

## 2. 本地补丁

位于 beta.4 合并(`84c82d3`)之后,共 7 个提交:

| 提交 | 内容 |
|---|---|
| `c4d676b` | 归档提交时跳过已移走的路径(与上游 PR #629 的 `36292d6` 等价) |
| `47d14b1` | 把带保护的 stdin 读取移植到其余 3 个 hook |
| `53b6f4e` | 给改动涉及的函数补 docstring |
| `6034627` | 让 research 派发可以写入任务的 research 目录(#634) |
| `ccc8de8` | 限定归档提交范围,修复 list 过滤、subtask 解除关联,并忽略 `hooks.local.json` |
| `3b26d17` | hook 按到达顺序解析 stdin,不再等 EOF |
| `acbbe09` | 在 multi-agent v2 下让 codex 的 research agent 保持叶子节点 |

此外有一个合并提交 `7a723f1`,把 main 合入 `local/beta`。main 的内容此前已全部包含,合并没有产生净改动。

当前状态:`local/beta` 相对 `main` 落后 0、领先 77;相对 `feat/v0.7-beta` 落后 0。

## 3. submodule 的处理

`docs-site`(`mindfold-ai/docs`)和 `marketplace`(`mindfold-ai/marketplace`)是 submodule,指针在 main 与 beta 线上各自独立升级,合并时必然冲突。

约定:**保留 beta 线的指针**(当前为 `docs-site` = `ec975c3`,`marketplace` = `62a77c9`)。main 的指针对应 0.6 线,采用它会回退 beta.4 的文档和 marketplace 内容。

解决命令:

```
git update-index --cacheinfo 160000,<beta线的sha>,docs-site
git update-index --cacheinfo 160000,<beta线的sha>,marketplace
```

## 4. 日常同步流程

一次性准备(在本地):

```
git remote add upstream https://github.com/mindfold-ai/Trellis
```

每次上游有更新:

```
git fetch upstream
# 1) 镜像分支只快进
git push origin upstream/main:main upstream/feat/v0.7-beta:feat/v0.7-beta
# 2) 合进日常分支
git switch local/beta
git fetch origin
git merge origin/feat/v0.7-beta      # 需要时再 merge origin/main
git push origin local/beta
```

- 第 1 步不会产生冲突;冲突只会出现在第 2 步,并且只涉及补丁所在的文件和上面的 submodule 指针。
- 使用 merge 而不是 rebase:补丁只有 7 个,但 beta 线更新频繁,merge 不改历史、不需要强制推送。
- 不要把补丁合进 `main` 或 `feat/v0.7-beta`,否则镜像分支无法快进,GitHub 的 Sync fork 按钮也会失效。

## 5. 给上游提 PR

`local/beta` 带着整条 beta 线,不能直接作为 PR 来源。需要提补丁时:

```
git switch -c pr/<名称> upstream/main      # 或 upstream/feat/v0.7-beta
git cherry-pick <补丁提交>
```

上游合并后,下次同步时这些补丁会在 `local/beta` 里变成重复内容,通常不再冲突。可以在第 2 节的表里把它标为"已进上游"。

## 6. 注意事项

- 不要再执行 `git push origin --all` 之类的操作,避免把无关分支再次推上来。
- 新增本地补丁时直接提交到 `local/beta`,并更新第 2 节的表格。
- 仓库默认分支可在 GitHub 设置中改为 `local/beta`,可选。
