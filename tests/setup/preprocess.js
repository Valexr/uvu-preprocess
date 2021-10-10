const { preprocess } = require('svelte/compiler')
const { cosmiconfigSync } = require('cosmiconfig')
// const { pathToFileURL } = require('url')
// const { preprocess } = require('../../svelte.config.js')

const { source, filename, svelteConfig } = process.env

// import(pathToFileURL(svelteConfig)).then(configImport => {
// 	// ESM or CommonJS
// 	const config = configImport.default ? configImport.default : configImport

// 	preprocess(source, config.preprocess || {}, { filename })
// 		.then((r) => {
// 			process.stdout.write(r.code)
// 		})
// }).catch(err => process.stderr.write(err))

const config = cosmiconfigSync().load(svelteConfig).config
preprocess(source, config.preprocess || {}, { filename })
	.then((r) => process.stdout.write(r.code))
