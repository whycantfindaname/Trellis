# 规范修复发布与原生采用

用户于 2026-10-16 明确要求提交并推送本次修复，以供另两台机器获取。沿用本任务，来源标记为 `linux+codex`。这次授权涵盖本次来源修复与现役受管项目的定向差异，保留其他用户／Agent 的修改与暂存内容。

## Trellis 来源

个人 fork 为 `whycantfindaname/Trellis`，日常来源分支已按用户接续要求改为 `develop`，本机对应 remote 名为 `fork`。上游镜像 `main` / `feat/v0.7-beta` 不发布个人补丁；兼容工作树保持其原有用途。新机器从个人分支获取来源，不能用上游 `origin/main` 代替。旧 `local/beta` 已退役，自动获取配置仅选择 `develop`；其全部历史已包含在 `develop`，无需依靠旧分支恢复。

用户随后明确选择把 marketplace 的个人修改直接保存在 Trellis 分支中。`develop` 将 `514f4f712b8ab46af45601b4d6319a5a2e3f4b7a` 的 160 个文件作为普通文件跟踪，其中包含 native 祖先修复 `f6eaa7163dbcf002a3b46c2f6cbd1bde5297b7e3` 和 TDD 修复。159 个文件的 Git blob 与子仓库快照完全一致；`specs/electron-fullstack/backend/text-input.md` 的一处双空格换行改为等效 Markdown 反斜杠换行，以通过 diff 空白检查；全部文件模式保留。`.gitmodules` 仅保留 docs-site。旧子仓库对象及兼容 TDD 提交仍保留在原位置和冷备份中，未新建远端仓库。

获取新的 `develop` 即可取得这些 marketplace 文件。现有机器从旧子模块布局迁移前应检查并备份自己的子模块修改，保留原 Git 对象，避免用旧快照覆盖本地内容。来源转换、上游祖先关系、备份与验收见 `develop-migration-20261016.md`。

官方 marketplace 的内容仍由上游维护。使用个人修复时，通过现有入口显式选择 `trellis workflow --marketplace gh:whycantfindaname/Trellis/marketplace#develop --template tdd`。来源发布与原生机器采用分别验收。

## 原生机器接续

1. 在对应机器读取当前 AGENTS/CLAUDE 拓扑、现役仓库与 worktree 清单和 dirty/staged 状态，排除退役仓库及恢复／缓存副本。此次已有应用授权继续有效，模型、服务、安装版本／渠道和自动任务保持其原 owner 的选择。
2. 在已有 Trellis 个人 fork remote 获取 `develop`。例如本机的 remote 名为 `fork` 时：`git -c fetch.recurseSubmodules=false fetch fork refs/heads/develop`。核对收到的提交及差异，按原生 source/adoption 流程接续，保留并发内容；新的 marketplace 文件随父仓库提供。
3. 定向采用现有 CLI 和项目 workflow、hook、phase reader、trellis-meta 参考文档的本任务差异；保留自定义 workflow 的批准、研究／归档边界和其他客户端策略。不要整仓覆盖或通过恢复旧快照清理 dirty 内容。
4. 对每个原生目标运行本目录 `verify-adoption.py <项目绝对路径>`。它读取该项目真实 hook 与阶段实现，验证 auto、旧别名、inline、非 Codex 路由和研究／实现／检查正文；不启动模型、不改变任务或项目文件。输出成功证明这套指引与路由可读取，不能证明未来每次模型委派判断都正确。
5. 在对应机器保存采用与消费者证据。Linux 来源发布、平台同名分支文件更新和另一台机器的成功都不替代本机验收。历史 Windows 19 个目标只是发现起点，macOS 需要当前本机清单。

## 已有验证与提交范围

本次修复的 593 项来源测试、lint、typecheck、28 个现役项目实际 hook/phase 检查及 CLI 新建项目检查已通过。发布前又对 28 个当前目标复验，全部通过。GitNexus 1.6.12 的实际 `detect-changes` 返回 low、0 个受影响流程；FTS 扩展缺失并不影响此次 diff 检查，未为它安装扩展或重建索引。

此次提交额外把 canonical 与兼容工作树各自项目配置的 `session_auto_commit` 设为 false；已调用真实配置读取器确认 false。此项落实已有 Commit provenance 规范，不修改公共模板的产品默认值。

除原 `repair-20261016-scope.json` 的路径外，canonical 来源提交还包括本文件、`verify-adoption.py`、`.trellis/config.yaml`、`LOCAL-FORK.md` 和上述发布 gitlink 的选择。主机级发布回执位于原 repair evidence root 的 `publication/`，其中逐项记录提交、发布分支、远端读回、保留的 foreign/staged 内容和未发布原因。新增配置 before 文件同样保留至 2026-11-16，仅可逆转本任务差异，保留后续 owner 修改。

此前 Linux 28 个目标与 Windows 16 个目标的规范采用结果保留其原生回执；本次来源分支迁移不代表安装版本切换。macOS 按用户决定保留待办。旧兼容／镜像工作树及无关 Infra 分支发布问题仍保持各自状态。
