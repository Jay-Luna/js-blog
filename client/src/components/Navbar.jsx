import React, { useState } from "react";
import { Link } from 'react-router-dom';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Auth from "../utils/auth";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLoggedIn = Auth.loggedIn();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const myPost = (event) => {
    event.preventDefault();
    const { data } = Auth.getProfile();
    window.location.assign(`/profiles/${data.username}`);
  };

  const allUsers = (event) => {
    event.preventDefault();
    window.location.assign("/allusers");
  };

  const login = (event) => {
    event.preventDefault();
    window.location.assign("/login");
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JS Blog
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="drop-down"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="">Home</Link>
              </MenuItem>
              {!isLoggedIn && <MenuItem onClick={login}>Log In</MenuItem>}
              {isLoggedIn && (<div>
                <MenuItem onClick={myPost}>My Posts</MenuItem>
                <MenuItem onClick={allUsers}>All Users</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </div>)}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box >
  );
};

export default Navbar;
