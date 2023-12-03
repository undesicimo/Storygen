import { parse } from 'react-docgen';
import fs from 'fs';
import path from 'path';

export class Get {
	static componentSignatures(componentContents: Buffer) {
		return parse(componentContents, {});
	}
	static props(componentContents: Buffer) {
		const components = parse(componentContents);
		return components;
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

	static componentName(path: string) {
		const [component] = parse(path);

		return component.displayName;
	}
}
