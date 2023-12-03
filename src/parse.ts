import * as fs from 'fs';
export class Parse {
	static reactComponent(filePath: string) {
		return fs.readFileSync(filePath, 'utf8');
	}
}
