import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Box, TextField, Grid, Link, Button } from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AppProvider } from "@toolpad/core/AppProvider";
import { demoTheme } from "@/Theme";

const backendUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${backendUrl}/auth/register`, { email, name });
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse; // Extract the ID token
    if (credential) {
      // console.log(`ID Token: ${credential}`); // Log the ID token
      try {
        const response = await axios.post(
          `${backendUrl}/auth/google`,
          { credential },
          { withCredentials: true }
        );
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => (window.location.href = "/"), 2000);
      } catch (err: any) {
        setError(err.response?.data?.message || "Google login failed.");
      }
    } else {
      setError("Google login failed: No credential received.");
    }
  };

  return (
    <AppProvider theme={demoTheme}>
      <Container className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h4" className="mb-4">
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} className="w-full max-w-md mt-4 mb-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  backgroundColor: "#00C853",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#00B44D" },
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setError("Google login failed.")}
          />
        <Typography variant="body2" className="mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login here
          </Link>
        </Typography>
      </Container>
    </AppProvider>
  );
};

export default Register;
