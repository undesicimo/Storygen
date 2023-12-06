import { Execute } from './execute.js';
import { Is } from './is.js';

const [pathArgs] = process.argv.slice(2);

if (Is.pathADirPath(pathArgs)) {
	Execute.onDirectory(pathArgs);
} else {
	Execute.onFile(pathArgs);
}
