const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('get API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.author)
    expect(contents).toContain(
      'Артемий Троицкий'
    )
  })

  test('blog have an id property', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('post API', () => {
  test('save in database without token', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('no likes to 0', async () => {
    const savedBlog = await api.post('/api/blogs').send(helper.newBlog)

    expect(savedBlog.body).toHaveProperty('likes', 0)
  })

  test('missing title url', async () => {
    await api
      .post('/api/blogs')
      .send(helper.brokenBlog)
      .expect(400)
  })
})

describe('delete API', () => {
  test('wrong id', async () => {
    await api
      .delete('/api/blogs/5f70ed2e9a0827302d')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('deleting', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id
    await api.delete(`/api/blogs/${id}`)
    const newBlogs = await api.get('/api/blogs')
    expect(newBlogs.body.length).toBe(blogs.body.length - 1)
  })
})

describe('put API', () => {
  test('wrong id', async () => {
    await api
      .put('/api/blogs/5f70ed2e9a0827302d')
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('check update', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body[0].id
    const updatedLikes = response.body[0].likes + 33

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const updatedBlogs = await api.get('/api/blogs')
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlogs.body.map((r) => r.likes)).toContain(updatedLikes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('save blog in database with token', async () => {
    const userInDB = await helper.usersInDb()
    const user = {
      username: userInDB[0].username,
      id: userInDB[0].id
    }
    const token = jwt.sign(user, process.env.SECRET)
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const updatedBlogs = await api.get('/api/blogs')
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('missing pass', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'contoso',
      name: 'Superuser',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('weak password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('length check', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'contoso',
      name: 'Superuser',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('missing username or password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
