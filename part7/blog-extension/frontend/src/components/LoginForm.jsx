import BlendedContext from "../context";
import { useContext, useState } from "react";
import loginService from "../services/login";
import flashNotification from "../utils/helper";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const [, notificationDispatch, user, userDispatch] =
    useContext(BlendedContext);

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
      navigate("/");
    } catch (exception) {
      console.log(exception);
      flashNotification(
        "Wrong Credentials",
        "error",
        5000,
        notificationDispatch,
      );
    }
  };

  return (
    <div>
      <h2>log in to blog application</h2>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
        data-testid="login form"
      >
        <div>
          <TextField required label="Username" name="Username" />
        </div>
        <div>
          <TextField
            required
            label="Password"
            name="Password"
            type="password"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
