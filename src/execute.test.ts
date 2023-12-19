import { describe, expect, it, vi } from 'vitest';
import { Get } from './get.js';
import { Generate } from './generate.js';
import { Execute } from './execute.js';
import { Log } from './log.js';

// Get mocks
const mockGetComponentSignatures = vi.spyOn(Get, 'componentSignatures');
// Generate mocks
const mockGenerateStoryFileDescriptorFromPath = vi.spyOn(
	Generate,
	'storyFileDescriptorFromPath'
);
const mockGenerateStorybookTemplate = vi.spyOn(Generate, 'storybookTemplate');
const mockGenerateStoryPropArgs = vi.spyOn(Generate, 'storyPropArgs');
const mockGenerateStory = vi.spyOn(Generate, 'story');
// Log mocks
const mockLogExecutionResult = vi.spyOn(Log, 'executionResult');

describe('Execute', () => {
	describe('on', () => {
		it('should call core functionality', () => {
			// Arrange
			const dummyFilePath =
				'src/__testfixtures__/TestComponentWithoutProps.tsx';
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
	describe('program', () => {
		it('should run once when path is a filepath', () => {
			// Arrange
			const mockExecuteOn = vi.spyOn(Execute, 'on');
			const targetFileName = 'TestComponentWithoutProps';
			const dummyFilePath = 'src/__testfixtures__';
			// Act
			Execute.program(`${dummyFilePath}/${targetFileName}.tsx`, {
				relativeTitle: false,
			});
			// Assert
			expect(mockExecuteOn).toHaveBeenCalledTimes(1);
			expect(mockLogExecutionResult).toHaveBeenCalledWith(
				[`${dummyFilePath}/${targetFileName}.stories.tsx`],
				[]
			);
		});

		// TODO: should skip story files by default
		it.fails('should run multiple times when path is a dirpath', () => {
			// Arrange
			const mockExecuteOn = vi.spyOn(Execute, 'on');
			const dummyDirPath = 'src/__testfixtures__';
			// Act
			Execute.program(dummyDirPath, {
				relativeTitle: false,
			});
			// Assert
			expect(mockExecuteOn).toHaveBeenCalledTimes(2);
			expect(mockLogExecutionResult).toHaveBeenCalledWith(
				[
					'src/__testfixtures__/TestComponentWithProps.stories.tsx',
					'src/__testfixtures__/TestComponentWithoutProps.stories.tsx',
				],
				[]
			);
		});

		it('should throw error when target file is not a react component', () => {
			// Arrange
			const nonComponentFilePath = 'src/execute.ts';
			// Act
			Execute.program(nonComponentFilePath, {
				relativeTitle: false,
			});
			// Assert
			expect(mockLogExecutionResult).toHaveBeenCalledWith(
				[],
				[
					{
						filePath: nonComponentFilePath,
						error: new Error('No suitable component definition found.'),
					},
				]
			);
		});
	});
});
