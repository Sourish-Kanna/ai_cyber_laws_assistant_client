import React, { useState } from "react";
import { useGoogleLogin  } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Grid, Link, Button } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { demoTheme } from "@/Theme";


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

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      try {
        const response = await axios.post(
          `${backendUrl}/auth/google`,
          { access_token },
          { withCredentials: true }
        );
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => navigate("/"), 2000);
      } catch {
        setError("Google login failed.");
      }
    },
    onError: () => setError("Google login failed."),
    flow: "implicit",
  });

  return (
    <AppProvider theme={demoTheme}>
    <Container className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h4" className="mb-4">
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} className="w-full max-w-md mt-4">
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
          <Button type="submit" fullWidth variant="contained" 
          sx={{
            mt: 2,  
            fontWeight: 'bold',  
            backgroundColor: '#00C853',
            color: '#fff',  
            '&:hover': {backgroundColor: '#00B44D',},
            }}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="mt-4 mb-4">
          <Button
            variant="outlined"
            onClick={() => login()}
            fullWidth
            startIcon={
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                style={{ height: 20, width: 20 }}
              />
            }
            sx={{
              textTransform: "none",
              backgroundColor: "#fff",
              color: "#000",
              borderColor: "#ccc",
              '&:hover': {
                backgroundColor: "#f7f7f7",
                borderColor: "#aaa",
              },
            }}
          >
            Sign in with Google
        </Button>
      </Box>
      <Typography variant="body2" className="mt-4">
        Don't have an account?{" "}
        <Link href="/register" className="underline">
          Register here
        </Link>
      </Typography>
    </Container>
    </AppProvider>
  );
}

export default Login;
