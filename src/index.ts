import { parse } from 'react-docgen-typescript';

const [filePath] = process.argv.slice(2);

/**
 *
 * @returns string
 * ex: name: {{dummy data with type of string}},
 *     \n onlick: {{dummy data with type of () => void}}
 */
export function getProps(path: string) {
	const [component] = parse(path, { savePropValueAsString: true });

	const propsKeys = Object.keys(component.props);
	const propsValues = Object.values(component.props);

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
