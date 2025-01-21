const { test, after, beforeEach, describe } = require('node:test')

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcrypt')

const app = require('../app')
const { title } = require('node:process')

const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('passy', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'thc',
      name: 'hastings_clf',
      password: 'valhalla'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

test('creation fails with if username taken with proper status codes', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'mr root',
    password: 'secret'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper status code if username non-unique ', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'mr root',
    password: 'secret'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper status code if username under minimum length submitted', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'ro',
    name: 'mr root',
    password: 'secret'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('`username` (`ro`) is shorter'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper status code if password under minimum length submitted', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'rototo',
    name: 'mr root',
    password: 'se'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('password too short'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
})


describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    // delete users and blogs
    await User.deleteMany()
    await Blog.deleteMany({})

    // create a user
    const passwordHash = await bcrypt.hash('passy', 10)
    const user = new User({ username: 'root', name: 'rooty giuliani', passwordHash })

    newUser = await user.save()

    // insert blogs manually
    for (let blogContent of helper.listWithTwoBlogs) {
      const blog = new Blog({
        title: blogContent.title,
        author: blogContent.author,
        user: newUser._id,
        url: blogContent.url,
        likes: Boolean(blogContent.likes) ? blogContent.likes : 0
      })
    
      await blog.save()
    }

  })

  // create a user 
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.listWithTwoBlogs.length)
  })

  test('unique identifier called id', async () => {
    const response = await helper.blogsInDb()
    const blogOfInterest = response[0]
  
    assert(("id" in blogOfInterest) && !("_id" in blogOfInterest))
  })

  test('a valid blog can be added', async () => {

    const token = await helper.firstUserToken()

    const newBlog = {
      title: "The meaning of everything",
      author: "Hasting Clf",
      url: "http://tigheclough.com",
      likes: 8
    }
  
    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length + 1)
  })

  test('a valid blog without a token canNOT be added', async () => {

    const newBlog = {
      title: "The meaning of everything",
      author: "Hasting Clf",
      url: "http://tigheclough.com",
      likes: 8
    }
  
    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length)
  })


  test('if likes property is missing, likes will default to 0', async () => {
    
    const token = await helper.firstUserToken()

    const newBlog = {
      title: "The meaning of everything",
      author: "Big Tig",
      url: "http://tigheclough.com",
    }
  
    const resp = await api
                 .post('/api/blogs')
                 .set('Content-Type', 'application/json')
                 .set('Authorization', `Bearer ${token}`)
                 .send(newBlog)
    
    assert(resp.body.likes === 0)
  })

  test('if title or url is missing, respond with 400', async () => {
    
    const token = await helper.firstUserToken()
    
    const newBlogNoTitle = {
      author: "Big Tig",
      url: "http://tigheclough.com",
      likes: 100
    }
  
    const newBlogNoUrl= {
      title: "The meaning of everything",
      author: "Big Tig",
      likes: 100
    }
  
    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoTitle)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogNoUrl)
      .expect(400)
  })
  
  test('a blog can be deleted', async () => {
    const token = await helper.firstUserToken()

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length - 1)
  })

  test('a blog can be edited with a valid token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const token = await helper.firstUserToken()

    const newBlog = { likes: 10 }

    const updated = await api
          .put(`/api/blogs/${blogToEdit.id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)

    assert.deepStrictEqual(updated.body.likes, 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})