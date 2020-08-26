import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import md5File from 'md5-file';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		copy({
			targets: [
				'public/build/bundle.js',
				'public/build/bundle.js.map',
				'public/build/bundle.css',
				'public/build/bundle.css.map'
			].map(x => {
				return {
					src: x,
					dest: '../public/packs',
					rename: (_name, _ext) => hashseal(x)
				}
			}),
			hook: 'writeBundle'
		}),
		copy({
			targets: [
				{
					src: 'serialized_manifest.json',	
					dest: '../public/packs',
					rename: 'manifest.json',
					transform: (contents) => makeManifest(contents)
				}
			],
			hook: 'writeBundle'
		}),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function makeManifest(x) {
	let result = {};
	let r = JSON.parse(x);
	r.targets.forEach(z => {
		console.log(z)
		let parsedPath = path.parse(z);
		result[parsedPath.base] = hashseal(z);
	});
	return JSON.stringify(result);
}

function hashseal(x) {
		let parsedPath = path.parse(x);
		let hash = md5File.sync(x);
		let name = parsedPath.ext === '.map' ?
			path.parse(parsedPath.name).name :
			parsedPath.name
		let ext = parsedPath.ext === '.map' ?
			path.parse(parsedPath.name).ext + '.map' :
			parsedPath.ext
		return `${name}-${hash}${ext}`
}

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
