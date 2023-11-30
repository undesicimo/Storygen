import getAllFilePathsFromDirPath from './getAllFilePathsFromDirPath';

it('should get all file paths from dir path', () => {
	// Arrange
	const dirPath = 'src/__testfixtures__/';
	// Act
	const result = getAllFilePathsFromDirPath(dirPath);
	// Assert
	expect(result).toContainEqual(
		'src/__testfixtures__/TestComponentWithProps.tsx'
	);
	expect(result).toContainEqual(
		'src/__testfixtures__/TestComponentWithoutProps.tsx'
	);
});
