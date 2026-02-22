#!/usr/bin/env node
import { intro, outro, select, text, confirm, isCancel, cancel, spinner } from '@clack/prompts';
import pc from 'picocolors';
import { Command } from 'commander';
import path from 'path';
import { copyTemplateFiles } from './utils/fs';

const program = new Command();

// ASCII Art customizada
const LOGO = String.raw`
  ____ __     __ ____        ____ __  __ 
 | __ )\ \   / /| __ )      |  _ \\ \/ / 
 |  _ \ \ \ / / |  _ \ _____| | | |\  /  
 | |_) | \ V /  | |_) |_____| |_| |/  \  
 |____/   \_/   |____/      |____//_/\_\ 
`;

program
    .name('bvb-dx')
    .description('BVB-DX CLI - Padronização de contexto de IA e projetos')
    .version('1.0.0')
    // Configurando parâmetros que podem ser passados direto no terminal
    .option('-e, --env <type>', 'Ambiente alvo: cursor, antigravity ou all')
    .option('-p, --path <dir>', 'Diretório de destino', '.')
    .option('-y, --yes', 'Pula os prompts e aceita as configurações (requer --env)');

program.action(async (options) => {
    console.clear();

    // Imprimindo a "Imagem" (ASCII Art)
    console.log(pc.blue(pc.bold(LOGO)));
    console.log(pc.gray('             Configurando a Experiência de Desenvolvedor\n'));

    // Se o usuário passou --yes, precisamos ter certeza de que passou o ambiente
    if (options.yes && !options.env) {
        console.error(pc.red('Erro: Ao usar --yes, você deve providenciar o ambiente via --env <type>'));
        process.exit(1);
    }

    intro(pc.bgBlue(pc.white(' Initializing BVB-DX Workspace... ')));

    // === 1. Resolução do Ambiente ===
    let envType = options.env;

    if (!envType) {
        // Escolha visual elegante caso não passe por parâmetro
        const result = await select({
            message: pc.blue('Qual contexto base você deseja aplicar neste projeto?'),
            options: [
                { value: 'all', label: '✦ Configuração Completa', hint: 'Recomendado (Cursor, Antigravity)' },
                { value: 'cursor', label: '↳ Cursor Rules', hint: 'Apenas .cursorrules' },
                { value: 'antigravity', label: '↳ Antigravity Skills', hint: 'Apenas pasta .rules' },
            ],
        });

        if (isCancel(result)) {
            cancel('Processo cancelado.');
            process.exit(0);
        }
        envType = result;
    }

    // === 2. Exemplo de pergunta adicional (Texto) ===
    let projectName = 'meu-projeto';
    if (!options.yes) {
        const nameResult = await text({
            message: pc.gray('Como devemos chamar esse projeto nas documentações locais?'),
            placeholder: 'bvb-hero-project',
            defaultValue: 'bvb-hero-project',
        });

        if (isCancel(nameResult)) {
            cancel('Operação abortada.');
            process.exit(0);
        }
        projectName = nameResult as string;
    }

    // === 3. Outro tipo de escolha "estilo Angular" ===
    let includePrettier = false;
    if (!options.yes) {
        const prettierResult = await confirm({
            message: pc.gray('Deseja que eu injete regras de formatação estritas (Prettier)?'),
            initialValue: true,
        });

        if (isCancel(prettierResult)) {
            cancel('Operação abortada.');
            process.exit(0);
        }
        includePrettier = prettierResult as boolean;
    }

    // === Executando a lógica com Spinner Animado ===
    const s = spinner();
    s.start(pc.gray(`Gerando arquivos para o [${pc.blue(projectName)}]...`));

    // Resolvendo diretórios
    const cwd = path.resolve(process.cwd(), options.path);
    const templatesDir = path.resolve(__dirname, '../templates');

    try {
        const environments = envType === 'all' ? ['cursor', 'antigravity'] : [envType as string];

        // Simulação artificial de tempo de delay pra dar mais sensação de processamento complexo
        await new Promise((resolve) => setTimeout(resolve, 800));

        s.message(pc.blue('Validando diretórios e aplicando regras...'));

        for (const env of environments) {
            const sourceDir = path.join(templatesDir, env);

            const success = await copyTemplateFiles(sourceDir, cwd, env);
            if (!success) {
                s.stop(pc.red(`Erro ao configurar ${env}.`));
                process.exit(1);
            }
        }

        s.stop(pc.green('✦ Arquivos gerados com sucesso.'));

        // Mensagem final Customizada
        const nextSteps = [
            `cd ${options.path === '.' ? projectName : options.path}`,
            `npm install`,
            includePrettier ? `npm run format` : '',
        ].filter(Boolean);

        outro(
            pc.bold(pc.blue('Configuração concluída com sucesso!')) + '\n\n' +
            pc.gray('Próximos passos sugeridos:\n') +
            nextSteps.map(step => pc.cyan(`  ${step}`)).join('\n')
        );

    } catch (error) {
        s.stop(pc.red('Erro durante a configuração.'));
        console.error(pc.red(error instanceof Error ? error.message : String(error)));
        process.exit(1);
    }
});

program.parse(process.argv);
