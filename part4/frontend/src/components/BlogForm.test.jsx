import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {

  const testFormData = {
    title: 'The Resolution of the Bitcoin Experiment',
    author: 'Mike Hearn',
    url: 'https://blog.plan99.net/the-resolution-of-the-bitcoin-experiment-dabb30201f7'
  }

  let container
  let mockCreateBlog

  beforeEach(() => {

    mockCreateBlog = vi.fn()

    container = render(<BlogForm createBlog={mockCreateBlog} />).container
  })

  test('create blog handler called with correct props', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('save')

    await user.type(titleInput, testFormData.title)
    await user.type(authorInput, testFormData.author)
    await user.type(urlInput, testFormData.url)
    await user.click(createButton)

    expect(mockCreateBlog.mock.calls[0][0]).toStrictEqual(testFormData)
  })

})