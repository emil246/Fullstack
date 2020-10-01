const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!blog.title || !blog.url) {
    response.status(400).json({
      error: 'missing title, url'
    })
  } else {
    blog.user = decodedToken.id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    await savedBlog
      .populate({ path: 'user', select: ['name', 'username'] })
      .execPopulate()
    response.json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(decodedToken.id)
    if (!blog) return response.status(404).json({ error: 'no blog' })
    if (blog.user.toString() === decodedToken.id) { await blog.remove() }
    return response.status(204).json({ info: 'blog deleted' })
  } else {
    return response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (!updatedBlog) return response.status(404).json({ error: 'no blog' })
    return response.status(200).json(updatedBlog.toJSON())
  } else {
    return response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
