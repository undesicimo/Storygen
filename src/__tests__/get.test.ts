import { Get } from '../get.js';
import {
	dirPath,
	withPropsComponentPath,
	withoutPropsComponentPath,
} from './conts';

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

	describe('props', () => {
		it('should get props of a component', () => {
			// Act
			const result =
				Get.props(`export default function TestComponentWithoutProps() {
        return (
                <>
                        <div>TestComponentWithoutProps</div>
                </>
        );
    }`);
			// Assert
			console.log(result);
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
