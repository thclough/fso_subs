import { useState, useContext } from "react";
import propTypes from "prop-types";
import BlendedContext from "../context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import flashNotification from "../utils/helper";

const BlogForm = ({ aRef }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(BlendedContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      if (aRef !== null) {
        aRef.current.toggleVisibility();
      }
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      flashNotification(
        `${newBlog.title} by ${newBlog.author} added`,
        "green",
        5000,
        dispatch,
      );
      setFormData({
        title: "",
        author: "",
        url: "",
      });
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

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addBlog = (event) => {
    event.preventDefault();

    const res = newBlogMutation.mutate(formData);
  };

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
  );
};

export default BlogForm;
