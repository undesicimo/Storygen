import { parse } from 'react-docgen-typescript';
import fs from 'fs';
import path from 'path';

export class Get {
	static props(path: string) {
		const [component] = parse(path, { savePropValueAsString: true });

		const propsKeys = Object.keys(component.props);
		const propsValues = Object.values(component.props);

		let description = [];
		for (const index in propsKeys) {
			const value = propsValues[index];
			if (value.required) {
				description.push(
					`${propsKeys[index]}: {{dummy data with type of ${value.type.name}}},`
				);
			}
		}

		return description.join('\n');
	}

	static allFilePathsFromDirPath(dirPath: string): string[] {
		const dir = fs.readdirSync(dirPath);
		const filePaths = [];
		for (const file of dir) {
			const filePath = path.join(dirPath, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				filePaths.push(...Get.allFilePathsFromDirPath(filePath));
			} else {
				filePaths.push(filePath);
			}
		}
		return filePaths;
	}

	static componentName() {}
}
