import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({image})=>z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()),
		cover: image().optional(),
		draft: z.boolean().optional(),
		//updatedDate: z.coerce.date().optional(),
		//heroImage: z.string().optional(),
	}),
});

const about = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/about', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date()
		//updatedDate: z.coerce.date().optional(),
		//heroImage: z.string().optional(),
	}),
});
export const collections = { posts,about };
