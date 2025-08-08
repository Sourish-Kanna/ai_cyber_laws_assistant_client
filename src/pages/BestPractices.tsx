import { Card, Typography } from "@mui/material";

// const SecurityChecklist = () => (
//   <Card sx={{ p: 3, textAlign: "center" }}>
//     <Typography variant="h5" gutterBottom>
//       Global Threat Level
//     </Typography>
//     <Stack alignItems="center">
//       <CircularProgress
//         variant="determinate"
//         value={75}
//         size={150}
//         thickness={4}
//         sx={{
//           "& .MuiCircularProgress-circle": {
//             strokeLinecap: "round"
//           },
//           color: (theme) => theme.palette.error.main
//         }}
//       />
//       <Typography variant="h4" sx={{ mt: 2 }} color="error.main">
//         HIGH
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         Increased ransomware activity detected
//       </Typography>
//     </Stack>
//   </Card>
// );
import { useState, useCallback, useEffect } from "react";
import {
  Slider,
  TextField,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Alert,
  Tooltip,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff, ContentCopy } from "@mui/icons-material";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

// Configure zxcvbn
zxcvbnOptions.setOptions({
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary
  }
});

interface PasswordOptions {
  length: number;
  useUpper: boolean;
  useLower: boolean;
  useNumbers: boolean;
  useSpecial: boolean;
}

const SecurityChecklist = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>({
    length: 12,
    useUpper: true,
    useLower: true,
    useNumbers: true,
    useSpecial: true
  });
  const [entropy, setEntropy] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  // Password generation function
  const generatePassword = useCallback(() => {
    const chars = {
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lower: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      special: "!@#$%^&*()_+-=[]{}|;:',./<>?"
    };

    let charSet = "";
    if (passwordOptions.useUpper) charSet += chars.upper;
    if (passwordOptions.useLower) charSet += chars.lower;
    if (passwordOptions.useNumbers) charSet += chars.numbers;
    if (passwordOptions.useSpecial) charSet += chars.special;

    let newPassword = "";
    for (let i = 0; i < passwordOptions.length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      newPassword += charSet[randomIndex];
    }

    setPassword(newPassword);
  }, [passwordOptions]);

  // Calculate password entropy
  const calculateEntropy = useCallback(
    (password: string) => {
      const charSetSize = [
        passwordOptions.useUpper ? 26 : 0,
        passwordOptions.useLower ? 26 : 0,
        passwordOptions.useNumbers ? 10 : 0,
        passwordOptions.useSpecial ? 32 : 0
      ].reduce((a, b) => a + b, 0);

      return password.length * Math.log2(charSetSize || 1);
    },
    [passwordOptions]
  );

  // Analyze password strength using zxcvbn
  useEffect(() => {
    const result = zxcvbn(password);
    setStrength(result.score);
    setFeedback([
      ...result.feedback.suggestions,
      ...(result.feedback.warning ? [result.feedback.warning] : [])
    ]);
    setEntropy(calculateEntropy(password));
  }, [password, calculateEntropy]);

  return (
    <Card sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Advanced Password Analyzer
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </FormControl>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button variant="contained" color="secondary" onClick={generatePassword} fullWidth>
              Generate Password
            </Button>
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={() => navigator.clipboard.writeText(password)}>
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Password Length: {passwordOptions.length}</FormLabel>
            <Slider
              value={passwordOptions.length}
              min={8}
              max={64}
              onChange={(_, value) =>
                setPasswordOptions((prev) => ({
                  ...prev,
                  length: Array.isArray(value) ? value[0] : value
                }))
              }
              valueLabelDisplay="auto"
            />
          </FormControl>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={passwordOptions.useUpper}
                  onChange={(e) =>
                    setPasswordOptions((prev) => ({ ...prev, useUpper: e.target.checked }))
                  }
                />
              }
              label="A-Z"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={passwordOptions.useLower}
                  onChange={(e) =>
                    setPasswordOptions((prev) => ({ ...prev, useLower: e.target.checked }))
                  }
                />
              }
              label="a-z"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={passwordOptions.useNumbers}
                  onChange={(e) =>
                    setPasswordOptions((prev) => ({ ...prev, useNumbers: e.target.checked }))
                  }
                />
              }
              label="0-9"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={passwordOptions.useSpecial}
                  onChange={(e) =>
                    setPasswordOptions((prev) => ({ ...prev, useSpecial: e.target.checked }))
                  }
                />
              }
              label="!@#"
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Security Metrics
        </Typography>

        <LinearProgress
          variant="determinate"
          value={(strength + 1) * 20}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: strength === 4 ? "#4caf50" : strength >= 2 ? "#ff9800" : "#f44336"
            }
          }}
        />

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="body2">
              Strength Rating:{" "}
              {["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"][strength]}
            </Typography>
            <Typography variant="body2">Entropy: {entropy.toFixed(1)} bits</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              Crack Time: {["instant", "seconds", "minutes", "hours", "years"][strength]}
            </Typography>
            <Typography variant="body2">Length: {password.length} characters</Typography>
          </Grid>
        </Grid>

        {feedback.length > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Security Recommendations:</Typography>
            <ul>
              {feedback.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Box>
    </Card>
  );
};

export default SecurityChecklist;

