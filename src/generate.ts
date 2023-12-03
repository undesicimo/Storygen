import fs from 'fs';
import { Get } from './get.js';

type ComponentElements = {
	componentName: string;
	componentPath: string;
	args?: {
		[key: string]: any;
	};
};

export class Generate {
	static storybookTemplate({
		componentName,
		componentPath,
		args,
	}: ComponentElements) {
		return `
		import { StoryObj, Meta } from '@storybook/react';

		import ${componentName} from '${componentPath}';

		export default {
			title: '${componentPath}',
			component: ${componentName},
			args:{
				${args}
			}
		} as Meta<typeof ${componentName}>;

		type Story = StoryObj<typeof ${componentName}>;

		export const Default: Story = {
			args: {
			},
		};
		`;
	}

	static story({
		contents,
		storyFileDescriptor: fileDescriptor,
	}: {
		contents: string;
		storyFileDescriptor: string;
	}) {
		fs.writeFile(fileDescriptor, contents, 'utf8', err => {
			if (err) {
				console.error(err, 'Error generating storybook file');
				throw err;
			}
			console.log('Storybook file generated!');
		});
	}

	static storyFileDescriptorFromPath(path: string) {
		return `${Get.filePathWithoutFileName(path)}/${
			Get.fileNameWithoutExtension(path) + '.stories.tsx'
		}`;
	}
}
