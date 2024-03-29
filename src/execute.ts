import { Generate } from './generate.js';
import { Get } from './get.js';
import { Is } from './is.js';
import { Log } from './log.js';
import { Parse } from './parse.js';
import { ExecuteErrorDescription } from './types.js';

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

	static program(pathArgs: string, options: ExecutionOptions) {
		const executeSuccessFiles: string[] = [];
		const executeErrorFiles: ExecuteErrorDescription[] = [];

		if (Is.pathADirPath(pathArgs)) {
			Get.allFilePathsFromDirPath(pathArgs).forEach(path => {
				if (Is.storybookFile(path)) {
					return;
				}
				try {
					Execute.on(path, options);
					executeSuccessFiles.push(Generate.storyFileDescriptorFromPath(path));
				} catch (err) {
					executeErrorFiles.push({ filePath: path, error: err as Error });
				}
			});
		} else {
			try {
				if (Is.storybookFile(pathArgs)) {
					return;
				}
				Execute.on(pathArgs, options);
				executeSuccessFiles.push(
					Generate.storyFileDescriptorFromPath(pathArgs)
				);
			} catch (err) {
				executeErrorFiles.push({ filePath: pathArgs, error: err as Error });
			}
		}

		Log.executionResult(executeSuccessFiles, executeErrorFiles);
	}
}
