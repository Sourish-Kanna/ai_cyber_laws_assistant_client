import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Link,
} from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const backendUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(`${backendUrl}/auth/register`, {
        email,
        password: password,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    try {
      const response = await axios.post(`${backendUrl}/auth/google`, { credential }, { withCredentials: true });
      localStorage.setItem("authToken", response.data.token);
      setSuccess("Google registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Google registration failed.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      {/* Registration Form */}
      <Box component="form" onSubmit={handleRegister} sx={{ width: "100%", mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
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
            <Button variant="contained" type="submit" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Google Sign-Up */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Sign Up failed")}
          useOneTap
        />
      </Box>

      {/* Login Link */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
