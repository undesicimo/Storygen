/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	testEnvironment: 'node',
	clearMocks: true,
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
};
