import fs from 'fs';

export class Is {
	static pathADirPath(path: string) {
		return fs.statSync(path).isDirectory();
	}
}
