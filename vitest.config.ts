import { defineConfig } from 'vitest/dist/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			enabled: true,
			reporter: ['html'],
		},
	},
});
