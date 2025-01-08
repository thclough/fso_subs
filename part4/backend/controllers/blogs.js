const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  // get the user
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    likes: Boolean(body.likes) ? body.likes : 0
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  
  const user = request.user

  // fetch the target blog
  const targetBlog = await Blog.findById(request.params.id)

  // see if blog user id matches user id
  if (user.id.toString() === targetBlog.user.toString()) {
    await Blog.findByIdAndDelete(targetBlog.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'you are not the creator of this blog' })
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user

  // fetch the target blog
  const targetBlog = await Blog.findById(request.params.id)

  if (user.id.toString() === targetBlog.user.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(
                          request.params.id,
                          request.body,
                          { new: true, runValidators: true, context: 'query' })
                          response.json(updatedBlog)
  } else {
    response.status(401).json({ error: 'you are not the creator of this blog' })
  }

  
})

module.exports = blogsRouter