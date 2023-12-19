import { z, defineCollection } from 'astro:content';

// So I know I have a option problem.
// But I have no idea how this grew so much.
// Now I am too scared to remove any of these.
// Is this how you feel when you have a lot of options?
// I guess I will never know.
const blogContent = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        author: z.string().default('Ishan Joshi'),
        date: z.date(),
        description: z.string(),
        emoji: z.string().optional(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
        img: image().refine((img) => img).optional(),
    }),
});

export const collections = {
    blog: blogContent,
};