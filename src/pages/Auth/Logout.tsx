import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { demoTheme } from "@/Theme";
import { Bounce, ToastContainer, toast } from "react-toastify";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Logout Done Successfully!");
    localStorage.removeItem("authToken");
  }, []);

  return (
    <AppProvider theme={demoTheme}>
      <Container className="flex flex-col items-center justify-center h-screen">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
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
            "&:hover": { backgroundColor: "#00B44D" }
          }}
        >
          Go to Login
        </Button>
      </Container>
    </AppProvider>
  );
};

export default Logout;
