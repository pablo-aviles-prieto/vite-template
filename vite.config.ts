import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

const vitestConfig = defineVitestConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'setup-test.ts',
		exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.{idea,git,cache,output,temp}/**'],
		coverage: {
			enabled: true,
			provider: 'v8',
			all: true,
			include: ['src/**/*.{ts,tsx}'],
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'src/__tests__/', '**/*.{test,spec}.{ts,tsx}'],
		},
	},
});

export default mergeConfig(viteConfig, vitestConfig);
