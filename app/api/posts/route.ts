import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from '@/app/db'
import { posts } from '@/app/db/schema'
import {
	createPostSchema,
	type CreatePostInput,
} from '@/app/lib/validations'

export const runtime = 'edge'

const app = new Hono().basePath(
	'/api/posts',
)

// Get all posts
app.get('/', async (c) => {
	try {
		const allPosts = await db
			.select()
			.from(posts)
			.orderBy(posts.createdAt)
		return c.json(allPosts)
	} catch (error) {
		console.error(
			'Error fetching posts:',
			error,
		)
		return c.json(
			{
				message:
					'Failed to fetch posts',
			},
			500,
		)
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


export const GET = handle(app)
export const POST = handle(app)
