import fs from 'fs';
import { PropDescriptor } from 'react-docgen/dist/Documentation.js';

export class Is {
	static pathADirPath(path: string) {
		return fs.statSync(path).isDirectory();
	}

	static propRequired(prop: PropDescriptor){
		return prop.required;
	}
}
