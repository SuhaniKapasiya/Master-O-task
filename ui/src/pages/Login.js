import React, { useState, useEffect } from "react";
import { loginUser } from "../api";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    window.sendFlutterAlert = (msg) => {
      if (window.FlutterChannel && window.FlutterChannel.postMessage) {
        window.FlutterChannel.postMessage(
          JSON.stringify({ action: "showAlert", message: msg })
        );
      }
    };
    return () => {
      delete window.sendFlutterAlert;
    };
  }, []);

  useEffect(() => {
    window.receiveFromFlutter = (data) => {
      alert("Received from Flutter: " + data);
    };
    return () => {
      delete window.receiveFromFlutter;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/game");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
            width: 1,
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              align="center"
              fontWeight={600}
            >
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Typography align="center" variant="body2">
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
