import { Generate } from './generate.js';
import { Get } from './get.js';
import { Is } from './is.js';
import { Parse } from './parse.js';

const [pathArgs] = process.argv.slice(2);

function file(pathArgs: string) {
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
		args: Generate.storyPropArgs(componentDocumentation.props),
	});

	Generate.story({
		storyFileDescriptor,
		contents,
	});
}

function directory(pathArgs: string) {
	Get.allFilePathsFromDirPath(pathArgs).forEach(path => {
		file(path);
	});
}

if (Is.pathADirPath(pathArgs)) {
	directory(pathArgs);
} else {
	file(pathArgs);
}
