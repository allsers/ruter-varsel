import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: process.env.ADAPTER === 'static'
		? adapterStatic({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		  })
		: adapterAuto()
	}
};

export default config;
