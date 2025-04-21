// InputArea.tsx
import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface InputAreaProps {
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}

function InputArea({ onSendMessage, isSending }: InputAreaProps) {
  const theme = useTheme(); // Access the MUI theme
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = window.innerHeight * 0.1;
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, []);

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const minHeight = window.innerHeight * 0.1;
    const maxHeight = window.innerHeight * 0.3;
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${newHeight}px`;
  }, []);

  const handleCreateMessage = async () => {
    if (!message.trim() || isSending) return;
    try {
      await onSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.5),
        maxWidth: "50vw",
        minWidth: "50vw",
        maxHeight: "30vh",
        minHeight: "10vh",
        // overflowY: "auto",
        transition: "all 0.2s",
      }}
    >
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type your message here."
        disabled={isSending}
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          width: "100%",
          // padding: theme.spacing(1.5),
          fontSize: theme.typography.body1.fontSize,
          border: "none",
          outline: "none",
          resize: "none",
          overflowY: "auto",
          maxHeight: "20vh",
          minHeight: "5vh",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: theme.spacing(1) }}>
        <IconButton
          aria-label="Attach"
          color="default"
          disabled={isSending}
          style={{
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <Plus size={20} />
        </IconButton>
        <IconButton
          aria-label="Send"
          color="success"
          onClick={handleCreateMessage}
          disabled={isSending}
          style={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
          }}
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
