import { useState } from 'react'

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
        <div className={'.hideableContent'}>
      url: {blog.url && <>{blog.url}</>}<br/>
      likes: {blog.likes} <button onClick={onLikeClick(blog.id)}>like</button>
        </div>
      )
    }
  }

  const buttonLabel = (showDetails ? 'hide' : 'show' )+ ' details'

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author && <>{blog.author}</>} <button onClick={toggleShowDetails}>{buttonLabel}</button>
      {blogDetails(blog)}
      <br></br>
      {blog.user.username === userData.username ?
        <button onClick={onDelete(blog.id)}>Delete</button> : null}
    </div>
  )
}

export default Blog