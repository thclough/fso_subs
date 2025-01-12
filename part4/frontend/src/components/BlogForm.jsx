import { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleFormDataChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const addBlog = async(event) => {
    event.preventDefault()

    const res = await createBlog(formData)

    if (res) {
      setFormData({
        title: '',
        author: '',
        url: ''
      })
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          placeholder="title"
          value={formData.title}
          onChange={handleFormDataChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          placeholder="author"
          value={formData.author}
          onChange={handleFormDataChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          placeholder="url"
          value={formData.url}
          onChange={handleFormDataChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )}

BlogForm.propTypes ={
  createBlog: propTypes.func.isRequired
}


export default BlogForm