import { parse } from 'react-docgen-typescript';

const [filePath] = process.argv.slice(2);

/**
 *
 * @returns string
 * ex: name: {{dummy data with type of string}},
 *     \n onlick: {{dummy data with type of () => void}}
 */
export function getProps(path: string) {
	const options = {
		savePropValueAsString: true,
	};

	const [component] = parse(path, options);

	const props = component.props;
	const propsKeys = Object.keys(props);
	const propsValues = Object.values(props);

	let description = [];
	for (const index in propsKeys) {
		const value = propsValues[index];
		if (value.required) {
			description.push(
				`${propsKeys[index]}: {{dummy data with type of ${value.type.name}}},`
			);
		}
	}

	return description.join('\n');
}

console.log(getProps(filePath));
