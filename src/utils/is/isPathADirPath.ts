import fs from 'fs';

export function isPathADirPath(path: string) {
	return fs.statSync(path).isDirectory();
}
