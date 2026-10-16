# 规范修复发布与原生采用

用户于 2026-10-16 明确要求提交并推送本次修复，以供另两台机器获取。沿用本任务，来源标记为 `linux+codex`。这次授权涵盖本次来源修复与现役受管项目的定向差异，保留其他用户／Agent 的修改与暂存内容。

## Trellis 来源

个人 fork 为 `whycantfindaname/Trellis`，日常来源分支为 `local/beta`，本机对应 remote 名为 `fork`。上游镜像 `main` / `feat/v0.7-beta` 不发布个人补丁；兼容工作树保持其原有用途。新机器从个人分支获取来源，不能用上游 `origin/main` 代替。

用户暂不授权创建 marketplace fork。子模块 native/TDD 来源提交 `f6eaa7163dbcf002a3b46c2f6cbd1bde5297b7e3`、`514f4f712b8ab46af45601b4d6319a5a2e3f4b7a` 与兼容 TDD 提交 `a8672d555afa7c3756658f0d1e8236ae3201ad86` 留在本地，未发布。本次保留来源中已有的 native 镜像修复 gitlink `f6eaa7163dbcf002a3b46c2f6cbd1bde5297b7e3`，不推进 TDD 指针，`.gitmodules` URL 保持不变。该 native 镜像是已有模板一致性测试的依赖，不能改回旧模板并宣称同一验证仍然有效。

因此，单靠 GitHub 递归检出目前无法完整取得该子模块；原生 owner 可以先关闭递归获取父仓库，再通过已经具备访问权限的 Linux SSH 来源获取 `marketplace` 的 `codex/tdd-adaptive-auto-20261016` 分支（包含该 native 祖先提交）。此步骤不创建 GitHub 仓库，也不证明子模块已在 GitHub 发布。没有该连接的机器保留完整子模块采用待办。

CLI 和项目 native 模板的 adaptive auto 修复可以独立发布。远端 marketplace 的 native/TDD 模板没有随之更新；显式从该远端选择这些模板的用户仍需等待其来源发布，不能宣称此项已经修复。

## 原生机器接续

1. 在对应机器读取当前 AGENTS/CLAUDE 拓扑、现役仓库与 worktree 清单和 dirty/staged 状态，排除退役仓库及恢复／缓存副本。此次已有应用授权继续有效，模型、服务、安装版本／渠道和自动任务保持其原 owner 的选择。
2. 在已有 Trellis 个人 fork remote 获取 `local/beta`。例如本机的 remote 名为 `fork` 时：`git -c fetch.recurseSubmodules=false fetch fork refs/heads/local/beta`。核对收到的提交及差异，按原生 source/adoption 流程接续，保留并发内容。此处暂不递归获取历史中未发布的子模块提交。
3. 定向采用现有 CLI 和项目 workflow、hook、phase reader、trellis-meta 参考文档的本任务差异；保留自定义 workflow 的批准、研究／归档边界和其他客户端策略。不要整仓覆盖或通过恢复旧快照清理 dirty 内容。
4. 对每个原生目标运行本目录 `verify-adoption.py <项目绝对路径>`。它读取该项目真实 hook 与阶段实现，验证 auto、旧别名、inline、非 Codex 路由和研究／实现／检查正文；不启动模型、不改变任务或项目文件。输出成功证明这套指引与路由可读取，不能证明未来每次模型委派判断都正确。
5. 在对应机器保存采用与消费者证据。Linux 来源发布、平台同名分支文件更新和另一台机器的成功都不替代本机验收。历史 Windows 19 个目标只是发现起点，macOS 需要当前本机清单。

## 已有验证与提交范围

本次修复的 593 项来源测试、lint、typecheck、28 个现役项目实际 hook/phase 检查及 CLI 新建项目检查已通过。发布前又对 28 个当前目标复验，全部通过。GitNexus 1.6.12 的实际 `detect-changes` 返回 low、0 个受影响流程；FTS 扩展缺失并不影响此次 diff 检查，未为它安装扩展或重建索引。

此次提交额外把 canonical 与兼容工作树各自项目配置的 `session_auto_commit` 设为 false；已调用真实配置读取器确认 false。此项落实已有 Commit provenance 规范，不修改公共模板的产品默认值。

除原 `repair-20261016-scope.json` 的路径外，canonical 来源提交还包括本文件、`verify-adoption.py`、`.trellis/config.yaml`、`LOCAL-FORK.md` 和上述发布 gitlink 的选择。主机级发布回执位于原 repair evidence root 的 `publication/`，其中逐项记录提交、发布分支、远端读回、保留的 foreign/staged 内容和未发布原因。新增配置 before 文件同样保留至 2026-11-16，仅可逆转本任务差异，保留后续 owner 修改。

原生应用、暂缓的 marketplace 发布与旧兼容／镜像工作树不因本次 source publication 自动转为完成。任务仍保留跨平台接续状态。
