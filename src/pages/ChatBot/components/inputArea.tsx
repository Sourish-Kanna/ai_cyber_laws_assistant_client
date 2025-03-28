import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal, Mic } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";

interface InputAreaProps {
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}

function InputArea({ onSendMessage, isSending }: InputAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const messageRef = useRef("");

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const results = event.results;
        let transcript = "";
        for (let i = event.resultIndex; i < results.length; i++) {
          const result = results[i];
          transcript += result[0].transcript;
        }
        setMessage((prev) => prev + transcript);
        messageRef.current += transcript;
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", (event as any).error);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (messageRef.current.trim()) {
          handleCreateMessage(messageRef.current);
          setMessage("");
          messageRef.current = "";
        }
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser");
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

  const handleCreateMessage = async (msg: string) => {
    if (!msg.trim() || isSending) return;
    try {
      await onSendMessage(msg);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setMessage("");
      messageRef.current = "";
      recognitionRef.current.start();
      setIsListening(true);
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
        <div className="flex gap-2">
          <IconButton
            aria-label="Attach"
            color="default"
            className="hover:bg-[hsl(0,0%,18%)]"
            disabled={isSending}
          >
            <Plus size={20} />
          </IconButton>
          <IconButton
            aria-label={isListening ? "Stop recording" : "Start recording"}
            color="default"
            className="hover:bg-[hsl(0,0%,18%)]"
            onClick={handleToggleListening}
            disabled={isSending}
          >
            <Mic size={20} color={isListening ? "#ff0000" : "white"} />
          </IconButton>
        </div>
        <IconButton
          aria-label="Send"
          color="success"
          className="hover:bg-[hsl(143,85%,36%)]"
          onClick={() => handleCreateMessage(message)}
          disabled={isSending}
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
