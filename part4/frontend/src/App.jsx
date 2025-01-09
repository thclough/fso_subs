import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


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
    <div style={notStyle}>
      {message}
    </div>
  )
}

const BlogList = ({ blogs }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')
  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  }) 

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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create(formData)
      setBlogs(blogs.concat(returnedBlog))
      showMessage(`${returnedBlog.title} by ${returnedBlog.author} added`, 'green')
    } catch(error) {
      console.log(error)
      showMessage(`${error.message}:${error.response.data.error}`, 'red')
    }

  } 

  const handleFormDataChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //       <div>
  //         <label htmlFor="title">title:</label> 
  //         <input 
  //           id="title"
  //           name="title"
  //           value={formData.title}
  //           onChange={handleFormDataChange}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="author">author:</label> 
  //         <input 
  //           id="author"
  //           name="author"
  //           value={formData.author}
  //           onChange={handleFormDataChange}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="url">url:</label> 
  //         <input 
  //           id="url"
  //           name="url"
  //           value={formData.url}
  //           onChange={handleFormDataChange}
  //         />
  //       </div>
  //       <button type="submit">save</button>
  //     </form>
  // )

  const blogHook = () => {
    blogService
    .getAll()
    .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }

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


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageColor={messageColor}/>
      {user === null ?
        <LoginForm submitAction={handleLogin} usernameVal={username} usernameFunc={setUsername} passwordVal={password} passwordFunc={setPassword}/> :
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
        <BlogForm submitAction={addBlog} formData={formData} formDataHandler={handleFormDataChange} />
        <BlogList blogs={blogs}/>
        </div>
        }
    </div>
  )
}

export default App