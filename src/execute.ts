import { Generate } from './generate.js';
import { Get } from './get.js';
import { Parse } from './parse.js';

export type ExecutionOptions = {
	relativeTitle: boolean;
};

export class Execute {
	static on(filePath: string, options: ExecutionOptions) {
		const [componentDocumentation] = Get.componentSignatures(
			Parse.reactComponent(filePath),
			Get.fileName(filePath)
		);

		const storyFileDescriptor = Generate.storyFileDescriptorFromPath(filePath);
		const contents = Generate.storybookTemplate({
			componentTitle: options.relativeTitle
				? Get.relativePath(process.cwd(), filePath)
				: Get.fileNameWithoutExtension(filePath),
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
