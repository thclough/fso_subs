const loginWith = async (page, username, password)  => {
    await page.getByTestId('Username').fill(username)
    await page.getByTestId('Password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  const createBlog = async (page, content) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title').fill(content.title)
    await page.getByLabel('author').fill(content.author)
    await page.getByLabel('url').fill(content.url)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(content.title).waitFor()
  }
  
  export { loginWith, createBlog }