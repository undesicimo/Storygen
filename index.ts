#!/usr/bin/env node

import { Execute } from './src/execute.js';
import { Generate } from './src/generate.js';
import { Get } from './src/get.js';
import { Is } from './src/is.js';
import { Log } from './src/log.js';
import { ExecuteErrorDescription } from './src/types.js';

const [pathArgs] = process.argv.slice(2);

function run() {
	const executeSuccessFiles: string[] = [];
	const executeErrorFiles: ExecuteErrorDescription[] = [];

	if (Is.pathADirPath(pathArgs)) {
		Get.allFilePathsFromDirPath(pathArgs).forEach(path => {
			try {
				Execute.onFile(path);
				executeSuccessFiles.push(Generate.storyFileDescriptorFromPath(path));
			} catch (err) {
				executeErrorFiles.push({ filePath: path, error: err as Error });
			}
		});
	} else {
		try {
			Execute.onFile(pathArgs);
			executeSuccessFiles.push(Generate.storyFileDescriptorFromPath(pathArgs));
		} catch (err) {
			executeErrorFiles.push({ filePath: pathArgs, error: err as Error });
		}
	}

	Log.executionResult(executeSuccessFiles, executeErrorFiles);
}

run();
