import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogView = ({ blogs }) => {
  const blogId = useParams().id;
  const blog = blogs.find((b) => b.id === blogId);
  const likes = blog.likes;
  const likesForm = likes === 1 ? "like" : "likes";
  const queryClient = useQueryClient();

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

  const incrementLike = (blog) => {
    const { id, ...blogNoIdMerged } = blog;
    const blogNoIdPlain = { ...blogNoIdMerged, user: blog.user.id };
    incrementLikeMutation.mutate({ blogNoIdPlain, id });
  };

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    const curComments = blog.comments.concat(comment);
    const res = await blogService.editComments(curComments, blogId);
    return res;
  };

  const editCommentsMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (res) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id === res.id ? res : b)),
      );
    },
  });

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} {likesForm}{" "}
      <button onClick={() => incrementLike(blog)}>like</button>
      <br />
      added by {blog.user.username}
      <h3>Comments</h3>
      <form onSubmit={(e) => editCommentsMutation.mutate(e)}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
