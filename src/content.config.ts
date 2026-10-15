import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/writing",
    // English and Chinese may intentionally use the same hand-authored slug.
    generateId: ({ data }) => `${data.lang}/${data.slug}`,
  }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      lang: z.enum(["en", "zh"]),
      draft: z.boolean().default(true),
      publishedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      translationKey: z.string().optional(),
      originalUrl: z.url().optional(),
      originalPublishedAt: z.coerce.date().optional(),
      adaptedFrom: z.string().optional(),
    })
    .superRefine((entry, context) => {
      if (!entry.draft && !entry.publishedAt)
        context.addIssue({
          code: "custom",
          path: ["publishedAt"],
          message: "Published articles require their actual publication date.",
        });
      if (
        entry.updatedAt &&
        entry.publishedAt &&
        entry.updatedAt < entry.publishedAt
      )
        context.addIssue({
          code: "custom",
          path: ["updatedAt"],
          message: "updatedAt cannot precede publishedAt.",
        });
    }),
});
export const collections = { writing };
