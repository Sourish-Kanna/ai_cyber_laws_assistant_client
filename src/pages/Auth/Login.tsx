import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Typography, Button, Box, TextField, Grid, Link } from "@mui/material";

const backendUrl = import.meta.env.VITE_BASE_SERVER_URL;

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

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
        console.log("Google login success:", response.data);
        localStorage.setItem("authToken", response.data.token);

        // Redirect to "/" after a delay
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2-second delay
      })
      .catch((error) => {
        console.error("Google login failed:", error);
      });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear any previous error
    setError("");

    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });
      console.log("Email login success:", response.data);
      localStorage.setItem("authToken", response.data.token);

      // Redirect to "/" after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000); // 2-second delay
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
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
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
