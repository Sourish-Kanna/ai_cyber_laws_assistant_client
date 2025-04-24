import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";

const BACKEND_API_Link = import.meta.env.VITE_BASE_SERVER_URL;

interface UserData {
  name: string;
  email: string;
  profile_img: string;
  phone_no: string | null;
  username: string;
  age: number | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");
      const userId = authToken ? parseInt(JSON.parse(authToken)) : null;

      if (!userId) {
        console.error("User ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_API_Link}/users/${userId}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.background.default,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4, width: "80%" }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.background.paper,
              borderRadius: 2,
              p: 4,
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: theme.shadows[3],
            }}
          >
            <Avatar
              src={userData?.profile_img || ""}
              alt="Profile"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {userData?.name || "Guest"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData?.email || "guest@example.com"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Account Info */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.background.paper,
              borderRadius: 2,
              p: 4,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Account Info
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Name"
                  secondary={userData?.name || "N/A"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={userData?.email || "N/A"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Username"
                  secondary={userData?.username || "N/A"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Phone Number"
                  secondary={userData?.phone_no || "N/A"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Age"
                  secondary={userData?.age || "N/A"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Account Created At"
                  secondary={
                    new Date(userData?.createdAt || "").toLocaleString() || "N/A"
                  }
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Last Updated At"
                  secondary={
                    new Date(userData?.updatedAt || "").toLocaleString() || "N/A"
                  }
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Account Status"
                  secondary={userData?.status ? "Active" : "Inactive"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
