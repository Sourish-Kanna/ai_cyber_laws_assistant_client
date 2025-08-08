import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
  LinearProgress,
  Snackbar,
  Alert,
  Tooltip,
  Switch,
  FormControlLabel,
  Box
} from "@mui/material";
import {
  Refresh,
  Fullscreen,
  FullscreenExit,
  LightMode,
  DarkMode,
  Info
} from "@mui/icons-material";
import CountUp from "react-countup";

interface AttackMapProps {
  initialSource?: "checkpoint" | "kaspersky" | "digitalattack";
  theme?: "light" | "dark";
}

const AttackMap = ({ initialSource = "checkpoint", theme = "light" }: AttackMapProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [stats, setStats] = useState({
    attacks: 2489123,
    countries: 184,
    threats: 93451
  });

  const threatMapSources: Record<string, string> = {
    checkpoint: "https://threatmap.checkpoint.com/",
    kaspersky: "https://cybermap.kaspersky.com/",
    digitalattack: "https://digitalattackmap.com/"
  };

  useEffect(() => {
    const simulateDataUpdate = setInterval(() => {
      setStats((prev) => ({
        attacks: prev.attacks + Math.floor(Math.random() * 1000),
        countries: prev.countries,
        threats: prev.threats + Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(simulateDataUpdate);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSourceChange = (source: "checkpoint" | "kaspersky" | "digitalattack") => {
    setSelectedSource(source);
    handleRefresh();
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box
      sx={{
        height: isFullscreen ? "100vh" : "100%",
        overflowY: "auto",
        bgcolor: darkMode ? "background.default" : "background.default",
        p: 2
      }}
    >
      <Card
        sx={{
          height: isFullscreen ? "100%" : "auto",
          transition: "all 0.3s ease",
          bgcolor: darkMode ? "background.default" : "background.default"
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold" color="primary">
              Live Cyber Threat Intelligence Dashboard
            </Typography>
          }
          subheader="Real-time global cyber attack visualization"
          action={
            <Box>
              <Tooltip title="Refresh Data">
                <IconButton onClick={handleRefresh}>
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                <IconButton onClick={handleFullscreen}>
                  {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
              </Tooltip>
            </Box>
          }
        />

        <CardContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleThemeChange}
                    icon={<LightMode />}
                    checkedIcon={<DarkMode />}
                  />
                }
                label={darkMode ? "Dark Mode" : "Light Mode"}
              />
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {(
                  Object.keys(threatMapSources) as Array<
                    "checkpoint" | "kaspersky" | "digitalattack"
                  >
                ).map((source) => (
                  <button
                    key={source}
                    onClick={() => handleSourceChange(source)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: selectedSource === source ? "#1976d2" : "#e0e0e0",
                      color: selectedSource === source ? "white" : "black",
                      border: "none",
                      cursor: "pointer",
                      textTransform: "capitalize"
                    }}
                  >
                    {source}
                  </button>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? "grey.800" : "grey.800",
                  transition: "background 0.3s ease"
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  <Info sx={{ verticalAlign: "middle", mr: 1 }} />
                  Live Statistics
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="caption">Attacks</Typography>
                    <Typography variant="h6">
                      <CountUp end={stats.attacks} duration={2} separator="," />
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption">Countries</Typography>
                    <Typography variant="h6">
                      <CountUp end={stats.countries} duration={2} />
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption">Active Threats</Typography>
                    <Typography variant="h6">
                      <CountUp end={stats.threats} duration={2} separator="," />
                    </Typography>
                  </div>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {loading && <LinearProgress color="secondary" />}

          <Box
            sx={{
              position: "relative",
              height: isFullscreen ? "calc(100vh - 280px)" : 450,
              borderRadius: 2,
              overflow: "hidden",
              border: darkMode ? "1px solid #424242" : "1px solid #e0e0e0"
            }}
          >
            <iframe
              src={threatMapSources[selectedSource]}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                filter: darkMode ? "invert(0.9)" : "none"
              }}
              title="Live Cyber Attack Map"
              onLoad={() => setLoading(false)}
              onError={() => setError("Failed to load threat map")}
            />
          </Box>

          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttackMap;
