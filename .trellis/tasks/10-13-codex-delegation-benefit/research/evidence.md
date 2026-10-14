# Delegation evidence — 2026-10-13

## Primary external sources

1. https://code.claude.com/docs/en/sub-agents#choose-between-subagents-and-main-conversation
   Retrieved through `smart-search fetch`. The official guide favors the main
   conversation for iterative work and phases sharing substantial context.
   It also supports isolated, self-contained work and explicitly documents
   sequential subagent chains. Therefore parallelism is a benefit, not a
   universal necessary condition.
2. https://www.anthropic.com/engineering/multi-agent-research-system
   Published 2025-06-13; retrieved through `smart-search fetch`. Independent
   breadth-first research benefits from parallel workers, while shared-context
   and heavily dependent tasks are a poor fit. Its reported research benchmark
   is not evidence that every coding task should use multiple agents.

## User rules and observed session

The current Codex SUBAGENT_ROUTING.md permits solo work, independent parallel
work, useful context isolation, specialized capability, and fresh-context
review. Complexity alone is insufficient. The user now explicitly requests an
intelligent auto mode, not a globally forced inline mode.

Referenced chat: thread 01a133a6-3836-74c0-a070-f592ef58a60a on local.
The main agent delegated implementation while doing preflight and temporary
connection recovery, then spent later stages coordinating the child. The user
eventually requested inline continuation. This supports investigating workflow
pressure but does not prove there was no useful parallel work in that session.

## Source cause

The mode banner already allows ownership choice, but the auto breadcrumb and
phase selector feed mandatory implement/check dispatch instructions. The old
07-23-codex-inline-default-agent-model PRD explicitly retained auto as an
architectural dispatch default. Its historical title is stale; its body is the
actual recorded decision. This task changes auto semantics in the local fork.
