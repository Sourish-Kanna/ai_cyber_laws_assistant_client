import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Container, Typography, Box, TextField, Grid, Link } from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const backendUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/auth/register`, { email, password });
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    try {
      await axios.post(`${backendUrl}/auth/google`, { credential }, { withCredentials: true });
      setSuccess("Google registration successful! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch {
      setError("Google registration failed.");
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <Typography variant="h4" className="mb-4 text-green-500">
        Register
      </Typography>
      <Box component="form" onSubmit={handleRegister} className="w-full max-w-md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Typography color="primary">{success}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="mt-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google registration failed.")}
          useOneTap
        />
      </Box>
      <Typography variant="body2" className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-green-500 underline">
          Login here
        </Link>
      </Typography>
    </Container>
  );
};

export default Register;
