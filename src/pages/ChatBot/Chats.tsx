// Chats.tsx
import { useEffect, useRef } from "react";
import * as pages from "../../index.ts";
import { Tooltip, CircularProgress } from "@mui/material";
import { Copy } from "lucide-react";
import "./components/index.css";

interface Messages {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  type: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  chat_section_id: number;
}

interface ChatsProps {
  messages: Messages[];
  isLoading: boolean;
  isSending: boolean;
}

function Chats({ messages, isLoading, isSending }: ChatsProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-full flex justify-center items-center text-5xl text-[#1f1f1f] ">
        Enter New Message
      </div>
    );
  }

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.message_id}>
          {message.type === "QUESTION" && (
            <div className="flex justify-end w-[100%] m-2 overflow-y-auto">
              <pages.questionArea message={message.content} />
            </div>
          )}
          {message.type === "RESPONSE" && (
            <div className="flex justify-start w-[100%] m-2">
              <div className="flex flex-col">
                <pages.responseArea message={message.content} />
                <Tooltip title="Copy">
                  <Copy className="hover:opacity-65" size={18} />
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      ))}
      {isSending && (
        <div className="flex justify-start w-[100%] m-2">
          <CircularProgress size={20} />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chats;
