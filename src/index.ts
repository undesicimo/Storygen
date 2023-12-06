import { Execute } from './execute.js';
import { Get } from './get.js';
import { Is } from './is.js';
import { Log } from './log.js';

const [pathArgs] = process.argv.slice(2);

function run() {
	let executeSuccessFiles: string[] = [];
	let executeErrorFiles: string[] = [];

	if (Is.pathADirPath(pathArgs)) {
		Get.allFilePathsFromDirPath(pathArgs).forEach(path => {
			try {
				Execute.onFile(path);
				executeSuccessFiles.push(path);
			} catch (err) {
				executeErrorFiles.push(path);
			}
		});
	} else {
		try {
			Execute.onFile(pathArgs);
			executeSuccessFiles.push(pathArgs);
		} catch (err) {
			executeErrorFiles.push(pathArgs);
		}
	}

	Log.executionResult(executeSuccessFiles, executeErrorFiles);
}

run();
