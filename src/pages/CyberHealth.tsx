import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Divider,
  Stack
} from "@mui/material";
import {
  Security as SecurityIcon,
  Replay as ReplayIcon,
  EmojiEvents,
  MoodBad,
  SentimentSatisfied,
  Celebration
} from "@mui/icons-material";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "Do you use two-factor authentication for your online accounts?",
    options: ["Always", "Sometimes", "Never", "I don't know what this is"],
    correctAnswer: "Always"
  },
  {
    question: "How often do you update your passwords?",
    options: ["Every 3 months", "Every 6 months", "Once a year", "Never"],
    correctAnswer: "Every 3 months"
  },
  {
    question: "How do you handle suspicious emails?",
    options: [
      "Never open them",
      "Open but don't click",
      "Click links sometimes",
      "Click links often"
    ],
    correctAnswer: "Never open them"
  },
  {
    question: "Do you use the same password for multiple accounts?",
    options: ["Never", "For unimportant accounts", "For some accounts", "For all accounts"],
    correctAnswer: "Never"
  }
];

const CyberHealth: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextClick = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const getHealthStatus = (): string => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Cyber Security Expert";
    if (percentage >= 75) return "Security Conscious";
    if (percentage >= 50) return "Average Awareness";
    return "Needs Improvement";
  };

  const getResultColor = (): string => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 75) return "success.main";
    if (percentage >= 50) return "warning.main";
    return "error.main";
  };

  const getResultIcon = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return <Celebration sx={{ fontSize: 60 }} color="success" />;
    if (percentage >= 75) return <EmojiEvents sx={{ fontSize: 60 }} color="success" />;
    if (percentage >= 50) return <SentimentSatisfied sx={{ fontSize: 60 }} color="warning" />;
    return <MoodBad sx={{ fontSize: 60 }} color="error" />;
  };

  const getResultMessage = (): string => {
    const status = getHealthStatus();
    switch (status) {
      case "Cyber Security Expert":
        return "You're a cybersecurity champion! Your habits are exemplary and you're setting a great example for others.";
      case "Security Conscious":
        return "Great job! You have strong security habits with just a few areas that could use attention.";
      case "Average Awareness":
        return "You have basic security awareness, but there are several important practices you should adopt.";
      case "Needs Improvement":
        return "Your cybersecurity habits need significant improvement. Follow our tips below to enhance your security.";
      default:
        return "Thank you for completing the assessment!";
    }
  };

  const getRecommendations = () => {
    return (
      <Box sx={{ mt: 3, textAlign: "left" }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
          <SecurityIcon color="info" sx={{ mr: 1 }} /> Security Recommendations:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Typography>Enable two-factor authentication on all important accounts</Typography>
          </li>
          <li>
            <Typography>
              Use a password manager to create and store strong, unique passwords
            </Typography>
          </li>
          <li>
            <Typography>Keep your software and devices updated regularly</Typography>
          </li>
          <li>
            <Typography>Learn to identify phishing attempts and suspicious links</Typography>
          </li>
        </ul>
      </Box>
    );
  };

  if (showResult) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
          <Stack alignItems="center" spacing={2}>
            {getResultIcon()}
            <Typography variant="h4" sx={{ color: getResultColor(), fontWeight: 700 }}>
              {getHealthStatus()}
            </Typography>
            <Chip
              label={`Score: ${score}/${questions.length}`}
              color="primary"
              sx={{ fontSize: "1.1rem", px: 2, py: 1.5 }}
            />
            <Typography variant="body1" sx={{ mt: 2, fontSize: "1.1rem" }}>
              {getResultMessage()}
            </Typography>

            <Divider sx={{ my: 3, width: "100%" }} />

            {getRecommendations()}

            <Button
              variant="contained"
              size="large"
              startIcon={<ReplayIcon />}
              onClick={() => window.location.reload()}
              sx={{ mt: 3, px: 4, py: 1.5 }}
            >
              Take Again
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
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

        <Typography variant="h5" fontWeight={600} gutterBottom>
          {currentQuestion.question}
        </Typography>

        <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
          <RadioGroup value={selectedAnswer || ""} onChange={handleAnswerChange}>
            {currentQuestion.options.map((option, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  border: selectedAnswer === option ? "2px solid #1976d2" : "1px solid #e0e0e0",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "action.hover"
                  }
                }}
              >
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={<Typography>{option}</Typography>}
                  sx={{ width: "100%", m: 0 }}
                />
              </Paper>
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleNextClick}
          disabled={!selectedAnswer}
          sx={{ py: 1.5 }}
        >
          {isLastQuestion ? "Submit Answers" : "Next Question"}
        </Button>
      </Paper>
    </Container>
  );
};

export default CyberHealth;
