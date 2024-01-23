import { describe, expect, it } from 'vitest';
import { Is } from '../is';
import { DUMMY_STORYBOOK_FILE_PATH, DUMMY_FILE_PATH } from './const';

describe('It', () => {
	it('should return true if given path is a storybook file', () => {
		expect(Is.storybookFile(DUMMY_STORYBOOK_FILE_PATH)).toBe(true);
	});

	it('should return false if given path is not a storybook file', () => {
		expect(Is.storybookFile(DUMMY_FILE_PATH)).toBe(false);
	});
});
