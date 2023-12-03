import { StoryObj, Meta } from '@storybook/react';

import TestComponentWithProps from './TestComponentWithProps';

export default {
	title: '__testfixtures__/TestComponentWithProps',
	component: TestComponentWithProps,
	args: {},
} as Meta<typeof TestComponentWithProps>;

type Story = StoryObj<typeof TestComponentWithProps>;

export const Default: Story = {
	args: {},
};
