import React, { useState } from "react";
import { registerUser } from "../api";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await registerUser(form);
      setSuccess("Check your email to verify account");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
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
              Sign Up
            </Typography>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
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
                "Sign Up"
              )}
            </Button>
            {success && (
              <Typography color="success.main" align="center">
                {success}
              </Typography>
            )}
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Typography align="center" variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
