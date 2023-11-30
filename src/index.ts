import { Get } from './get';
import { getProps } from './utils/get/getProps';
import { isPathADirPath } from './utils/is/isPathADirPath';

const [pathArgs] = process.argv.slice(2);

function run() {
	if (isPathADirPath(pathArgs)) {
		const filePaths = Get.allFilePathsFromDirPath(pathArgs);
		for (let i = 0; i < filePaths.length; i++) {
			getProps(filePaths[i]);
		}
	} else {
	}
}

// console.log(getProps(filePath));
