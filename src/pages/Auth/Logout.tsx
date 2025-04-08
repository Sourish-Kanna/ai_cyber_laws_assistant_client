import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container, Typography } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <Typography variant="h4" className="mb-4 text-green-500">
        You have been logged out
      </Typography>
      <Button
        onClick={() => navigate("/login")}
        className="w-full max-w-xs bg-green-500 text-white hover:bg-green-600"
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default Logout;
