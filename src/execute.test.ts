import { describe, expect, it, vi } from 'vitest';
import { Get } from './get.js';
import { Generate } from './generate.js';
import { Execute } from './execute.js';

const mockGetComponentSignatures = vi.spyOn(Get, 'componentSignatures');
const mockGenerateStoryFileDescriptorFromPath = vi.spyOn(
	Generate,
	'storyFileDescriptorFromPath'
);
const mockGenerateStorybookTemplate = vi.spyOn(Generate, 'storybookTemplate');
const mockGenerateStoryPropArgs = vi.spyOn(Generate, 'storyPropArgs');
const mockGenerateStory = vi.spyOn(Generate, 'story');

describe('execute', () => {
	it('should call core functionality', () => {
		// Arrange
		const dummyFilePath = 'src/__testfixtures__/TestComponentWithoutProps.tsx';
		// Act
		Execute.on(dummyFilePath, {
			relativeTitle: false,
		});
		// Assert
		expect(mockGetComponentSignatures).toHaveBeenCalled();
		expect(mockGenerateStoryFileDescriptorFromPath).toHaveBeenCalled();
		expect(mockGenerateStorybookTemplate).toHaveBeenCalled();
		expect(mockGenerateStoryPropArgs).toHaveBeenCalled();
		expect(mockGenerateStory).toHaveBeenCalled();
	});
});
