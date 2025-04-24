import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, Divider, TextField, useTheme } from "@mui/material";
import { motion } from "framer-motion";

function Dashboard() {
  const theme = useTheme(); // Access the app's theme
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

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

  useEffect(() => {
    const timeout = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <Box
      sx={{
        p: 4,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Animated Welcome Message */}
        {/* {showWelcome ? ( */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: theme.palette.success.main,
          }}
            >
          Welcome Back to Your Cyber Dashboard!
            </Typography>
          </motion.div>
        
      <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Time
          </Typography>
          <Typography variant="body1">{currentTime.toLocaleTimeString()}</Typography>
        </CardContent>
      </Card>

      {/* Daily Cyber Awareness Quiz */}
      <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
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
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            onClick={handleQuizSubmit}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Submit Answer
          </Button>
          {quizSubmitted && (
            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.success.main }}>
              ✅ Great! Always be cautious and verify suspicious messages.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Cybersecurity Tip of the Week */}
      <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cybersecurity Tip of the Week
          </Typography>
          <Typography variant="body2">{cyberTip}</Typography>
        </CardContent>
      </Card>

      {/* Cyber Glossary Snippet */}
      <Card sx={{ backgroundColor: theme.palette.background.paper }}>
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