import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import NewspaperIcon from "@mui/icons-material/Newspaper";
// import * as pages from "./index"
import {
  AppProvider,
  Router,
  Session,
  type Navigation,
} from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  SidebarFooterProps,
  ThemeSwitcher,
} from "@toolpad/core/DashboardLayout";
// import { useDemoRouter } from "@toolpad/core/internal";
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { SearchIcon, CheckCircleIcon, MailIcon } from "lucide-react";
import Badge from "@mui/material/Badge";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
  SignInButton,
  AccountPreviewProps,
} from "@toolpad/core/Account";
import { green } from "@mui/material/colors";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import axios from "axios";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {demoTheme} from "@/Theme";

// import type { Router, Session } from "@toolpad/core/AppProvider";
// import { SidebarFooter } from "./components/ui/sidebar";

const BACKEND_API_Link = import.meta.env.VITE_BASE_SERVER_URL;
const NAVIGATION: Navigation = [
  // {
  //   kind: "header",
  //   title: "Main items"
  // },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    segment: "chatbot",
    title: "Chat Bot",
    icon: <SmartToyIcon />
  },
  {
    segment: "cybernews",
    title: "Cyber News",
    icon: <NewspaperIcon />
  },
  {
    segment: "cyberhealth",
    title: "Cyber Health",
    icon: <HealthAndSafetyIcon />
  },
  {
    segment: "community",
    title: "Community",
    icon: <CloudCircleIcon />
  },
  // {
  //   kind: "divider"
  // },
  // {
  //   kind: "header",
  //   title: "Analytics"
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "history",
  //       title: "History",
  //       icon: <DescriptionIcon />
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />
  //     }
  //   ]
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />
  // }
];

// const demoTheme = createTheme({
//   spacing: 8, 
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: {
//           main: green[500],
//           light: green[300],
//           dark: green[700],
//           contrastText: "#fff",
//         },
//       },
//     },
//     dark: {
//       palette: {
//         primary: {
//           main: green[700],
//           light: green[500],
//           dark: green[900],
//           contrastText: "#fff",
//         },
//       },
//     },
//   },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }: { pathname: string }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       <Typography>Dashboard content for {pathname}</Typography>
//     </Box>
//   );
// }

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div className="w-40">
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
              color: green,
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="medium" >
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 ,width:'25vw'}}
      />
      <NotificationBar />
      <ThemeSwitcher />
    </Stack>
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="success" />
      <Typography variant="h6">AI Chat Assistant</Typography>
      <Chip size="small" label="BETA" color="success" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

const accounts = [
  {
    id: 1,
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
    projects: [
      {
        id: 3,
        title: "Project X",
      },
    ],
  },
  {
    id: 2,
    name: "Testing MUI",
    email: "Testing1@mui.com",
    color: "#8B4513", // Brown color
    projects: [{ id: 4, title: "Project A" }],
  },
];

function SidebarFooterAccountPopover({ userData }: { userData: any }) {
  const isAnonymous = userData?.name === "Anonymous User";

  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Account
      </Typography>
      <MenuList>
        <MenuItem
          component="button"
          sx={{
            justifyContent: "flex-start",
            width: "100%",
            columnGap: 2,
          }}
        >
          <ListItemIcon>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: "0.95rem",
              }}
              src={userData.profile_img ?? ""}
              alt={userData.name ?? ""}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.png"; // Fallback image
              }}
            >
              {userData.name ? userData.name[0] : ""}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
            primary={userData.name}
            secondary={userData.email}
            primaryTypographyProps={{ variant: "body2" }}
            secondaryTypographyProps={{ variant: "caption" }}
          />
        
      {/* <Divider /> */}
      <AccountPopoverFooter>
        {isAnonymous ? (
          <SignInButton
            onClick={() => {
              // Redirect to sign-in page or trigger sign-in logic
              window.location.href = "/login"; // Example: Redirect to login page
            }}
          />
        ) : (
          <div>
          <SignOutButton />
          </div>
        )}
      </AccountPopoverFooter>
      </MenuItem>
      </MenuList>
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini]
  );
  const AppContext = React.createContext({ userData: null });
  const { userData } = React.useContext(AppContext);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: () => <SidebarFooterAccountPopover userData={userData} />,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

const NotificationBar = () => {
  return (
    <Stack spacing={2} direction="row" alignItems="center" sx={{ mr: 1 }}>
      <Tooltip 
        title="Notifications"
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10], // [horizontal, vertical] offset
              },
            },
          ],
        }}
      >
        <Badge badgeContent={4} color="success">
          <Box sx={{ color: "text.primary" }}>
            <MailIcon fontSize="small" />
          </Box>
        </Badge>
      </Tooltip>
    </Stack>
  );
};

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutAccountSidebar(props: DemoProps) {
  const { window } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(String(path)),
    };
  }, [location, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>(null);
  const [userData, setUserData] = React.useState(null);

  async function fetchUserData() {
    const authToken = localStorage.getItem("authToken");
    const userId = authToken ? parseInt(JSON.parse(authToken)) : null;

    if (!userId) {
      console.warn("User ID not found in auth token. Using anonymous user.");
      setUserData({
        name: "Anonymous User",
        email: "anonymous@example.com",
        profile_img: "/default-avatar.png", // Path to a default avatar image
      });
      setSession({
        user: {
          name: "Anonymous User",
          email: "anonymous@example.com",
          image: "/default-avatar.png",
        },
      });
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_API_Link}/users/${userId}`);
      setUserData(response.data.data);
      setSession({
        user: {
          name: response.data.data.name,
          email: response.data.data.email,
          image: response.data.data.profile_img,
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to anonymous user in case of an error
      setUserData({
        name: "Anonymous User",
        email: "anonymous@example.com",
        profile_img: "/default-avatar.png",
      });
      setSession({
        user: {
          name: "Anonymous User",
          email: "anonymous@example.com",
          image: "/default-avatar.png",
        },
      });
    }
  }

  // Fetch user data from API
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(null);
        fetchUserData(); // Moved fetchUserData() outside of setSession
        navigate("/dashboard"); // Redirect after sign in
      },
      signOut: () => {
        setSession(null);
        navigate("/logout"); // Redirect after sign out
      },
    };
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
      userData={userData}
    >
      <DashboardLayout
        slots={{
          appTitle: () => <CustomAppTitle />,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: () => <SidebarFooterAccountPopover userData={userData} />,
        }}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}
