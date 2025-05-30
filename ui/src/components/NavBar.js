import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optionally get user info from localStorage (if stored after login)
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
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
          </Box>
          {isLoggedIn && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {user && (
                <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
                  {user.email || user.username}
                </Typography>
              )}
              <Button color="error" variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
