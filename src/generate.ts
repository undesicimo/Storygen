import fs from 'fs';
import { Get } from './get.js';
import { Documentation } from 'react-docgen';
import { Is } from './is.js';
import { faker } from '@faker-js/faker';
import path from 'path';

type ComponentElements = {
	componentName: string;
	componentPath: string;
	args?: string;
};

export class Generate {
	static storybookTemplate({
		componentName,
		componentPath,
		args,
	}: ComponentElements) {
		return `import {StoryObj, Meta} from '@storybook/react';

import ${componentName} from '${componentPath}';

export default {
  title: '${componentPath}',
  component: ${componentName},
  args: {
    ${args ?? '//TODO: Add args here'}
  },
} as Meta<typeof ${componentName}>;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {},
};
`;
	}

	static story({
		contents,
		storyFileDescriptor,
	}: {
		contents: string;
		storyFileDescriptor: string;
	}) {
		fs.writeFile(storyFileDescriptor, contents, 'utf8', err => {
			if (err) {
				console.error(err, 'Error generating storybook file');
				throw err;
			}
		});
	}

	static storyFileDescriptorFromPath(path: string) {
		return `${Get.filePathWithoutFileName(path)}/${
			Get.fileNameWithoutExtension(path) + '.stories.tsx'
		}`;
	}

	static storyPropArgs(componentProps: Documentation['props']) {
		if (!componentProps) return undefined;

		const requiredProps = Object.entries(componentProps).filter(([, value]) =>
			Is.propRequired(value)
		);

		return requiredProps.reduce((acc, [key, value]) => {
			let prop: string | boolean | void | number = undefined;
			switch (value?.tsType?.name) {
				case 'string':
					prop = `"${faker.lorem.words(2)}"`;
					break;
				case 'boolean':
					prop = `"${faker.datatype.boolean()}"`;
					break;
				case 'number':
					prop = faker.number.int(5);
					break;
				case 'void':
					prop = '() => {}';
					break;
				default:
					prop = undefined;
					break;
			}

			return `${acc}${key}: ${prop},`;
		}, '');
	}
}
