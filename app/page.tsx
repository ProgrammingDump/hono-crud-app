'use client'
import { useEffect, useState } from 'react'
import './globals.css'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { getAllPosts, getPost, createPost, updatePost, deletePost } from './util/postFunctions'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useToast } from './context/ToastContext'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const { addToast } = useToast()

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllPosts()
      setPosts(data)
    } catch (err: any) {
      setError(err.message)
      addToast('error', `❌ GET request failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleCreate = async () => {
    try {
      await createPost('New Post', 'This is a new post')
      addToast('success', '✨ POST request successful - Post created!')
      fetchPosts()
    } catch (err: any) {
      setError(err.message)
      addToast('error', `❌ POST request failed: ${err.message}`)
    }
  }

  const startEditing = (post: any) => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  const handleUpdate = async (id: string) => {
    try {
      await updatePost(id, editTitle, editContent)
      addToast('success', '🔄 PUT request successful - Post updated!')
      setEditingId(null)
      setEditTitle('')
      setEditContent('')
      fetchPosts()
    } catch (err: any) {
      setError(err.message)
      addToast('error', `❌ PUT request failed: ${err.message}`)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id)
      addToast('success', '🗑️ DELETE request successful - Post deleted!')
      fetchPosts()
    } catch (err: any) {
      setError(err.message)
      addToast('error', `❌ DELETE request failed: ${err.message}`)
    }
  }

  if (loading) return (
    <div className='flex justify-center items-center h-screen bg-white dark:bg-black'>
      <Button size='lg'
       disabled
       variant='outline'
       className='flex items-center gap-2'
      >
        <Loader2Icon className='animate-spin' />
        Loading...
      </Button>
    </div>
  )
  if (error) return (
    <div className='min-h-screen bg-white dark:bg-black flex items-center justify-center'>
      <p className='text-red-600 dark:text-red-400'>Error: {error}</p>
    </div>
  )

  console.log(posts)

  return (
		<div className='min-h-screen bg-white dark:bg-black transition-colors duration-200'>
			<ThemeToggle />
			<div className='flex flex-col items-center justify-center min-h-screen p-4'>
				<h1 className='text-3xl uppercase font-bold m-5 text-gray-900 dark:text-white'>
					Posts
				</h1>
				<Button
					variant='outline'
					onClick={handleCreate}
					className='m-5 hover:-translate-y-1 dark:bg-gray-900/40 dark:hover:bg-gray-900/60 hover:shadow-lg transition-all duration-200 ease-in-out'
				>
					Create Post
				</Button>
				<ul className='w-full max-w-2xl'>
					{posts.map((post: any) => (
						<li
							key={post.id}
							className='group border hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out rounded 
              p-4 m-2 bg-white hover:bg-gray-200 hover:transition hover:duration-200 dark:bg-gray-900/40 dark:hover:bg-gray-900/60 
              border-gray-200 dark:border-gray-700 shadow-sm'
						>
							{editingId === post.id ? (
								// Edit mode
								<div className='space-y-3'>
									<div>
										<label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
											Title:
										</label>
										<input
											type='text'
											value={editTitle}
											onChange={(e) =>
												setEditTitle(
													e.target
														.value,
												)
											}
											className='w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
											Content:
										</label>
										<textarea
											value={
												editContent
											}
											onChange={(e) =>
												setEditContent(
													e.target
														.value,
												)
											}
											className='w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											rows={3}
										/>
									</div>
									<div className='flex gap-2'>
										<Button
											onClick={() =>
												handleUpdate(
													post.id,
												)
											}
											className='bg-green-400 hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out'
										>
											Save
										</Button>
										<Button
											variant='outline'
											onClick={
												cancelEditing
											}
											className='hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out'
										>
											Cancel
										</Button>
									</div>
								</div>
							) : (
								// View mode
								<div className='flex justify-between items-start'>
									<div className='flex-1'>
										<strong className='block text-lg text-gray-900 dark:text-white'>
											{post.title}
										</strong>
										<p className='text-gray-600 dark:text-gray-400 mt-1'>
											{post.content}
										</p>
                    <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300 ease-in-out">
                      <div className="pt-2 space-y-1">
                        <p className='text-gray-500 dark:text-gray-500 text-xs'>
                          ID: {post.id}
                        </p>
                        <p className='text-gray-500 dark:text-gray-500 text-xs'>
                          Created: {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <p className='text-gray-500 dark:text-gray-500 text-xs'>
                          Updated: {new Date(post.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
									</div>
									<div className='flex gap-2 ml-4'>
										<Button
											onClick={() =>
												startEditing(
													post,
												)
											}
											className='dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out'
										>
											Edit
										</Button>
										<Button
											variant='destructive'
											onClick={() =>
												handleDelete(
													post.id,
												)
											}
											className='hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out'
										>
											Delete
										</Button>
									</div>
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
