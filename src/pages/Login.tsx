import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";

function Login() {
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

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box sx={{ mt: 2 }}>
        <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login failed")} useOneTap />
      </Box>
    </Container>
  );
}

export default Login;
