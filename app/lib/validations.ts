import { z } from 'zod'

// Schema for creating a new post
export const createPostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10,000 characters'),
})

// Schema for updating a post
export const updatePostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  content: z.string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10,000 characters')
    .optional(),
})

// Schema for post ID parameter
export const postIdSchema = z.object({
  id: z.string()
    .min(1, 'Post ID is required')
    .regex(/^[a-zA-Z0-9]+$/, 'Post ID must be alphanumeric'),
})

// TypeScript types inferred from schemas
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostIdParam = z.infer<typeof postIdSchema> 