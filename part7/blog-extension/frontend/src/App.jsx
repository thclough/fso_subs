import { useState, useEffect, useRef, useReducer } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { Container } from "@mui/material";

import BlendedContext from "./context";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import AuthWrapper from "./components/AuthContext";
import Togglable from "./components/Togglable";
import UserTable from "./components/UserTable";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";

import flashNotification from "./utils/helper";

import blogService from "./services/blogs";
import userService from "./services/users";

import NavBar from "./components/Navigate";

import _ from "lodash";

const App = () => {
  // INTERNAL STATES
  const notificationReducer = (state, action) => action.payload;
  const userReducer = (state, action) => action.payload;

  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    severity: null,
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

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm aRef={blogFormRef} />
    </Togglable>
  );

  // Fetching Data
  const blogResult = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    retry: 1,
  });

  const userResult = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    retry: 1,
  });

  if (blogResult.isLoading) {
    return <div>loading blog data...</div>;
  } else if (blogResult.isError) {
    return <div>Sorry, could not load the blog data</div>;
  }

  const blogs = blogResult.data;

  const sortedBlogs = _.cloneDeep(blogs).sort((a, b) => b.likes - a.likes);

  if (userResult.isLoading) {
    return <div>loading user data...</div>;
  } else if (userResult.isError) {
    return <div>Sorry, could not load the user data</div>;
  }

  const users = userResult.data;

  // pages

  const dashboardPage = () => (
    <AuthWrapper user={user}>
      <div>
        <h2>Create Blog</h2>
        {blogForm()}
        <BlogList blogs={sortedBlogs} userData={user} />
      </div>
    </AuthWrapper>
  );

  const navHeader = () => {
    const padding = {
      padding: 5,
    };
    const margin = {
      margin: 5,
    };
    return (
      <>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {user === null ? null : (
          <>
            {user.name} logged in
            <button style={margin} onClick={handleLogout}>
              logout
            </button>
          </>
        )}
      </>
    );
  };

  const usersPage = () => {
    return (
      <AuthWrapper user={user}>
        <h2>Users</h2>
        <UserTable users={users} />
      </AuthWrapper>
    );
  };

  const userView = () => (
    <AuthWrapper user={user}>
      <UserView users={users} />
    </AuthWrapper>
  );

  const blogView = () => (
    <AuthWrapper user={user}>
      <BlogView blogs={blogs} />
    </AuthWrapper>
  );

  return (
    <Container>
      <Router>
        <BlendedContext.Provider
          value={[notification, notificationDispatch, user, userDispatch]}
        >
          <div>
            {<NavBar />}
            <Notification />
          </div>

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={dashboardPage()} />
            <Route path="/users" element={usersPage()} />
            <Route path="/users/:id" element={userView()} />
            <Route path="/blogs/:id" element={blogView()} />
          </Routes>
        </BlendedContext.Provider>
      </Router>
    </Container>
  );
};

export default App;
