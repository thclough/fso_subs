import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import BlendedContext from "../context";
import flashNotification from "../utils/helper";

const Blog = ({ blog, userData }) => {
  // put in a like click
  const [showDetails, setShowDetails] = useState(false);

  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(BlendedContext);

  const blogDeleteMutation = useMutation({
    mutationFn: blogService.del,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id),
      );
    },
    onError: (error) => {
      flashNotification(
        `${error.notification}:${error.response.data.error}`,
        "red",
        5000,
        dispatch,
      );
    },
  });

  const incrementLikeMutation = useMutation({
    mutationFn: ({ blogNoIdPlain, id }) =>
      blogService.addOneLike(blogNoIdPlain, id),
    onSuccess: (res) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id === res.id ? res : b)),
      );
    },
  });

  const deleteBlog = () => {
    const auth = window.confirm(
      `Remove ${blog.title} by ${blog.author || "anonymous"}`,
    );
    if (auth) {
      blogDeleteMutation.mutate(blog.id);
    }
  };

  const incrementLike = () => {
    const { id, ...blogNoIdMerged } = blog;
    const blogNoIdPlain = { ...blogNoIdMerged, user: blog.user.id };
    incrementLikeMutation.mutate({ blogNoIdPlain, id });
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogDetails = (blog) => {
    if (showDetails) {
      return (
        <div className={".hideableContent"}>
          url: {blog.url && <>{blog.url}</>}
          <br />
          likes: {blog.likes}{" "}
          <button onClick={() => incrementLike()}>like</button>
        </div>
      );
    }
  };

  const buttonLabel = (showDetails ? "hide" : "show") + " details";

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} by {blog.author && <>{blog.author}</>}{" "}
      <button onClick={toggleShowDetails}>{buttonLabel}</button>
      {blogDetails(blog)}
      <br></br>
      {blog.user.username === userData.username ? (
        <button onClick={() => deleteBlog()}>Delete</button>
      ) : null}
    </div>
  );
};

export default Blog;
