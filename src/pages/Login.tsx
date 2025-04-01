import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import { Container, Typography, Button, Box, TextField, Grid, Link } from "@mui/material";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    const decoded = decodeJwt(credential);
    console.log("Decoded JWT:", decoded);

    axios
      .get("http://localhost:8001/api/v1/login/verify", {
        headers: { Authorization: `Bearer ${credential}` },
        withCredentials: true,
      })
      .then((response) => {
        console.log("User verified:", response.data);
      })
      .catch((error) => {
        console.error("Verification failed:", error);
      });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any previous error
    setError("");

    try {
      const response = await axios.post("http://localhost:8001/api/v1/login", {
        email,
        password,
      });
      console.log("Login Successful:", response.data);
      // Store the token or handle post-login logic here
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
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
        height: "100vh", // Full screen height to center content vertically
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Login Form */}
      <Box component="form" onSubmit={handleLogin} sx={{ width: "100%", mt: 2 }}>
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

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Google Login - Centered */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login failed")}
          useOneTap
        />
      </Box>

      {/* Register Link */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
