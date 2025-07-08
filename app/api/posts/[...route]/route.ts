import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from '@/app/db'
import { posts } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { 
  createPostSchema, 
  updatePostSchema, 
  postIdSchema,
  type CreatePostInput,
  type UpdatePostInput 
} from '@/app/lib/validations'

export const runtime = 'edge'

const app = new Hono().basePath('/api/posts')

// Get all posts
app.get('/', async (c) => {
  try {
    const allPosts = await db.select().from(posts).orderBy(posts.createdAt)
    return c.json(allPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return c.json({ message: 'Failed to fetch posts' }, 500)
  }
})

// Get a single post
app.get('/:id', async (c) => {
  try {
    const { id } = c.req.param()
    
    // Validate the ID parameter
    const validatedParams = postIdSchema.parse({ id })
    
    const post = await db.select().from(posts).where(eq(posts.id, validatedParams.id)).limit(1)
    
    if (post.length === 0) {
      return c.json({ message: 'Post not found' }, 404)
    }
    
    return c.json(post[0])
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400)
    }
    console.error('Error fetching post:', error)
    return c.json({ message: 'Failed to fetch post' }, 500)
  }
})

// Create a new post
app.post('/', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate the request body
    const validatedData: CreatePostInput = createPostSchema.parse(body)
    
    const newPost = await db.insert(posts).values({
      title: validatedData.title,
      content: validatedData.content,
    }).returning()
    
    return c.json(newPost[0], 201)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400)
    }
    console.error('Error creating post:', error)
    return c.json({ message: 'Failed to create post' }, 500)
  }
})

// Update a post
app.put('/:id', async (c) => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()
    
    // Validate the ID parameter and request body
    const validatedParams = postIdSchema.parse({ id })
    const validatedData: UpdatePostInput = updatePostSchema.parse(body)
    
    const existingPost = await db.select().from(posts).where(eq(posts.id, validatedParams.id)).limit(1)
    
    if (existingPost.length === 0) {
      return c.json({ message: 'Post not found' }, 404)
    }
    
    const updatedPost = await db.update(posts)
      .set({
        title: validatedData.title ?? existingPost[0].title,
        content: validatedData.content ?? existingPost[0].content,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, validatedParams.id))
      .returning()
    
    return c.json(updatedPost[0])
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400)
    }
    console.error('Error updating post:', error)
    return c.json({ message: 'Failed to update post' }, 500)
  }
})

// Delete a post
app.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param()
    
    // Validate the ID parameter
    const validatedParams = postIdSchema.parse({ id })
    
    const existingPost = await db.select().from(posts).where(eq(posts.id, validatedParams.id)).limit(1)
    
    if (existingPost.length === 0) {
      return c.json({ message: 'Post not found' }, 404)
    }
    
    await db.delete(posts).where(eq(posts.id, validatedParams.id))
    
    return c.json({ message: 'Post deleted' }, 200)
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400)
    }
    console.error('Error deleting post:', error)
    return c.json({ message: 'Failed to delete post' }, 500)
  }
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)