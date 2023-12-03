import { Get } from './get.js';
import { Is } from './is.js';
import { Parse } from './parse.js';

const [pathArgs] = process.argv.slice(2);

function run() {
	if (Is.pathADirPath(pathArgs)) {
		const filePaths = Get.allFilePathsFromDirPath(pathArgs);
		for (let i = 0; i < filePaths.length; i++) {
			Get.props(filePaths[i]);
		}
	} else {
	}
}

console.log(Get.props(Parse.reactComponent(pathArgs)));
