import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { terser } from 'rollup-plugin-terser';
import Package from './package.json';

export default defineConfig(({ command, mode }) => {
	if (mode === 'app') {
		return {
			plugins: [react()],
		};
	}
	return {
		define: {
			__DEV__: command !== 'build',
		},
		build: {
			minify: 'terser',
			lib: {
				name: Package.name,
				entry: 'src/Email.tsx',
				formats: ['es', 'umd'],
				fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.js'),
			},
			rollupOptions: {
				external: ['react', 'react/jsx-runtime'],
				input: 'src/index.ts',
				output: {
					globals: {
						react: 'React',
						'react/jsx-runtime': 'React',
					},
				},
				plugins: [
					terser({
						compress: {
							defaults: true,
						},
					}),
				],
			},
		},
		plugins: [react()],
	};
});
