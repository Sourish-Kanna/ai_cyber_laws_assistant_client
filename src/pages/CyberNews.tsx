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
  CircularProgress
} from "@mui/material";

interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
}

const CyberNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://gnews.io/api/v4/search", {
        params: {
          q: "cybersecurity OR cyber attack",
          lang: "en",
          max: 10,
          token: import.meta.env.VITE_GNEWS_API_KEY
        }
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching cyber news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Cybersecurity News
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {articles.map((article, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {article.source.name} — {new Date(article.publishedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">{article.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CyberNews;
