import { Get } from './get';
import { Is } from './is';

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

console.log(Get.props(pathArgs));
