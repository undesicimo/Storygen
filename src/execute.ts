import { Generate } from './generate.js';
import { Get } from './get.js';
import { Is } from './is.js';
import { Log } from './log.js';
import { Parse } from './parse.js';

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
	}
}
