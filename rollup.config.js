import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import path from 'path'
import postcss from 'rollup-plugin-postcss'

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'my-faceapi-js-lib',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			postcss({
				minimize: true,
				extensions: ['.css'],
				extract: path.resolve('dist/my-faceapi-js-lib.css'),
			}),
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},
	{
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];