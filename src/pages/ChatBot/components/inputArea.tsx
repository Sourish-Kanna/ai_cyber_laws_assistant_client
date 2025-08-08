// InputArea.tsx
import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal, Mic } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface InputAreaProps {
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}

function InputArea({ onSendMessage, isSending }: InputAreaProps) {
  const theme = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const baseMessageRef = useRef("");

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = window.innerHeight * 0.1;
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, []);

  useEffect(() => {
    setMessage((prev) => {
      const base = baseMessageRef.current;
      return base ? `${base} ${transcript}` : transcript;
    });
  }, [transcript]);

  const handleMicClick = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      baseMessageRef.current = message;
      SpeechRecognition.startListening();
    }
  }, [listening, message, resetTranscript]);

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
      baseMessageRef.current = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor:
          theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
        color: theme.palette.mode === "dark" ? theme.palette.grey[400] : theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.5),
        maxWidth: "50vw",
        minWidth: "50vw",
        maxHeight: "30vh",
        minHeight: "10vh",
        transition: "all 0.2s"
      }}
    >
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type or speak your message..."
        disabled={isSending}
        style={{
          backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200],
          color:
            theme.palette.mode === "dark" ? theme.palette.grey[300] : theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          width: "100%",
          fontSize: theme.typography.body1.fontSize,
          border: "none",
          outline: "none",
          resize: "none",
          overflowY: "auto",
          maxHeight: "20vh",
          minHeight: "5vh"
        }}
      />
      <div
        style={{ display: "flex", justifyContent: "space-between", marginTop: theme.spacing(1) }}
      >
        <div style={{ display: "flex", gap: theme.spacing(1) }}>
          <IconButton
            aria-label="Attach"
            color="default"
            disabled={isSending}
            style={{
              backgroundColor:
                theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[300]
            }}
          >
            <Plus size={20} />
          </IconButton>
          {browserSupportsSpeechRecognition && (
            <IconButton
              aria-label={listening ? "Stop listening" : "Start voice input"}
              onClick={handleMicClick}
              disabled={isSending}
              style={{
                backgroundColor: listening
                  ? theme.palette.mode === "dark"
                    ? theme.palette.error.dark
                    : theme.palette.error.light
                  : theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[300]
              }}
            >
              <Mic size={20} />
            </IconButton>
          )}
        </div>
        <IconButton
          aria-label="Send"
          color="success"
          onClick={handleCreateMessage}
          disabled={isSending}
          style={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.success.dark
                : theme.palette.success.main,
            color: theme.palette.success.contrastText
          }}
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
