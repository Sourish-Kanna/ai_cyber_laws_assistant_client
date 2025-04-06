// InputArea.tsx
import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface InputAreaProps {
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}

function InputArea({ onSendMessage, isSending }: InputAreaProps) {
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
    <div className="relative p-2 bg-[hsl(0,0%,12%)] rounded-xl max-w-[50vw] min-w-[50vw] transition-all duration-200">
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="bg-[hsl(0,0%,12%)] rounded-md w-full px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 outline-none focus:ring-0 overflow-y-auto resize-none transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 focus-visible:border-0 focus-visible:outline-none"
        placeholder="Type your message here."
        disabled={isSending}
      />
      <div className="flex justify-between items-center mt-2">
        <IconButton
          aria-label="Attach"
          color="default"
          className="hover:bg-[hsl(0,0%,18%)]"
          disabled={isSending}
        >
          <Plus size={20} />
        </IconButton>
        <IconButton
          aria-label="Send"
          color="success"
          className="hover:bg-[hsl(143,85%,36%)]"
          onClick={handleCreateMessage}
          disabled={isSending}
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
