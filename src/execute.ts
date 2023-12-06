import { Generate } from './generate.js';
import { Get } from './get.js';
import { Log } from './log.js';
import { Parse } from './parse.js';
import chalk from 'chalk';

export class Execute {
	static onFile(filePath: string) {
		const [componentDocumentation] = Get.componentSignatures(
			Parse.reactComponent(filePath),
			Get.fileName(filePath)
		);

		const storyFileDescriptor = Generate.storyFileDescriptorFromPath(filePath);
		const contents = Generate.storybookTemplate({
			componentName:
				componentDocumentation.displayName ??
				Get.fileNameWithoutExtension(filePath),
			componentPath: `./${Get.fileNameWithoutExtension(filePath)}`,
			args: Generate.storyPropArgs(componentDocumentation.props),
		});
		Generate.story({
			storyFileDescriptor,
			contents,
		});

		Log.success(storyFileDescriptor);
	}

	static onDirectory(dirPath: string) {
		Get.allFilePathsFromDirPath(dirPath).forEach(path => {
			Execute.onFile(path);
		});
	}
}
