import { Is } from '../is';

describe('Is', () => {
	it('should return true if path is dirPath', () => {
		// Arrange
		const path = 'src/__testfixtures__/';
		// Act
		const result = Is.pathADirPath(path);
		// Assert
		expect(result).toBe(true);
	});

	it('should return false if path is not dirPath', () => {
		// Arrange
		const path = 'src/__testfixtures__/TestComponentWithProps.tsx';
		// Act
		const result = Is.pathADirPath(path);
		// Assert
		expect(result).toBe(false);
	});
});
