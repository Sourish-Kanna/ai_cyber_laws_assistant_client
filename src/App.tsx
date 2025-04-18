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
  AccountPreviewProps,
} from "@toolpad/core/Account";
import { green } from "@mui/material/colors";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {demoTheme} from "@/Theme";

// import type { Router, Session } from "@toolpad/core/AppProvider";
// import { SidebarFooter } from "./components/ui/sidebar";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "chatbot",
    title: "Chat Bot",
    icon: <SmartToyIcon />,
  },
  {
    segment:"cybernews",
    title:"CyberNews",
    icon:<NewspaperIcon/>
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "history",
        title: "History",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
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

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

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

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
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
                  bgcolor: account.color,
                }}
                src={account.image ?? ""}
                alt={account.name ?? ""}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: "body2" }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
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
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
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

const demoSession = {
  user: {
    name: "Testing",
    email: "Testing@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

export default function DashboardLayoutAccountSidebar(props: DemoProps) {
  const { window } = props;

  // const [pathname, setPathname] = React.useState("/dashboard");

  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(String(path)),
    };
  }, [location, navigate]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
        navigate("/dashboard"); // Redirect after sign in
      },
      signOut: () => {
        setSession(null);
        navigate("/logout"); // Redirect after sign out
      },
    };
  }, []);

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
