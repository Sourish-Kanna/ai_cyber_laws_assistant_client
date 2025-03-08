import React, { useEffect, useState } from "react";
import * as pages from "../../index.ts";
import { Tooltip } from "@mui/material";
import { Copy } from "lucide-react";
import "./components/index.css";
import * as chatServices from "../../Services/ChatServices.ts";
import { Params, useParams } from "react-router-dom";

function Chats() {
  //interface
  interface messages {
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

  //data
  const [all_message, setAllMessage] = useState<messages[]>([]);
  const { chat_section_id } = useParams<{ chat_section_id: string }>();
  const user_id = 1;
  const chatSectionId = chat_section_id ? parseInt(chat_section_id, 10) : null;

  //use Effects
  useEffect(() => {
    fetch_all_messages();
  }, [chatSectionId]);

  //methods
  const fetch_all_messages = async () => {
    try {
      const payload = {
        user_id,
        chat_section_id: chatSectionId
      };
      const response = await chatServices.get_messages(payload);
      setAllMessage(response.data.data as messages[]);

      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching messages!", error);
    }
  };
  return (
    <div>
      {all_message?.map((message) => (
        <div key={message.message_id}>
        {message.type === 'QUESTION' &&(
          <div className="flex justify-end w-[100%] m-2 overflow-y-auto">
            <pages.questionArea message={message.content}/>
          </div>
        )}
        {message.type === 'RESPONSE' &&(
          <div className="flex justify-start w-[100%] m-2">
            <div className="flex flex-col">
              <pages.responseArea message={message.content}/>
              <Tooltip title="Copy">
                <Copy className="hover:opacity-65" size={18} />
              </Tooltip>
            </div>
          </div>
        )}
        </div>
      ))}
    </div>
  );
}

export default Chats;
