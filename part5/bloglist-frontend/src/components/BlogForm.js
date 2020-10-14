import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState('')

  const handleSubmit = (event, title, author, url, likes) => {
    event.preventDefault()
    const newBlog = { title, author, url, likes }
    addBlog(newBlog)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes('')
  }

  return (
    <form onSubmit={e => handleSubmit(e, newBlogTitle, newBlogAuthor, newBlogUrl, newBlogLikes)}>
      <div>
        Title
        <input
          type="text"
          value={newBlogTitle}
          name="Title"
          className="title"
          onChange={e => setNewBlogTitle(e.target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={newBlogAuthor}
          name="Author"
          className="author"
          onChange={e => setNewBlogAuthor(e.target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type="text"
          value={newBlogLikes}
          name="Likes"
          className="likes"
          onChange={e => setNewBlogLikes(e.target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={newBlogUrl}
          name="URL"
          className="url"
          onChange={e => setNewBlogUrl(e.target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )}


export default BlogForm