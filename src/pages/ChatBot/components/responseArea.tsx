// import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useTheme } from "@mui/material/styles";

interface ResponseAreaProps {
  message: string;
}

function ResponseArea({ message }: ResponseAreaProps) {
  const theme = useTheme(); // Access the MUI theme

  return (
    <div
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "hsl(0,0%,15%)" : "hsl(0,0%,95%)", // Dark and light mode background
        color: theme.palette.text.primary, // Adapt text color to the theme
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: "75%",
        wordBreak: "break-word",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              style={{
                fontSize: theme.typography.h4.fontSize,
                fontWeight: theme.typography.fontWeightBold,
                marginBottom: theme.spacing(2),
                marginTop: theme.spacing(3),
              }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              style={{
                fontSize: theme.typography.h5.fontSize,
                fontWeight: theme.typography.fontWeightBold,
                marginBottom: theme.spacing(1.5),
                marginTop: theme.spacing(2),
              }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              style={{
                fontSize: theme.typography.h6.fontSize,
                fontWeight: theme.typography.fontWeightMedium,
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(1.5),
              }}
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              style={{
                color: theme.palette.success.main, // Use theme's success color
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: theme.spacing(3),
                marginBottom: theme.spacing(1.5),
              }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{
                listStyleType: "decimal",
                paddingLeft: theme.spacing(3),
                marginBottom: theme.spacing(1.5),
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: theme.spacing(0.5),
                wordBreak: "break-word",
              }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                marginBottom: theme.spacing(1.5),
                lineHeight: theme.typography.body1.lineHeight,
                wordBreak: "break-word",
              }}
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              style={{
                backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#f5f5f5", // Code block background
                padding: theme.spacing(0.5),
                borderRadius: theme.shape.borderRadius,
                fontSize: theme.typography.body2.fontSize,
                wordBreak: "break-word",
              }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              style={{
                backgroundColor: theme.palette.mode === "dark" ? "#2d2d2d" : "#f5f5f5", // Pre block background
                padding: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                overflowX: "auto",
                wordBreak: "break-word",
              }}
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              style={{
                color: theme.palette.success.main, // Use theme's success color for links
                textDecoration: "underline",
                wordBreak: "break-word",
              }}
              {...props}
            />
          ),
        }}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
}

export default ResponseArea;
