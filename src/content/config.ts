import { z, defineCollection } from 'astro:content';

const blogContent = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            author: z.string().default('Ishan Joshi'),
            date: z.date(),
            description: z.string().default(''),
            emoji: z.string().optional(),
            color: z.string().default('pine'),
            tags: z.array(z.string()).optional(),
            draft: z.boolean().default(false),
            img: image()
                .refine((img) => img)
                .optional(),
        }),
});

const thinkingContent = defineCollection({
    type: 'content',
    schema: () =>
        z.object({
            title: z.string(),
            author: z.string().default('Ishan Joshi'),
            color: z.string().default('pine'),
            date: z.date().default(new Date()),
        }),
});

const gsocLogContent = defineCollection({
    type: 'content',
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            date: z.date().default(new Date()),
            commit: z.string().url().optional(),
            workType: z.enum(['Study', 'Code', 'Mixed', 'Meeting', 'Other']),
            reviewed: z.boolean().default(false),
        }),
});

const mlLogContent = defineCollection({
    type: 'content',
    schema: () =>
        z.object({
            title: z.string(),
            summary: z.string().optional(),
            date: z.date().default(new Date()),
            tags: z.array(z.string()).optional(),
        }),
});

export const collections = {
    blog: blogContent,
    thinks: thinkingContent,
    gsoc_log: gsocLogContent,
    ml_log: mlLogContent,
};
