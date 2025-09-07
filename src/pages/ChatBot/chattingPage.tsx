// chattingPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as chatServices from "../../Services/ChatServices";
import { chat_bot_prompt } from "../../helpers/Prompt";
import * as pages from "../../index.ts";
// import { CircularProgress } from "@mui/material";

interface Message {
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

function ChattingPage() {
  const { chat_section_id } = useParams<{ chat_section_id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const chatSectionId = chat_section_id ? parseInt(chat_section_id, 10) : null;
  const auth_token = localStorage.getItem("authToken");

  const fetchMessages = async () => {
    try {
      const payload = {
        user_id: auth_token ? parseInt(auth_token, 10) : 0,
        chat_section_id: chatSectionId
      };
      const response = await chatServices.get_messages(payload);
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!chatSectionId) return;

    setIsSending(true);
    try {
      const modified_message = chat_bot_prompt.replace("{user_query}", messageContent.trim()).replace("{user_role}", "unknown");

      const payload = {
        message: modified_message,
        user_message: messageContent
      };

      const params = {
        user_id: auth_token ? parseInt(auth_token, 10) : 0,
        chat_section_id: chatSectionId
      };

      await chatServices.create_message(params, payload);
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (chatSectionId) {
      fetchMessages();
    }
  }, [chatSectionId]);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-4">
      <div className="flex-1 max-w-[50vw] min-w-[50vw] overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden hide-scrollbar">
          <pages.Chats messages={messages} isLoading={isLoading} isSending={isSending} />
        </div>
      </div>
      <div className="mt-4">
        <pages.InputArea onSendMessage={handleSendMessage} isSending={isSending} />
      </div>
    </div>
  );
}

export default ChattingPage;
