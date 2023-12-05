import { Documentation, parse as get } from 'react-docgen';
import fs from 'fs';
import path from 'path';

const babelOptions = {
	plugins: ['babel-plugin-styled-components', '@emotion'],
};

export class Get {
	static componentSignatures(componentContents: Buffer, filename?: string) {
		return get(componentContents, {
			babelOptions,
			// NOTE: filename is required to parse typescript files properly
			// ref: https://github.com/reactjs/react-docgen/issues/760#issuecomment-1454832066
			filename,
		});
	}
	static props(componentContents: Buffer): Documentation['props'] {
		const components = get(componentContents, {
			babelOptions,
		});
		return components[0].props;
	}

	static componentName(componentContents: Buffer) {
		const [component] = get(componentContents, { babelOptions });

		return component.displayName;
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
	static fileName(filePath: string) {
		return path.basename(filePath);
	}

	static fileNameWithoutExtension(filePath: string) {
		const fileName = path.basename(filePath);
		return fileName.split('.')[0];
	}

	static filePathWithoutFileName(filePath: string) {
		return path.dirname(filePath);
	}
}
