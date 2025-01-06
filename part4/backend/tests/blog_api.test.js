const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const assert = require('node:assert')

const app = require('../app')
const { title } = require('node:process')

const api = supertest(app)

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithTwoBlogs)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.listWithTwoBlogs.length)
  })

  test('unique identifier called id', async () => {
    const response = await api.get('/api/blogs')
  
    const blogOfInterest = response.body[0]
  
    assert(("id" in blogOfInterest) && !("_id" in blogOfInterest))
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "The meaning of everything",
      author: "Hasting Clf",
      url: "http://tigheclough.com",
      likes: 8
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length + 1)
  })

  test('if likes property is missing, likes will default to 0', async () => {
    const newBlog = {
      title: "The meaning of everything",
      author: "Big Tig",
      url: "http://tigheclough.com",
    }
  
    const resp = await api
                 .post('/api/blogs')
                 .send(newBlog)
    
    assert(resp.body.likes === 0)
  })

  test('if title or url is missing, respond with 400', async () => {
    const newBlogNoTitle = {
      author: "Big Tig",
      url: "http://tigheclough.com",
      like: 100
    }
  
    const newBlogNoUrl= {
      title: "The meaning of everything",
      author: "Big Tig",
      like: 100
    }
  
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
  
      await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.listWithTwoBlogs.length - 1)
  })

  test('a blog can be edited', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToEdit = blogsAtStart.body[0]

    const newBlog = { likes: 10 }

    const updated = await api
          .put(`/api/blogs/${blogToEdit.id}`)
          .send(newBlog)

    assert.deepStrictEqual(updated.body.likes, 10)
  })
})


after(async () => {
  await mongoose.connection.close()
})