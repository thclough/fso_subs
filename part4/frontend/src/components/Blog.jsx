import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onLikeClick, onDelete, userData }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogDetails = (blog) => {
    if (showDetails) {
      return (
        <div>
      author: {blog.author && <>{blog.author}</>}<br/>
      url: {blog.url && <>{blog.url}</>}<br/>
      likes: {blog.likes} <button onClick={onLikeClick(blog.id)}>like</button>
        </div>
      )
    }
  }

  const buttonLabel = (showDetails ? 'hide' : 'show' )+ ' details'

  return (
    <div style={blogStyle}>
      <b>title:</b> {blog.title} <button onClick={toggleShowDetails}>{buttonLabel}</button>
      {blogDetails(blog)}
      <br></br>
      {blog.user.username === userData.username ?
        <button onClick={onDelete(blog.id)}>Delete</button> : null}
    </div>
  )
}

export default Blog