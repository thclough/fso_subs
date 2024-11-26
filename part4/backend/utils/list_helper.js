var _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, curVal) => accum + curVal.likes, 0);
}

const favoriteBlog = (blogs) => {
  const maxItem = blogs.reduce((maxBlog, blog) => {
    return blog.likes > maxBlog.likes ? blog : maxBlog
  }, { likes: -Infinity })

  return blogs.length === 0
    ? null
    : maxItem
}

const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author')
    const res = Object.entries(authorCounts).reduce((maxPair, [auth, numBlogs]) => {
        const res = (maxPair === null) || numBlogs > maxPair.blogs 
            ? {author: auth, blogs: numBlogs}
            : maxPair
        return res
        }, null)
    return res
}

const mostLikes = (blogs) => {
    var mapped = _.reduce(blogs, (result, blog) => {
        result[blog.author] = result.get(blog.author) || 0 + blog.likes
        return result;
    }, new Map())
    const res = Object.entries(mapped).reduce((maxPair, [auth, numLikes]) => {
        const res = (maxPair === null) || numLikes > maxPair.likes
            ? {author: auth, likes: numLikes}
            : maxPair
        return res
        }, null)
    return res
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }



