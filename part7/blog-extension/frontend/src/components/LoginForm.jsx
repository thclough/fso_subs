import propTypes from "prop-types";
import BlendedContext from "../context";
import { useContext, useState } from "react";
import loginService from "../services/login";
import flashNotification from "../utils/helper";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [, notificationDispatch, user, userDispatch] =
    useContext(BlendedContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: event.target.Username.value,
        password: event.target.Password.value,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      userDispatch({ payload: user });
      blogService.setToken(user.token);
      console.log("Here");
      navigate("/");
    } catch (exception) {
      console.log(exception);
      flashNotification("Wrong Credentials", "red", 5000, notificationDispatch);
    }
  };

  return (
    <div>
      <h2>log in to blog application</h2>
      <form onSubmit={handleLogin} data-testid="login form">
        <div>
          username
          <input type="text" name="Username" data-testid="Username" />
        </div>
        <div>
          password
          <input type="password" name="Password" data-testid="Password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
