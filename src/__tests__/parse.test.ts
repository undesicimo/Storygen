import { Parse } from '../parse.js';
import {
	dirPath,
	withPropsComponentPath,
	withoutPropsComponentPath,
} from './conts.js';

describe('Parse', () => {
	it('should parse contents of a react component to string', () => {
		// Act
		const result = Parse.reactComponent(withoutPropsComponentPath);
		// Assert
		expect(result)
			.toEqual(`export default function TestComponentWithoutProps() {
              return (
                <>
                        <div>TestComponentWithoutProps</div>
                </>
        );
    }`);
		console.log(result);
	});
});
