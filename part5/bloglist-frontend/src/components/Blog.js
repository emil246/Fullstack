import React, { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails((prevState) => !prevState)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div ref_cy='blog' style={blogStyle}>
      {showDetails === false ?
        <p>{blog.title} {blog.author}</p>
        :
        <div>
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <div>
            {blog.likes}
            <button onClick={handleLike}>like</button>

          </div>
        </div>
      }
      <button onClick={toggleShowDetails}>Details</button>
      {blog.user.name === user?.name ?
        <button onClick={handleRemove}>remove</button>
        : null
      }
    </div>
  )
}

export default Blog
