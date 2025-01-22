import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BlendedContext from "../context";
import blogService from "../services/blogs";

const NavBar = () => {
  const [, , user, dispatch] = useContext(BlendedContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    dispatch({ payload: null });
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link) => {
    navigate(link);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "grey", color: "white" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleClose("/")}>Blogs</MenuItem>
            <MenuItem onClick={() => handleClose("/users")}>Users</MenuItem>
          </Menu>
          {user && (
            <Button
              color="inherit"
              sx={{ marginLeft: "auto" }}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
