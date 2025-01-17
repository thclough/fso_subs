const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'thclough',
        name: 'Tighe Clough',
        password: 'haystingz'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
     const locator = await page.getByTestId('login form')
     await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'thclough', 'haystingz')

      await expect(page.getByText('Tighe Clough logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'thclough', 'error')
        
      const errorDiv = await page.getByTestId('notification')
      await expect(errorDiv).toContainText('Wrong Credentials')

      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Tighe Clough logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'thclough', 'haystingz')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, {title: 'New Blog', author: 'Blog Writer', url: 'blogwrite.com' })
        await expect(page.getByText('New Blog')).toBeVisible()
      })

      describe('and a blog exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, {title: 'New Blog', author: 'Blog Writer', url: 'blogwrite.com' })
        })
        
        test('the blog can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'show details' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('the user who created the blog can delete the blog', async ({ page }) => {
          const locator = await page.getByText('New Blog by Blog Writer show')
          page.on('dialog', async dialog => {
            await dialog.accept()})

          await page.getByRole('button', { name: 'Delete' }).click()
          await expect(locator).toHaveCount(0) // converges on this so ok
        })


        describe('and there is another user who creates a couple blogs', () => {
          beforeEach(async ({ page, request }) => {
          
          // create a new user
          await request.post('/api/users', {
            data: {
              username: 'username2',
              name: 'User 2',
              password: 'pass 2'
            }
          }) 

          // log in with user for a token
          const resp = await request.post('/api/login', {
             data: {
              username: 'username2',
              password: 'pass 2'
             }})

          // console.log(await resp.json())
          const token = (await resp.json()).token

          // add blogs with authorization token

          const newBlog2 = {
            title: 'new 2',
            author: 'blogauthor2',
            url: 'blogauthor2.com',
            likes: 4
          }

          const newBlog3 = {
            title: 'new 3',
            author: 'blogauthor2',
            url: 'blogauthor2.com',
            likes: 3
          }

          await request.post('/api/blogs', { data: newBlog2, 
                                             headers: {
                                               Authorization: `Bearer ${token}`
                                             }
                                           })

          await request.post('/api/blogs', { data: newBlog3, 
                                              headers: {
                                                Authorization: `Bearer ${token}`
                                             }})
          await page.goto('/')
          })

          test('the first user canNOT delete the other blogs', async ({ page }) => {
             const locator = await page.getByText('new 2 by blogauthor2 show')
             await expect(locator).not.toContainText('Delete')
             const locator2 = await page.getByText('new 3 by blogauthor2 show')
             await expect(locator2).not.toContainText('Delete')
          })

          test('blogs are ordered by their likes in descending order', async ({ page }) => {
            // have to wait for these, sometimes locator will find northing
            await page.waitForSelector('[data-testid="blog"]', { state: 'visible' })
            const locator = await page.getByTestId("blog")
            const comp_count = await locator.count()

            let last_likes
            let cur_likes
            // loop through the blogs make sure last has >= likes than current (if there is a last)
            for (let i = 0; i < comp_count; i++) {
              const current = await locator.nth(i)
              await current.getByRole('button', { name: 'show details' }).click()
              const html = await current.innerHTML()
              const likes_match = html?.match(/likes:\s*(\d+)/)
              cur_likes = parseInt(likes_match[1])

              if (last_likes !== undefined) {
                 expect(last_likes).toBeGreaterThanOrEqual(cur_likes)
                 last_likes = cur_likes
              } else {
                last_likes = cur_likes
              }
            }
          })
        })
      })
    })
  })
})