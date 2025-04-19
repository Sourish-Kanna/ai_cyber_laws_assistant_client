import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box
} from "@mui/material";
import { keyframes } from "@emotion/react";

interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage?: string;
}

// Define scrolling animation (slower speed, infinite effect)
const scrollAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const CyberNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: "cybersecurity OR cyber attack",
          language: "en",
          pageSize: 30,
          apiKey: "2d666387864d400f90c610591acd27b3"
        }
      });

      const articles = response.data.articles;
      setArticles(articles); // Store all articles
    } catch (error) {
      console.error("Error fetching cyber news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (articles.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" align="center">
          No news available at the moment. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Cybersecurity News
      </Typography>

      {/* Top Dynamic Scroll Section */}
      <Typography variant="h6" gutterBottom>
        Latest News
      </Typography>

      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          mb: 4,
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#333", // Dark background for better visibility
          p: 2,
          height: 50, // Increased height for better readability
          boxShadow: 2 // Slight shadow to make the bar stand out
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            minWidth: "100%",
            animation: `${scrollAnimation} 60s linear infinite`, // Slower animation speed for smooth scroll
            willChange: "transform"
          }}
        >
          {articles.slice(0, 5).map((article, idx) => (
            <Box
              key={idx}
              sx={{
                display: "inline-block",
                minWidth: "300px",
                mx: 3, // Added horizontal margin for spacing between news items
                paddingRight: "15px" // Padding for better alignment
              }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "16px" // Larger font size for better readability
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    "&:hover": { color: "#ffcc00" }, // Hover effect
                    display: "inline-block"
                  }}
                >
                  {article.title}
                </Typography>
              </a>
              <Typography variant="caption" color="text.secondary" sx={{ color: "#bbb" }}>
                {article.source.name} — {new Date(article.publishedAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {articles.slice(0, 4).map((article, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6
                    }
                  }}
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ width: "100%", height: 180, objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Side Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Hot Topics
          </Typography>
          <Grid container spacing={2}>
            {articles.slice(4, 8).map((article, idx) => (
              <Grid item xs={12} key={idx}>
                <Card
                  sx={{
                    display: "flex",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 4
                    }
                  }}
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ width: 100, height: "100%", objectFit: "cover" }}
                    />
                  )}
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {article.title}
                    </Typography>
                    <Button
                      size="small"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CyberNews;
