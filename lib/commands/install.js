import { join, resolve } from 'path';
import { detectEngines, ENGINES } from '../installer/detector.js';
import { checkExistingInstallation } from '../installer/validator.js';
import { runInstallPrompts } from '../installer/prompts.js';
import { Writer } from '../installer/writer.js';
import { buildManifest, saveManifest } from '../installer/manifest.js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(REPO_ROOT, 'package.json'), 'utf8'));
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

export default async function install(args) {
  const { default: chalk } = await import('chalk');
  const { default: ora } = await import('ora');

  const projectRoot = resolve(process.cwd());
  const version = getVersion();

  console.log(chalk.bold('\n  Reversa — Instalação\n'));

  // Check existing installation
  const existing = checkExistingInstallation(projectRoot);
  if (existing.installed) {
    console.log(chalk.yellow(`  Reversa já está instalado (v${existing.version}) neste projeto.\n`));
    const { default: inquirer } = await import('inquirer');
    const { proceed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'proceed',
      message: 'Deseja reinstalar / atualizar a configuração?',
      default: false,
    }]);
    if (!proceed) {
      console.log(chalk.gray('\n  Instalação cancelada.\n'));
      return;
    }
  }

  // Detect engines
  const detectedEngines = detectEngines(projectRoot);
  const detected = detectedEngines.filter(e => e.detected).map(e => e.name).join(', ');
  if (detected) {
    console.log(chalk.gray(`  Detectado: ${detected}\n`));
  }

  // Collect answers
  let answers;
  try {
    answers = await runInstallPrompts(detectedEngines);
  } catch (err) {
    if (err.isTtyError || err.message?.includes('cancel')) {
      console.log(chalk.gray('\n  Instalação cancelada.\n'));
      return;
    }
    throw err;
  }

  const selectedEngines = ENGINES.filter(e => answers.engines.includes(e.id));
  const writer = new Writer(projectRoot);

  const spinner = ora({ text: 'Instalando agentes...', color: 'cyan' }).start();

  try {
    // Install skills for each agent × each engine
    for (const agent of answers.agents) {
      for (const engine of selectedEngines) {
        await writer.installSkill(agent, engine.skillsDir);

        // Mirror to universal .agents/skills/ if engine uses a different skillsDir
        if (engine.universalSkillsDir && engine.universalSkillsDir !== engine.skillsDir) {
          await writer.installSkill(agent, engine.universalSkillsDir);
        }
      }
    }

    spinner.text = 'Configurando engines...';

    // Install entry file for each selected engine
    for (const engine of selectedEngines) {
      await writer.installEntryFile(engine);
    }

    spinner.text = 'Criando estrutura .reversa/...';

    // Create .reversa/ directory structure
    writer.createReversaDir(answers, version);

    // Handle .gitignore
    if (answers.git_strategy === 'gitignore') {
      writer.updateGitignore(answers.output_folder);
    }

    // Save created files list to state.json
    writer.saveCreatedFiles();

    spinner.text = 'Gerando manifesto...';

    // Build and save SHA-256 manifest for all created files
    const absolutePaths = writer.createdFiles.map(f => join(projectRoot, f));
    const manifest = buildManifest(absolutePaths);
    saveManifest(projectRoot, manifest);

    spinner.succeed(chalk.green('Instalação concluída!'));
  } catch (err) {
    spinner.fail(chalk.red('Erro durante a instalação.'));
    throw err;
  }

  // Summary
  const engineNames = selectedEngines.map(e => e.name).join(', ');
  const agentCount = answers.agents.length;

  console.log('');
  console.log(chalk.bold('  Resumo:'));
  console.log(`  ${chalk.cyan('Projeto:')}   ${answers.project_name}`);
  console.log(`  ${chalk.cyan('Engines:')}   ${engineNames}`);
  console.log(`  ${chalk.cyan('Agentes:')}   ${agentCount} instalados`);
  console.log(`  ${chalk.cyan('Versão:')}    ${version}`);
  console.log('');

  // Next step hint
  const primaryEngine = selectedEngines[0];
  if (primaryEngine?.id === 'claude-code') {
    console.log(chalk.gray('  → Abra o Claude Code e digite: /reversa'));
  } else if (primaryEngine?.id === 'codex') {
    console.log(chalk.gray('  → Use o Codex e escreva: reversa'));
  } else if (primaryEngine) {
    console.log(chalk.gray(`  → Abra o ${primaryEngine.name} e inicie com: reversa`));
  }

  console.log('');
}
