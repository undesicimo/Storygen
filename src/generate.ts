import fs from 'fs';

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

	static story({ contents, filePath }: { contents: string; filePath: string }) {
		fs.writeFile(filePath, contents, 'utf8', err => {
			if (err) throw err;
			console.log('Storybook file generated!');
		});
	}
}
