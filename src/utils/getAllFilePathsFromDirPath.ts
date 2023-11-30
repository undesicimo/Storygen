import fs from 'fs';
import path from 'path';

export default function getAllFilePathsFromDirPath(dirPath: string): string[] {
	const dir = fs.readdirSync(dirPath);
	const filePaths = [];
	for (const file of dir) {
		const filePath = path.join(dirPath, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			filePaths.push(...getAllFilePathsFromDirPath(filePath));
		} else {
			filePaths.push(filePath);
		}
	}
	return filePaths;
}
