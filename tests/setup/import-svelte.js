// import-svelte.js
const { addHook } = require('pirates')
const svelte = require('svelte/compiler')
const sveltePreprocess = require("svelte-preprocess");

function handleSvelte(code) {
    const codes = svelte
        .preprocess(source, sveltePreprocess(), { filename })
        .then(r => console.log(r))

    const { js } = svelte.compile(code, {
        dev: true,
        format: 'cjs',
    })

    return js.code
}

addHook(handleSvelte, { exts: ['.svelte'] })