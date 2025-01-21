import { useState, useEffect, useRef, useReducer } from "react";

import _ from "lodash";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlendedContext from "./context";
import Notification from "./components/Notification";
import { useQuery, useMutation } from "@tanstack/react-query";
import flashNotification from "./utils/helper";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthWrapper from "./components/AuthContext";

const App = () => {
  // INTERNAL STATES
  const notificationReducer = (state, action) => action.payload;
  const userReducer = (state, action) => action.payload;

  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    color: null,
  });

  const [user, userDispatch] = useReducer(userReducer, null);

  // accessing local storage so use an effect hook
  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ payload: user });
      blogService.setToken(user.token);
    }
  };

  useEffect(userHook, []);

  // LOG OUT

  const handleLogout = (event) => {
    userDispatch({ payload: null });
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  // BLOG FORM

  const blogForm = () => (
    <>
      <BlogForm />
    </>
  );

  // const blogFormRef = useRef();

  // const blogForm = () => (
  //   <Togglable buttonLabel="new blog">
  //     <BlogForm />
  //   </Togglable>
  // );

  // BLOGS

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>Sorry, could not load the data</div>;
  }

  const blogs = result.data;

  const sortedBlogs = _.cloneDeep(blogs).sort((a, b) => b.likes - a.likes);

  console.log("Hello");
  return (
    <Router>
      <BlendedContext.Provider
        value={[notification, notificationDispatch, user, userDispatch]}
      >
        <div>
          <h2>Blog App</h2>
          <Notification />
        </div>

        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/"
            element={
              <AuthWrapper user={user}>
                <div>
                  <p>
                    {user && user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                  </p>
                  <h2>Create Blog</h2>
                  {blogForm()}
                  <BlogList blogs={sortedBlogs} userData={user} />
                </div>
              </AuthWrapper>
            }
          />
        </Routes>
      </BlendedContext.Provider>
    </Router>
  );
};

export default App;
