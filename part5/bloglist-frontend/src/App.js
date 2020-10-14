import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchData(){
      const initialBlogs = await blogService
        .getAll()
      setBlogs(initialBlogs)}
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (blog) => {
    blog.likes += 1
    await blogService.update(blog.id, blog)
    const initialBlogs = await blogService
      .getAll()
    setBlogs(initialBlogs)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      await blogService.remove(blog.id)
      const initialBlogs = await blogService
        .getAll()
      setBlogs(initialBlogs)
      setMessage({ notification: `succesful deleted by ${blog.author}` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async FormData => {
    blogFormRef.current.toggleVisibility()
    const  returnedBlog = await blogService
      .create(FormData)
    setBlogs(blogs.concat(returnedBlog))
    setMessage({ notification: `succesful adding blog by ${returnedBlog.author}` })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ error: 'wrong credentials' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification
        type={message?.notification ? 'notification' : 'error'}
        message={message?.notification ? message?.notification : message?.error}
      />

      {user === null
        ? <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        : <div>
          <p>{user.name} logged in <button onClick = {handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      }

      <ul>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleRemove={() => handleRemove(blog)} handleLike={() => handleLike(blog)} user={user}/>
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
