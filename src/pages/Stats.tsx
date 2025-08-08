import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent,  Skeleton } from "@mui/material";
import { Security, Report, Warning, LockPerson, Timeline, MoneyOff } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface CyberStat {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactElement;
}

interface CrimeTrend {
  year: number;
  complaints: number;
  losses: number;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<CyberStat[]>([]);
  const [trendData, setTrendData] = useState<CrimeTrend[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated API call with realistic dummy data
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const dummyStats: CyberStat[] = [
          {
            title: "Daily Cyber Attacks",
            value: "30,000+",
            trend: 12.5,
            icon: <Security color="primary" fontSize="large" />
          },
          {
            title: "Annual Complaints (IC3)",
            value: "800,944",
            trend: -2.3,
            icon: <Report color="secondary" fontSize="large" />
          },
          {
            title: "Ransomware Attacks (2023)",
            value: "623.3M+",
            trend: 71.0,
            icon: <Warning color="error" fontSize="large" />
          },
          {
            title: "Phishing Attempts",
            value: "1.4M/month",
            trend: 34.1,
            icon: <LockPerson color="warning" fontSize="large" />
          }
        ];

        const dummyTrendData: CrimeTrend[] = [
          { year: 2018, complaints: 351937, losses: 27 },
          { year: 2019, complaints: 467361, losses: 35 },
          { year: 2020, complaints: 791790, losses: 42 },
          { year: 2021, complaints: 847376, losses: 69 },
          { year: 2022, complaints: 800944, losses: 103 }
        ];

        setStats(dummyStats);
        setTrendData(dummyTrendData);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ p: 3 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Skeleton variant="rectangular" height={150} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }} color="primary.main">
        Global Cybersecurity Statistics
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>{stat.icon}</Grid>
                  <Grid item>
                    <Typography variant="h6" component="div">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={stat.trend > 0 ? "error.main" : "success.main"}
                      sx={{ mt: 1 }}
                    >
                      {stat.trend > 0 ? `↑${stat.trend}%` : `↓${Math.abs(stat.trend)}%`} YoY Change
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }} color="text.secondary">
        Cyber Crime Trends (2018-2022)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Complaints Received
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="complaints" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Financial Losses ($ Billion)
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="losses" stroke="#d32f2f" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }} color="text.secondary">
        Key Cybersecurity Metrics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <MoneyOff color="success" fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">Avg. Ransom Payment</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    $1.54M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    2023 Average
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Timeline color="info" fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">Dwell Time</Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    16 Days
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Median time to detect breach
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stats;
