const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// blogsRouter.post('/', async (request, response) => {
//   const blog = new Blog(request.body)

//   const savedBlog = await blog.save()
//   response.status(201).json(savedBlog)
// })

blogsRouter.post('/', async (request, response, next) => {
  try {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Boolean(body.likes) ? body.likes : 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
 } catch(exception) {
  next(exception)
 }
})

module.exports = blogsRouter