const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Всё, что нас не убивает…',
    author: 'Артемий Троицкий',
    url: 'https://echo.msk.ru/blog/troitskiy/2710247-echo/',
    likes: 62
  }
]

const newBlog = {
  title: 'Как написать telegram бота',
  author: 'Евгений Шкляр',
  url: 'https://htmlacademy.ru/blog/boost/backend/telegram-bot'
}

const brokenBlog = {
  author: 'Козьма Прутков'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, newBlog, brokenBlog, usersInDb
}
