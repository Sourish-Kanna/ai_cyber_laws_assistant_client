"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  Paper
} from "@mui/material";

const questions = [
  {
    question: "How often do you update your passwords?",
    options: ["Monthly", "Rarely", "Only when prompted", "Never"]
  },
  {
    question: "Do you use the same password for multiple accounts?",
    options: ["Yes", "No", "Sometimes", "Only for unimportant accounts"]
  },
  {
    question: "How do you connect to public Wi-Fi?",
    options: [
      "Use a VPN",
      "Just connect without precautions",
      "Use HTTPS websites only",
      "Avoid public Wi-Fi"
    ]
  },
  {
    question: "Do you click links from unknown sources?",
    options: ["Never", "Sometimes", "Always verify first", "Yes"]
  },
  {
    question: "How do you handle software updates?",
    options: [
      "Enable auto-updates",
      "Update manually when reminded",
      "Ignore them",
      "Only update critical software"
    ]
  }
];

const CyberHealth = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const theme = useTheme();

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextClick = () => {
    if (!selectedAnswer) return;
    const updatedAnswers = [...answers, selectedAnswer];
    setAnswers(updatedAnswers);
    setSelectedAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const getHealthStatus = () => {
    const safeAnswers = ["Monthly", "No", "Use a VPN", "Never", "Enable auto-updates"];
    const score = answers.filter((a, i) => a === safeAnswers[i]).length;

    if (score === 5) return "Excellent";
    if (score >= 3) return "Good";
    return "Needs Improvement";
  };


if (showResult) {
  const status = getHealthStatus();
  const tips = {
    Excellent:
      "Continue practicing good cyber hygiene, and consider mentoring others on safe digital habits.",
    Good: "You're on the right track! Strengthen your digital defenses by regularly reviewing your cybersecurity practices.",
    "Needs Improvement":
      "Start with the basics: use strong, unique passwords and avoid untrusted links or public networks without protection."
  };

  const messages = {
    Excellent: "Outstanding! Your cybersecurity practices are top-notch.",
    Good: "Well done! You have a solid foundation in cybersecurity.",
    "Needs Improvement": "Thanks for checking in. There’s room to improve your cyber awareness."
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cyber Health Status: {status}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {messages[status]}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          Thank you for completing the Cyber Health Check. Staying informed is your first line of
          defense.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>Cyber Tip:</strong> {tips[status]}
        </Typography>
      </Paper>
    </Container>
  );
}


  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <Container maxWidth={false} sx={{ mt: 6, px: 4 }}>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Box mb={3}>
          <LinearProgress
            variant="determinate"
            value={(currentIndex / questions.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary">
            Question {currentIndex + 1} of {questions.length}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom align="left">
            {currentQuestion.question}
          </Typography>

          <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
            <RadioGroup value={selectedAnswer || ""} onChange={handleAnswerChange}>
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={<Typography variant="body1">{option}</Typography>}
                  sx={{
                    alignItems: "center",
                    ml: 0,
                    my: 1,
                    pl: 1,
                    display: "flex",
                    ".MuiTypography-root": {
                      pl: 1
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNextClick}
            disabled={!selectedAnswer}
            sx={{ px: 4, py: 1.5 }}
          >
            {isLastQuestion ? "Submit Answers" : "Next Question"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CyberHealth;
