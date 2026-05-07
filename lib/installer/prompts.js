import inquirer from 'inquirer';
import { applyOrangeTheme, ORANGE_PREFIX } from './orange-prompts.js';

applyOrangeTheme();

const REQUIRED_AGENTS = [
  { name: 'Reversa - orchestrates the full analysis', value: 'reversa', disabled: 'required' },
  { name: 'Scout - maps the project surface', value: 'reversa-scout', disabled: 'required' },
  { name: 'Archaeologist - analyzes modules deeply', value: 'reversa-archaeologist', disabled: 'required' },
  { name: 'Detective - extracts business meaning', value: 'reversa-detective', disabled: 'required' },
  { name: 'Architect - summarizes the architecture', value: 'reversa-architect', disabled: 'required' },
  { name: 'Writer - generates executable specs', value: 'reversa-writer', disabled: 'required' },
];

const OPTIONAL_AGENTS = [
  { name: 'Reviewer - validates generated specs', value: 'reversa-reviewer', checked: true },
  { name: 'Visor - documents UI from screenshots', value: 'reversa-visor', checked: true },
  { name: 'Data Master - analyzes databases', value: 'reversa-data-master', checked: true },
  { name: 'Design System - extracts UI tokens and themes', value: 'reversa-design-system', checked: true },
  { name: 'Agents Help - explains available agents', value: 'reversa-agents-help', checked: true },
  { name: 'Reconstructor - rebuilds from generated specs', value: 'reversa-reconstructor', checked: true },
];

const MIGRATION_TEAM = [
  { name: 'Migrate - orchestrates migration planning', value: 'reversa-migrate', checked: true },
  { name: 'Paradigm Advisor - detects paradigm gaps', value: 'reversa-paradigm-advisor', checked: true },
  { name: 'Curator - decides migrate, discard, or ask', value: 'reversa-curator', checked: true },
  { name: 'Strategist - proposes migration strategies', value: 'reversa-strategist', checked: true },
  { name: 'Designer - drafts the target design', value: 'reversa-designer', checked: true },
  { name: 'Inspector - defines parity checks', value: 'reversa-inspector', checked: true },
];

const TRANSLATORS = [
  { name: 'N8N Translator - converts workflows to specs', value: 'reversa-n8n', checked: true },
];

const PRICING_TEAM = [
  { name: 'Pricing Profile - configures pricing context', value: 'reversa-pricing-profile', checked: true },
  { name: 'Pricing Size - measures feature size', value: 'reversa-pricing-size', checked: true },
  { name: 'Pricing Estimate - generates price scenarios', value: 'reversa-pricing-estimate', checked: true },
];

const FORWARD_TEAM = [
  { name: 'Requirements - turns an idea into specs', value: 'reversa-requirements', checked: true },
  { name: 'Doubt - asks focused clarification questions', value: 'reversa-doubt', checked: true },
  { name: 'Plan - drafts the technical approach', value: 'reversa-plan', checked: true },
  { name: 'To-Do - breaks work into actions', value: 'reversa-to-do', checked: true },
  { name: 'Audit - cross-checks requirements, plan, actions', value: 'reversa-audit', checked: true },
  { name: 'Quality - reviews requirement clarity', value: 'reversa-quality', checked: true },
  { name: 'Coding - executes the implementation plan', value: 'reversa-coding', checked: true },
  { name: 'Principles - records project principles', value: 'reversa-principles', checked: true },
  { name: 'Resume - resumes a paused feature', value: 'reversa-resume', checked: true },
];

export const MIGRATION_AGENT_IDS = MIGRATION_TEAM.map(a => a.value);
export const TRANSLATOR_AGENT_IDS = TRANSLATORS.map(a => a.value);
export const FORWARD_AGENT_IDS = FORWARD_TEAM.map(a => a.value);
export const PRICING_AGENT_IDS = PRICING_TEAM.map(a => a.value);

const P = { prefix: ORANGE_PREFIX };
const promptTitle = (number, message, hasOptions = false) =>
  `\n${number}. ${message}${hasOptions ? '\n\n' : ''}`;
const section = (title) => new inquirer.Separator(`-- ${title} --`);

export async function runInstallPrompts(detectedEngines) {
  const engineChoices = detectedEngines.map(e => ({
    name: `${e.name}${e.star ? ' (recommended)' : ''}`,
    value: e.id,
    checked: e.detected,
  }));

  const answers = await inquirer.prompt([
    {
      ...P,
      type: 'checkbox',
      name: 'engines',
      message: promptTitle(1, 'Engines to support', true),
      choices: engineChoices,
      loop: false,
      pageSize: 12,
      validate: (selected) => selected.length > 0 || 'Select at least one engine.',
    },
    {
      ...P,
      type: 'checkbox',
      name: 'optional_agents',
      message: promptTitle(2, 'Agents to install', true),
      choices: [
        section('Discovery Core (always installed)'),
        ...REQUIRED_AGENTS,
        section('Discovery Add-ons'),
        ...OPTIONAL_AGENTS,
        section('Code Forward Cycle'),
        ...FORWARD_TEAM,
        section('Migration Team'),
        ...MIGRATION_TEAM,
        section('Translators'),
        ...TRANSLATORS,
        section('Pricing'),
        ...PRICING_TEAM,
      ],
      loop: false,
      pageSize: 22,
    },
    {
      ...P,
      type: 'input',
      name: 'project_name',
      message: promptTitle(3, 'Project name:'),
      default: process.cwd().split(/[\\/]/).pop(),
      validate: (v) => v.trim().length > 0 || 'Name cannot be empty.',
    },
    {
      ...P,
      type: 'input',
      name: 'user_name',
      message: promptTitle(4, 'What should the agents call you?'),
      validate: (v) => v.trim().length > 0 || 'Name cannot be empty.',
    },
    {
      ...P,
      type: 'input',
      name: 'chat_language',
      message: promptTitle(5, 'Language for agent interactions:'),
      default: 'pt-br',
    },
    {
      ...P,
      type: 'input',
      name: 'doc_language',
      message: promptTitle(6, 'Language for generated documents and specs:'),
      default: 'Português',
    },
    {
      ...P,
      type: 'input',
      name: 'output_folder',
      message: promptTitle(7, 'Output folder for specs:'),
      default: '_reversa_sdd',
    },
    {
      ...P,
      type: 'list',
      name: 'git_strategy',
      message: promptTitle(8, 'How to handle artifacts in git?', true),
      loop: false,
      choices: [
        { name: 'Commit with the project (recommended for teams)', value: 'commit' },
        { name: 'Add to .gitignore (personal use)', value: 'gitignore' },
      ],
    },
    {
      ...P,
      type: 'list',
      name: 'answer_mode',
      message: promptTitle(9, 'How do you prefer to answer agent questions?', true),
      loop: false,
      choices: [
        { name: 'In the chat (faster)', value: 'chat' },
        { name: 'In the questions.md file (more organized)', value: 'file' },
      ],
    },
  ]);

  const requiredAgentValues = REQUIRED_AGENTS.map(a => a.value);
  return {
    ...answers,
    agents: [...requiredAgentValues, ...answers.optional_agents],
  };
}

export async function askMergeStrategy(filePath) {
  const { strategy } = await inquirer.prompt([
    {
      ...P,
      type: 'list',
      name: 'strategy',
      message: `\nThe file "${filePath}" already exists. What to do?\n\n`,
      loop: false,
      choices: [
        { name: 'Merge: add Reversa content at the end', value: 'merge' },
        { name: 'Skip: keep the file as is', value: 'skip' },
      ],
    },
  ]);
  return strategy;
}
