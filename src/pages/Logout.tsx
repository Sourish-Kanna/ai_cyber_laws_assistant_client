import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session data from localStorage or cookies
    localStorage.removeItem("authToken"); // or clear cookies if used
    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        You have been logged out
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Go to Login
      </Button>
    </Container>
  );
};

export default Logout;
