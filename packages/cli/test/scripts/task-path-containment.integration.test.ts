import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const scripts = path.resolve(__dirname, "../../src/templates/trellis/scripts");

describe("task CLI path containment", () => {
  let temporary: string;
  let repo: string;
  let victim: string;

  function run(args: string[]) {
    return spawnSync("python3", [".trellis/scripts/task.py", ...args], {
      cwd: repo,
      encoding: "utf-8",
      env: {
        ...process.env,
        TRELLIS_CONTEXT_ID: "compat-path-session",
        PYTHONDONTWRITEBYTECODE: "1",
      },
    });
  }

  beforeEach(() => {
    temporary = fs.mkdtempSync(path.join(os.tmpdir(), "trellis-task-path-"));
    repo = path.join(temporary, "repo");
    victim = path.join(temporary, "victim");
    fs.mkdirSync(path.join(repo, ".trellis", "tasks", "inside"), { recursive: true });
    fs.cpSync(scripts, path.join(repo, ".trellis", "scripts"), { recursive: true });
    fs.writeFileSync(path.join(repo, ".trellis", ".developer"), "name=test\n");
    fs.writeFileSync(path.join(repo, ".trellis", "config.yaml"), "session_auto_commit: false\n");
    fs.writeFileSync(path.join(repo, "README.md"), "Repository context\n");
    fs.writeFileSync(
      path.join(repo, ".trellis", "tasks", "inside", "task.json"),
      JSON.stringify({ id: "inside", title: "Inside", status: "planning" }),
    );
    fs.mkdirSync(victim);
    fs.writeFileSync(path.join(victim, "task.json"), '{"status":"outside","children":[]}\n');
  });

  afterEach(() => {
    fs.rmSync(temporary, { recursive: true, force: true });
  });

  it.each(["absolute", "parent", "nested-parent", "task-root"] as const)("rejects %s paths before command writers can touch them", (kind) => {
    const before = fs.readFileSync(path.join(victim, "task.json"), "utf-8");
    const ref = { absolute: victim, parent: "../victim", "nested-parent": ".trellis/tasks/../../../victim", "task-root": ".trellis/tasks" }[kind];
      const commands = [
        ["start", ref],
        ["set-branch", ref, "feature"],
        ["set-base-branch", ref, "main"],
        ["set-scope", ref, "test"],
        ["set-meta", ref, "key", "value"],
        ["add-context", ref, "check", "README.md", "scope"],
        ["validate", ref],
        ["list-context", ref],
        ["add-subtask", ref, "inside"],
        ["remove-subtask", "inside", ref],
        ["archive", ref, "--no-commit"],
      ];
      for (const args of commands) {
        const result = run(args);
        expect(result.status, args.join(" ")).toBe(1);
        expect(result.stderr).not.toContain("Traceback");
        expect(fs.readFileSync(path.join(victim, "task.json"), "utf-8")).toBe(before);
        expect(fs.readdirSync(victim)).toEqual(["task.json"]);
      }
  }, 30_000);

  it("does not use a repository directory as an unknown task name fallback", () => {
    fs.mkdirSync(path.join(repo, "source"));
    fs.writeFileSync(path.join(repo, "source", "task.json"), '{"status":"source"}\n');
    expect(run(["start", "source"]).status).toBe(1);
    expect(fs.readFileSync(path.join(repo, "source", "task.json"), "utf-8")).toBe('{"status":"source"}\n');
  });

  it.skipIf(process.platform === "win32")("rejects a child symlink escape and accepts a symlinked Trellis tree", () => {
    fs.symlinkSync(victim, path.join(repo, ".trellis", "tasks", "escaped"), "dir");
    expect(run(["start", ".trellis/tasks/escaped"]).status).toBe(1);

    const store = path.join(temporary, "trellis-store");
    fs.renameSync(path.join(repo, ".trellis"), store);
    fs.symlinkSync(store, path.join(repo, ".trellis"), "dir");
    for (const ref of ["inside", ".trellis\\tasks\\inside", path.join(store, "tasks", "inside")]) {
      const result = run(["start", ref]);
      expect(result.status, result.stderr).toBe(0);
      const session = JSON.parse(fs.readFileSync(
        path.join(store, ".runtime", "sessions", "compat-path-session.json"), "utf-8",
      )) as { current_task: string };
      expect(session.current_task).toBe(".trellis/tasks/inside");
    }
  });
});
