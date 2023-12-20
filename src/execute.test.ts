import { describe, expect, it, vi } from 'vitest';
import { Get } from './get.js';
import { Generate } from './generate.js';
import { Execute } from './execute.js';
import { Log } from './log.js';
import {
	DUMMY_DIR_PATH,
	DUMMY_FILE_PATH,
	NON_COMPONENT_FILE_PATH,
} from './__tests__/const.js';

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
			// Act
			Execute.on(DUMMY_FILE_PATH, {
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
			// Act
			Execute.program(`${DUMMY_DIR_PATH}/${targetFileName}.tsx`, {
				relativeTitle: false,
			});
			// Assert
			expect(mockExecuteOn).toHaveBeenCalledTimes(1);
			expect(mockLogExecutionResult).toHaveBeenCalledWith(
				[`${DUMMY_DIR_PATH}/${targetFileName}.stories.tsx`],
				[]
			);
		});

		// TODO: should skip story files by default
		it.fails('should run multiple times when path is a dirpath', () => {
			// Arrange
			const mockExecuteOn = vi.spyOn(Execute, 'on');
			// Act
			Execute.program(DUMMY_DIR_PATH, {
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
			// Act
			Execute.program(NON_COMPONENT_FILE_PATH, {
				relativeTitle: false,
			});
			// Assert
			expect(mockLogExecutionResult).toHaveBeenCalledWith(
				[],
				[
					{
						filePath: NON_COMPONENT_FILE_PATH,
						error: new Error('No suitable component definition found.'),
					},
				]
			);
		});
	});
});
