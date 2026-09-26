/**
 * Runtime behavior of shared hook scripts that static template checks miss:
 *
 * - #590: hosts that write the payload but keep stdin open must not hang
 *   session-start / subagent-context / shell-session hooks until EOF, and
 *   the payload they did write must still be parsed.
 * - #634: the research dispatch prompt must permit writes to the active
 *   task's research/ directory, matching the trellis-research agent.
 */

import { describe, expect, it } from "vitest";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SHARED_HOOKS = path.resolve(
  __dirname,
  "../../src/templates/shared-hooks",
);

function hasPython(): boolean {
  try {
    execFileSync("python3", ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function runWithOpenStdin(
  script: string,
  cwd: string,
  payload: string,
): Promise<{ elapsedMs: number; code: number | null }> {
  return new Promise((resolve) => {
    const started = Date.now();
    const child = spawn("python3", [path.join(SHARED_HOOKS, script)], {
      cwd,
      stdio: ["pipe", "ignore", "ignore"],
    });
    child.stdin.write(payload);
    // Deliberately never end stdin: the host keeps the pipe open.
    const killer = setTimeout(() => child.kill("SIGKILL"), 10_000);
    child.on("exit", (code) => {
      clearTimeout(killer);
      resolve({ elapsedMs: Date.now() - started, code });
    });
  });
}

describe.skipIf(!hasPython())("shared hooks runtime", () => {
  it.each([
    "session-start.py",
    "inject-subagent-context.py",
    "inject-shell-session-context.py",
  ])("%s exits while the host keeps stdin open (#590)", async (script) => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "trellis-hook-stdin-"));
    try {
      fs.mkdirSync(path.join(tmp, ".trellis"), { recursive: true });
      const result = await runWithOpenStdin(
        script,
        tmp,
        JSON.stringify({ cwd: tmp, session_id: "t" }),
      );
      expect(result.elapsedMs).toBeLessThan(8_000);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }, 15_000);

  it.each([
    "session-start.py",
    "inject-subagent-context.py",
    "inject-shell-session-context.py",
    "inject-workflow-state.py",
  ])(
    "%s keeps a payload written in chunks to a stdin left open (#590)",
    async (script) => {
      const code = `
import importlib.util, json, sys
spec = importlib.util.spec_from_file_location("hook", sys.argv[1])
hook = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hook)
print(json.dumps(hook._load_hook_input()))
`;
      const payload = JSON.stringify({ cwd: "/x", prompt: "p".repeat(200_000) });
      const stdout = await new Promise<string>((resolve) => {
        const child = spawn(
          "python3",
          ["-c", code, path.join(SHARED_HOOKS, script)],
          { stdio: ["pipe", "pipe", "ignore"] },
        );
        let out = "";
        child.stdout.on("data", (d: Buffer) => (out += d.toString()));
        const half = Math.floor(payload.length / 2);
        child.stdin.write(payload.slice(0, half));
        // Second half after a pause shorter than the idle timeout; the pipe
        // is never closed, as with hosts that do not send EOF.
        setTimeout(() => child.stdin.write(payload.slice(half)), 100);
        const killer = setTimeout(() => child.kill("SIGKILL"), 10_000);
        child.on("exit", () => {
          clearTimeout(killer);
          resolve(out);
        });
      });
      const parsed = JSON.parse(stdout) as { cwd?: string; prompt?: string };
      expect(parsed.cwd).toBe("/x");
      expect(parsed.prompt?.length).toBe(200_000);
    },
    15_000,
  );

  it("research prompt allows writes only under the task research dir (#634)", () => {
    const code = `
import importlib.util, json, sys
spec = importlib.util.spec_from_file_location("hook", sys.argv[1])
hook = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hook)
print(json.dumps({
    "with_task": hook.build_research_prompt("q", "ctx", ".trellis/tasks/09-25-demo"),
    "without_task": hook.build_research_prompt("q", "ctx"),
}))
`;
    const r = spawnSync(
      "python3",
      ["-c", code, path.join(SHARED_HOOKS, "inject-subagent-context.py")],
      { encoding: "utf-8" },
    );
    expect(r.status, r.stderr).toBe(0);
    const out = JSON.parse(r.stdout) as {
      with_task: string;
      without_task: string;
    };
    expect(out.with_task).toContain(
      "files under `.trellis/tasks/09-25-demo/research/` only",
    );
    expect(out.with_task).toContain(
      "Modify any file outside `.trellis/tasks/09-25-demo/research/`",
    );
    expect(out.with_task).not.toMatch(/^- Modify any files$/m);
    expect(out.without_task).toMatch(/^- Modify any files$/m);
  });
});
