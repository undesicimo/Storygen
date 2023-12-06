import chalk from 'chalk';

export class Log {
	static success(storyFileDescriptor: string) {
		console.log(
			chalk.greenBright('▶ Storybook file generated! ') +
				`✨✨✨` +
				chalk.yellow(`\n▶ Access it here ➡️ `) +
				`${storyFileDescriptor}`
		);
	}
	error(error: Error, filePath: string) {
		console.error(chalk.red(error) + ` in file ${filePath}`);
	}
}
