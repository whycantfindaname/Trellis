"""Exercise one current checkout's real hook and phase readers without writes."""
import inspect
import json
from pathlib import Path
import runpy
import sys

sys.dont_write_bytecode = True
root = Path(sys.argv[1])
hook = runpy.run_path(str(root / '.codex/hooks/inject-workflow-state.py'), run_name='scoped_consumer_probe')
resolve = hook['resolve_breadcrumb_key']
direct_mode = list(inspect.signature(resolve).parameters)[-1] == 'codex_dispatch_mode'
for mode in ('auto', 'sub-agent', 'inline'):
    mode_arg = mode if direct_mode else {'codex': {'dispatch_mode': mode}}
    for status in ('planning', 'in_progress'):
        expected = status + ('-inline' if mode == 'inline' else '-auto')
        if resolve(status, 'codex', mode_arg) != expected:
            raise RuntimeError(f'{root}: {mode} does not select {expected}')
        if resolve(status, 'claude-code', mode_arg) != status:
            raise RuntimeError(f'{root}: non-Codex route changed')
payload = {'cwd': str(root), 'session_id': 'delegation-repair-readonly', 'platform': 'codex'}
loader = hook['load_breadcrumbs']
templates = loader(root, payload) if len(inspect.signature(loader).parameters) == 2 else loader(root)
for tag in ('planning-auto', 'in_progress-auto'):
    if tag not in templates:
        raise RuntimeError(f'{root}: selected workflow lacks {tag}')
if 'main session' not in templates['in_progress-auto']:
    raise RuntimeError(f'{root}: adaptive execution breadcrumb missing')

sys.path.insert(0, str(root / '.trellis/scripts'))
from common import workflow_phase
from common.trellis_config import read_trellis_config

config = read_trellis_config(root)
effective = workflow_phase.resolve_effective_platform('codex', config)
steps = {step: workflow_phase.filter_platform(workflow_phase.get_step(step), effective)
         for step in ('1.2', '2.1', '2.2')}
for step, text in steps.items():
    if len([line for line in text.splitlines() if line.strip()]) < 3:
        raise RuntimeError(f'{root}: step {step} has no actionable body')
references = []
for layer in ('.agents/skills', '.claude/skills', '.codex/skills', '.qoder/skills'):
    path = root / layer / 'trellis-meta/references/local-architecture/workflow.md'
    if not path.is_file():
        continue
    text = path.read_text()
    if 'Platforms with sub-agent support: dispatch' in text:
        raise RuntimeError(f'{path}: obsolete mandatory dispatch rule')
    if 'chooses ownership by actual benefit' not in text:
        raise RuntimeError(f'{path}: adaptive ownership rule missing')
    references.append(str(path))
print(json.dumps({'path': str(root), 'status': 'passed', 'effective_platform': effective,
                  'workflow': str(workflow_phase._workflow_md_path()), 'steps': steps,
                  'auto_breadcrumb': templates['in_progress-auto'],
                  'references': references}, ensure_ascii=False))
