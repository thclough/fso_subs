const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {

    test('of empty list that has zero likes', () => {
        const result = listHelper.totalLikes(helper.emptyList)
        assert.strictEqual(result, 0)
    })
  
    test('when list has only one blog, equals the likes of that one blog', () => {
      const result = listHelper.totalLikes(helper.listWithOneBlog)
      assert.strictEqual(result, helper.listWithOneBlog[0].likes)
    })


    test('of many blogs', () => {
    const result = listHelper.totalLikes(helper.listWithManyBlogs)
    assert.strictEqual(result, 36)
    })

  })

describe('favorite blog', () => {

    test('when there is no blog should be null', () => {
        const result = listHelper.favoriteBlog(helper.emptyList)
        assert.strictEqual(result, null)
    })
    
    test('when list has only one blog, that is the favorite blog', () => {
      const result = listHelper.favoriteBlog(helper.listWithOneBlog)
      assert.deepStrictEqual(result, helper.listWithOneBlog[0])
    })

    test('when list has many blogs, should be last blog in this case', () => {
      const result = listHelper.favoriteBlog(helper.listWithManyBlogs)
      assert.deepStrictEqual(result, helper.listWithManyBlogs[2])
    })
})

describe('most prolific blogger', () => {
    
    test('of no blogs, should be null', () => {
        const result = listHelper.mostBlogs(helper.emptyList)
        assert.strictEqual(result, null)
    })

    test('of multiple blog posts', () => {
        const result = listHelper.mostBlogs(helper.listWithManyBlogs)
        assert.deepStrictEqual(result, {author: "Robert C. Martin", blogs: 3})
    })
})

describe('most liked blogger', () => {
    
    test('of no blogs, should be null', () => {
        const result = listHelper.mostLikes(helper.emptyList)
        assert.strictEqual(result, null)
    })

    test('of multiple blog posts', () => {
        const result = listHelper.mostLikes(helper.listWithManyBlogs)
        assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 12})
    })

})