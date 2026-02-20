import { defineCollection, z } from 'astro:content';

const features = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon:  z.string(),
    color: z.enum(['blue', 'green', 'purple', 'yellow']),
    order: z.number(),
  }),
});

const examples = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    lang:  z.string().default('python'),
    code:  z.string(),
  }),
});

export const collections = { features, examples };
