import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="flex justify-center gap-4">
        <Button
          color={location.pathname === "/game" ? "primary" : "inherit"}
          variant={location.pathname === "/game" ? "contained" : "text"}
          onClick={() => navigate("/game")}
        >
          Game
        </Button>
        <Button
          color={location.pathname === "/history" ? "primary" : "inherit"}
          variant={location.pathname === "/history" ? "contained" : "text"}
          onClick={() => navigate("/history")}
        >
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
