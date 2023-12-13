#!/usr/bin/env node

import { Command } from 'commander';
import { Execute } from './src/execute.js';

const program = new Command();
program
	.name('storybook-gen')
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
		Execute.program(path, options);
	});

program.parse();
