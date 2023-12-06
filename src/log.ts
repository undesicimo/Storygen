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
}
