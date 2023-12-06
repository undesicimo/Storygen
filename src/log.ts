import chalk from 'chalk';
import { ExecuteErrorDescription } from './types.js';

export class Log {
	static success(storyFileDescriptor: string) {
		console.log(
			chalk.greenBright('▶ Storybook file generated! ') +
				`✨✨✨` +
				chalk.yellow(`\n▶ Access it here ➡️ `) +
				`${storyFileDescriptor}`
		);
	}
	static error(error: Error, filePath: string) {
		console.error(chalk.red(error) + ` in file ${filePath}`);
	}
	static executionResult(
		executeSuccessFiles: string[],
		executeErrorFiles: ExecuteErrorDescription[]
	) {
		if (executeSuccessFiles.length > 0) {
			console.log(
				chalk.greenBright(`✅ Success! `) +
					`Generated the following Storybooks🟪📚\n${executeSuccessFiles.join(
						'\n'
					)}`
			);
		}
		if (executeErrorFiles.length > 0) {
			console.log(
				chalk.redBright(`❌ Error! `) +
					`Failed to generate Storybook files for\n${executeErrorFiles
						.map(
							({ filePath, error }) =>
								`${filePath} with\n ▶ ${chalk.red(`${error}`)} `
						)
						.join('\n')}`
			);
		}
	}
}
