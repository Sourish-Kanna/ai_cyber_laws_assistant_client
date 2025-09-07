// chattingPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as chatServices from "../../Services/ChatServices";
import { chat_bot_prompt } from "../../helpers/Prompt";
import * as pages from "../../index.ts";

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

const formatChatHistory = (messages: Message[], currentUserId: number): string => {
  if (!messages || messages.length === 0) {
    return "No previous conversation.";
  }
  return messages
    .map((msg) => {
      const prefix = msg.sender_id === currentUserId ? "User:" : "AI:";
      return `${prefix} ${msg.content}`;
    })
    .join("\n");
};

function ChattingPage() {
  const { chat_section_id } = useParams<{ chat_section_id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const chatSectionId = chat_section_id ? parseInt(chat_section_id, 10) : null;
  const auth_token = localStorage.getItem("authToken");
  const currentUserId = auth_token ? parseInt(auth_token, 10) : 0;

  const fetchMessages = async () => {
    if (!chatSectionId || !currentUserId) {
        setIsLoading(false);
        return;
    }
    try {
      const payload = {
        user_id: currentUserId,
        chat_section_id: chatSectionId,
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
    if (!chatSectionId || !messageContent.trim()) return;

    // 1. Optimistic UI Update: Display the user's message immediately.
    const optimisticMessage: Message = {
      message_id: Date.now(), // Use a temporary unique ID
      sender_id: currentUserId,
      content: messageContent.trim(),
      createdAt: new Date().toISOString(),
      // --- (add other necessary fields with default/placeholder values)
      conversation_id: 0, 
      type: "text",
      status: true,
      updatedAt: new Date().toISOString(),
      chat_section_id: chatSectionId,
    };
    
    // Add the new message to the state before sending the request
    const previousMessages = messages;
    setMessages(prevMessages => [...prevMessages, optimisticMessage]);

    setIsSending(true);
    try {
      // 2. Format history from the state *before* the optimistic update
      const chatHistory = formatChatHistory(previousMessages, currentUserId);
      
      // 3. Dynamically set user role
      const userRole = previousMessages.length > 0 ? "individual" : "unknown";

      // 4. Construct the full prompt with history
      const modified_message = chat_bot_prompt
        .replace("{chat_history}", chatHistory)
        .replace("{user_query}", messageContent.trim())
        .replace("{user_role}", userRole);

      const payload = {
        message: modified_message,
        user_message: messageContent.trim(),
      };

      const params = {
        user_id: currentUserId,
        chat_section_id: chatSectionId,
      };
      
      // 5. Send to backend and re-fetch to sync with the database
      await chatServices.create_message(params, payload);
      await fetchMessages();

    } catch (error) {
      console.error("Error sending message:", error);
      // Optional: Handle error, e.g., show an error icon on the message
      setMessages(previousMessages); // Revert optimistic update on failure
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
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