const BlogForm = ({ submitAction, formData, formDataHandler }) => (
    <form onSubmit={submitAction}>
        <div>
          <label htmlFor="title">title:</label> 
          <input 
            id="title"
            name="title"
            value={formData.title}
            onChange={formDataHandler}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label> 
          <input 
            id="author"
            name="author"
            value={formData.author}
            onChange={formDataHandler}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label> 
          <input 
            id="url"
            name="url"
            value={formData.url}
            onChange={formDataHandler}
          />
        </div>
        <button type="submit">save</button>
      </form>
  )

 export default BlogForm