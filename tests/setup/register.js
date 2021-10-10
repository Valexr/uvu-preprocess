import { parse } from 'path'
import { execSync } from 'child_process'
import { compile } from 'svelte/compiler'
import { addHook } from 'pirates'
import { getSvelteConfig } from './svelteconfig.js'


const useTransformer = (options = {}) => (source, filename) => {
	const { debug, preprocess, rootMode } = options;
	let processed = source;
	if (preprocess) {
		const svelteConfig = getSvelteConfig(rootMode, filename);
		const preprocessor = require.resolve('./preprocess.js');
		processed = execSync(`node --unhandled-rejections=strict --abort-on-uncaught-exception "${preprocessor}"`, {
			env: { PATH: process.env.PATH, source, filename, svelteConfig }
		}).toString();
		if (debug) console.log(processed);
		return processed;
	}
	else {
		return source;
	}
};

function transform(source, filename) {
	const { name } = parse(filename);

	const preprocessed = useTransformer({ preprocess: true })(source, filename);

	const { js, warnings } = compile(preprocessed, {
		name: name[0].toUpperCase() + name.slice(1),
		format: 'cjs',
		filename
	});

	warnings.forEach(warning => {
		console.warn(`\nSvelte Warning in ${warning.filename}:`);
		console.warn(warning.message);
		console.warn(warning.frame);
	});

	return js.code;
}

const handleSvelte = (source, filename) => transform(source, filename)

addHook(handleSvelte, { exts: ['.svelte'] })
