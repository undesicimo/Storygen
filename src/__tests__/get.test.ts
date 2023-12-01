import { Get } from '../get';

const dirPath = 'src/__testfixtures__/';
const withPropsComponentPath =
	'src/__testfixtures__/TestComponentWithProps.tsx';
const withoutPropsComponentPath =
	'src/__testfixtures__/TestComponentWithoutProps.tsx';

describe('Get', () => {
	describe('allFilePathsFromDirPath', () => {
		it('should get all file paths from dir path', () => {
			// Act
			const result = Get.allFilePathsFromDirPath(dirPath);
			// Assert
			expect(result).toContainEqual(
				'src/__testfixtures__/TestComponentWithProps.tsx'
			);
			expect(result).toContainEqual(
				'src/__testfixtures__/TestComponentWithoutProps.tsx'
			);
		});
	});
	describe('componentName', () => {
		test.each<{
			componentName: string;
			componentPath: string;
		}>([
			{
				componentName: 'TestComponentWithProps',
				componentPath: withPropsComponentPath,
			},
			{
				componentName: 'TestComponentWithoutProps',
				componentPath: withoutPropsComponentPath,
			},
		])(
			'should get the display name of component of $componentName',
			({ componentName, componentPath }) => {
				// Act
				const result = Get.componentName(componentPath);
				// Assert
				expect(result).toEqual(componentName);
			}
		);
	});
});
