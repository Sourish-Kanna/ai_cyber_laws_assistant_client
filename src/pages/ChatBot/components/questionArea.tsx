// import React from "react";
import { useTheme } from "@mui/material/styles";

interface QuestionAreaProps {
  message: string;
}

function QuestionArea({ message }: QuestionAreaProps) {
  const theme = useTheme(); // Access the MUI theme

  return (
    <div
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "hsl(0,0%,15%)" : "hsl(0,0%,95%)", // Dark mode and light mode background colors
        color: theme.palette.text.primary, // Adapt text color to the theme
        padding: theme.spacing(2), // Consistent padding
        marginRight: theme.spacing(2), // Consistent margin
        borderRadius: theme.spacing(2), // More rounded corners
        marginBottom: theme.spacing(2), // Spacing between messages
        maxWidth: "75%", // Limit the width of the message box
        wordWrap: "break-word", // Ensure long words break to the next line
        alignSelf: "center", // Center the message box in the flex container
      }}
    >
      {message}
    </div>
  );
}

export default QuestionArea;
