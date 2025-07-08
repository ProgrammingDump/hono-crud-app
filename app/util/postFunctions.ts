export async function getAllPosts() {
  const res = await fetch('/api/posts');
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch posts');
  }
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Post not found');
  }
  return res.json();
}

export async function createPost(title: string, content: string) {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create post');
  }
  return res.json();
}

export async function updatePost(id: string, title: string, content: string) {
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update post');
  }
  return res.json();
}

export async function deletePost(id: string) {
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete post');
  }
  return res.json();
}