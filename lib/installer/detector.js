import { existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

export const ENGINES = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    star: true,
    entryFile: 'CLAUDE.md',
    entryTemplate: 'CLAUDE.md',
    skillsDir: '.claude/skills',
    universalSkillsDir: '.agents/skills',
  },
  {
    id: 'codex',
    name: 'Codex',
    star: true,
    entryFile: 'AGENTS.md',
    entryTemplate: 'AGENTS.md',
    skillsDir: '.agents/skills',
    universalSkillsDir: '.agents/skills',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    star: true,
    entryFile: '.cursorrules',
    entryTemplate: 'cursorrules',
    skillsDir: '.agents/skills',
    universalSkillsDir: '.agents/skills',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    star: false,
    entryFile: 'GEMINI.md',
    entryTemplate: 'GEMINI.md',
    skillsDir: '.agents/skills',
    universalSkillsDir: '.agents/skills',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    star: false,
    entryFile: '.windsurfrules',
    entryTemplate: 'windsurf',
    skillsDir: '.agents/skills',
    universalSkillsDir: '.agents/skills',
  },
];

function commandExists(cmd) {
  try {
    execSync(
      process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`,
      { stdio: 'pipe' }
    );
    return true;
  } catch {
    return false;
  }
}

export function detectEngines(projectRoot) {
  const detectors = {
    'claude-code': (r) => existsSync(join(r, '.claude')) || commandExists('claude'),
    'codex':       (r) => existsSync(join(r, 'AGENTS.md')) || commandExists('codex'),
    'cursor':      (r) => existsSync(join(r, '.cursor')) || existsSync(join(r, '.cursorrules')),
    'gemini-cli':  (r) => existsSync(join(r, 'GEMINI.md')) || commandExists('gemini'),
    'windsurf':    (r) => existsSync(join(r, '.windsurf')) || existsSync(join(r, '.windsurfrules')),
  };

  return ENGINES.map(engine => ({
    ...engine,
    detected: detectors[engine.id]?.(projectRoot) ?? false,
  }));
}
