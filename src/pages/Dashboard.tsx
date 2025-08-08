import  { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  TextField,
  useTheme
} from "@mui/material";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const theme = useTheme(); // detect theme mode

  const cyberTip =
    "Use multi-factor authentication (MFA) whenever possible to add an extra layer of security.";
  const glossaryTerm = {
    term: "Phishing",
    definition:
      "Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers."
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  // Dynamic card background color
  const cardStyle = {
    mb: 4,
    backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5"
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Live Clock */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Time
          </Typography>
          <Typography variant="body1">{currentTime.toLocaleTimeString()}</Typography>
        </CardContent>
      </Card>

      {/* Daily Cyber Awareness Quiz */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Daily Cyber Awareness Quiz
          </Typography>
          <Typography variant="body2" gutterBottom>
            What should you do if you receive an unexpected email asking for your password?
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type your answer here..."
            value={quizAnswer}
            onChange={(e) => setQuizAnswer(e.target.value)}
            sx={{
              my: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1
            }}
          />
          <Button variant="contained" onClick={handleQuizSubmit}>
            Submit Answer
          </Button>
          {quizSubmitted && (
            <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
              ✅ Great! Always be cautious and verify suspicious messages.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Cybersecurity Tip of the Week */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cybersecurity Tip of the Week
          </Typography>
          <Typography variant="body2">{cyberTip}</Typography>
        </CardContent>
      </Card>

      {/* Cyber Glossary Snippet */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cyber Glossary Snippet
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {glossaryTerm.term}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">{glossaryTerm.definition}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;
