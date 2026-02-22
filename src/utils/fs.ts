import fs from 'fs-extra';
import { confirm, isCancel } from '@clack/prompts';
import path from 'path';
import pc from 'picocolors';

/**
 * Copies template files from source to destination root.
 * Intelligently checks for existing files to prevent blind overwrites.
 *
 * @param sourceDir Directory containing templates
 * @param targetDir Destination directory (typically process.cwd())
 * @param envName Environment namespace
 */
export async function copyTemplateFiles(sourceDir: string, targetDir: string, envName: string): Promise<boolean> {
    try {
        const exists = await fs.pathExists(sourceDir);
        const itemsToCopy = exists ? await fs.readdir(sourceDir) : [];

        if (itemsToCopy.length === 0) {
            console.log(pc.yellow(`Nenhum template encontrado para ${envName} em ${sourceDir}`));
            return true;
        }

        let shouldCopy = true;
        for (const item of itemsToCopy) {
            const targetPath = path.join(targetDir, item);
            if (await fs.pathExists(targetPath)) {
                const result = await confirm({
                    message: pc.cyan(`Atenção: O caminho ${item} já existe. Deseja sobrescrever (merge/override)?`),
                    initialValue: false,
                });

                if (isCancel(result)) {
                    console.log(pc.gray(`Operação cancelada para ${envName}.`));
                    return false;
                }

                shouldCopy = result as boolean;
                break;
            }
        }

        if (!shouldCopy) {
            console.log(pc.gray(`Ignorando a cópia para ${envName}...`));
            return true;
        }

        await fs.copy(sourceDir, targetDir, { overwrite: true });
        return true;
    } catch (error) {
        console.error(pc.red(`Falha ao copiar templates para ${envName}:`), error);
        return false;
    }
}
