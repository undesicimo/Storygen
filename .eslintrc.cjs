module.exports = {
	rules: {
		'@typescript-eslint/no-unused-vars': 'error',
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
};
