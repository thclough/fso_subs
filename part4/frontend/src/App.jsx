import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import _ from 'lodash'

const Notification = ({ message, messageColor }) => {
  if (message === null) {
    return null
  }

  // adjustable message color
  const notStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={notStyle} data-testid='notification'>
      {message}
    </div>
  )
}

const BlogList = ({ blogs, onLikeClick, onDelete, userData }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLikeClick={onLikeClick} onDelete={onDelete} userData={userData}/>
      )}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const showMessage = (message, color) => {
    setMessageColor(color)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('Wrong Credentials', 'red')
    }
  }

  const handleLogout = event => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showMessage(`${returnedBlog.title} by ${returnedBlog.author} added`, 'green')
      return true
    } catch(error) {
      showMessage(`${error.message}:${error.response.data.error}`, 'red')
      return false
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  // decorator functions to access state variable blogs
  const incrementLike = (id) => {
    const internalFunc = async () => {
      // find the blog and increment
      const blog = blogs.find(b => b.id.toString() === id)
      const blogNoId = { title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        user: blog.user.id }
      const res = await blogService.addOneLike(blogNoId, id)
      // edit blogs
      setBlogs(prevBlogs => prevBlogs.map(b => b.id === id ? res : b ))
    }
    return internalFunc
  }

  const deleteBlog = (id) => {
    const internalFunc = async () => {
      const blog = blogs.find(b => b.id.toString() === id)
      const auth = window.confirm(`Remove ${blog.title} by ${blog.author || 'anonymous'}`)
      if (auth) {
        await blogService.del(id)
        // edit blogs
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== id))
      }
    }
    return internalFunc
  }

  const blogHook = () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }

  // accessing local storage so use an effect hook
  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(blogHook, [])
  useEffect(userHook, [])

  const sortedBlogs = _.cloneDeep(blogs).sort((a,b) => b.likes - a.likes)
  // console.log("hello", sortedBlogs.sort())

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageColor={messageColor}/>
      {user === null ?
        <LoginForm submitAction={handleLogin} usernameVal={username} usernameFunc={setUsername} passwordVal={password} passwordFunc={setPassword}/> :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <h2>Create Blog</h2>
          {blogForm()}
          <BlogList blogs={sortedBlogs} onLikeClick={incrementLike} onDelete={deleteBlog} userData={user}/>
        </div>
      }
    </div>
  )
}

export default App