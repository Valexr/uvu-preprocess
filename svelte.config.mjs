import sveltePreprocess from "svelte-preprocess";
const options = {
	sourceMap: true,
	scss: {
		prependData: `@import './src/variables';`,
	}
};

export const preprocess = sveltePreprocess(options);
