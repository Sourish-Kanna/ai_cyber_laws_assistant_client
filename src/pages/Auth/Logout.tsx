import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { demoTheme } from "@/Theme";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  return (
    <AppProvider theme={demoTheme}>
    <Container className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h4" sx={{ mb: 4 }}>
        You have been logged out
      </Typography>
      <Button
          onClick={() => navigate("/login")}
          // fullWidth
          variant="contained"
          sx={{
            mt: 2,
            fontWeight: "bold",
            backgroundColor: "#00C853",
            color: "#fff",
            "&:hover": { backgroundColor: "#00B44D" },
          }}
        >
        Go to Login
      </Button>
    </Container>
    </AppProvider>
  );
};

export default Logout;
