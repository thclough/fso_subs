import Blog from "./Blog";

const BlogList = ({ blogs, userData }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} userData={userData} />
      ))}
    </div>
  );
};

export default BlogList;
