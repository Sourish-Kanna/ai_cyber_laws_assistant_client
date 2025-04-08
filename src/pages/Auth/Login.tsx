import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container, Typography, Box, TextField, Grid, Link } from "@mui/material";

const backendUrl = import.meta.env.VITE_BASE_SERVER_URL;

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) return;

    axios
      .post(`${backendUrl}/auth/google`, { credential }, { withCredentials: true })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch(() => setError("Google login failed."));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
      localStorage.setItem("authToken", response.data.token);
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <Typography variant="h4" className="mb-4 text-green-500">
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} className="w-full max-w-md">
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
              onChange={handlePasswordChange}
              required
              className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="mt-4">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => setError("Google login failed.")}
          useOneTap
        />
      </Box>
      <Typography variant="body2" className="mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="text-green-500 underline">
          Register here
        </Link>
      </Typography>
    </Container>
  );
}

export default Login;
