#!/usr/bin/env node

import { Execute, ExecutionOptions } from './src/execute.js';
import { Generate } from './src/generate.js';
import { Get } from './src/get.js';
import { Is } from './src/is.js';
import { Log } from './src/log.js';
import { ExecuteErrorDescription } from './src/types.js';
import { Command } from 'commander';

function run(pathArgs: string, options: ExecutionOptions) {
	const executeSuccessFiles: string[] = [];
	const executeErrorFiles: ExecuteErrorDescription[] = [];

	if (Is.pathADirPath(pathArgs)) {
		Get.allFilePathsFromDirPath(pathArgs).forEach(path => {
			try {
				Execute.on(path, options);
				executeSuccessFiles.push(Generate.storyFileDescriptorFromPath(path));
			} catch (err) {
				executeErrorFiles.push({ filePath: path, error: err as Error });
			}
		});
	} else {
		try {
			Execute.on(pathArgs, options);
			executeSuccessFiles.push(Generate.storyFileDescriptorFromPath(pathArgs));
		} catch (err) {
			executeErrorFiles.push({ filePath: pathArgs, error: err as Error });
		}
	}

	Log.executionResult(executeSuccessFiles, executeErrorFiles);
}

const program = new Command();
program
	.name('StoryGen')
	.description(
		'A Program that makes a Storybook template from the given file (with props!).'
	)
	.argument(
		'<path/to/component>',
		'path of the file component or directory to generate the storybook file(s)'
	)
	.option(
		'-r, --relativeTitle',
		`generate storybook title to be relative to the current working directory. Good for organizing stories based on the directory structure`,
		false
	)
	.action((path, options) => {
		run(path, options);
	});

program.parse();
