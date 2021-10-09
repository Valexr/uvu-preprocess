const sveltePreprocess = require("svelte-preprocess");
const options = {
	sourceMap: true,
	scss: {
		prependData: `@import './src/variables';`,
	}
};

module.exports = {
	preprocess: sveltePreprocess(options)
}
