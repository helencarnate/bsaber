import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svx'],
      smartypants: {
        dashes: 'oldschool',
      },
      layout: {
        posts: './src/routes/__layout.svelte',
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],

  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE'],
    },
  },
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
}

export default config
