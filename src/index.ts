import { Generate } from './generate.js';
import { Get } from './get.js';
import { Parse } from './parse.js';

const [pathArgs] = process.argv.slice(2);

function run() {
	const [componentDocumentation] = Get.componentSignatures(
		Parse.reactComponent(pathArgs),
		Get.fileName(pathArgs)
	);

	const storyFileDescriptor = Generate.storyFileDescriptorFromPath(pathArgs);
	const contents = Generate.storybookTemplate({
		componentName:
			componentDocumentation.displayName ??
			Get.fileNameWithoutExtension(pathArgs),
		componentPath: `./${Get.fileNameWithoutExtension(pathArgs)}`,
	});

	Generate.story({
		storyFileDescriptor,
		contents,
	});
}

run();
