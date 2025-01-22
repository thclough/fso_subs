const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const _ = require("lodash");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  // get the user
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    comments: [],
    likes: Boolean(body.likes) ? body.likes : 0,
  });

  const savedBlog = await blog.save();

  // concat blogs to user
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const savedBlogJoin = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.status(201).json(savedBlogJoin);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    // fetch the target blog
    const targetBlog = await Blog.findById(request.params.id);

    // see if blog user id matches user id
    if (user.id.toString() === targetBlog.user.toString()) {
      await Blog.findByIdAndDelete(targetBlog.id);
      response.status(204).end();
    } else {
      response
        .status(401)
        .json({ error: "you are not the creator of this blog" });
    }
  }
);

blogsRouter.patch(
  "/:id/comments",
  middleware.userExtractor,
  async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!updatedBlog)
      return response.status(404).json({ message: "Blog not found" });
    response.json(updatedBlog);
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  // fetch the target blog
  const targetBlog = await Blog.findById(request.params.id);

  // this confirms it is the same user or adding a like
  if (
    user.id.toString() === targetBlog.user.toString() ||
    request.body.likes - targetBlog.likes === 1
  ) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true, context: "query" }
    );

    const populatedBlog = await updatedBlog.populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(populatedBlog);
  } else {
    response.status(401).json({
      error: "you are not the creator of this blog and cannot edit this field",
    });
  }
});

module.exports = blogsRouter;
