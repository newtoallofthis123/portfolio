import { z, defineCollection } from 'astro:content';

const blogContent = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        author: z.string().default('Ishan Joshi'),
        date: z.date(),
        description: z.string().default(''),
        emoji: z.string().optional(),
        color: z.string().default('pine'),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
        img: image().refine((img) => img).optional(),
    }),
});

const thinkingContent = defineCollection({
    type: 'content',
    schema: () => z.object({
        title: z.string(),
        author: z.string().default('Ishan Joshi'),
        color: z.string().default('pine'),
        date: z.date().default(new Date()),
    }),
});

export const collections = {
    blog: blogContent,
    thinks: thinkingContent,
};
