// ChatBot.tsx
import React, { useState, useEffect, useRef } from "react";
import * as components from "../components/zindex";
import { PanelLeftOpen, PanelRightOpen, Plus } from "lucide-react";
import Button from "@mui/material/Button";
import { Tooltip, Zoom } from "@mui/material";
import * as pages from "../../index.ts";
import * as chatServices from "../../Services/ChatServices.ts";
import { formatDateAndTime } from "@/helpers/commonHelper.ts";
export interface ChatSection {
  chat_section_id: number;
  title: string;
  time: string;
  date:string;
}

function ChatBot() {

//data
  const [height, setHeight] = useState(400);
  const [isOpen, setIsOpen] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);

//methods
  useEffect(() => {
    const updateHeight = () => {
      if (chatBoxRef.current) {
        setHeight(chatBoxRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const [chatSections, setChatSections] = useState<ChatSection[]>([]);

  useEffect(() => {
    const fetchChatSections = async () => {
      try {
        // const userId = "user123";
        const response = await chatServices.getAllChatSections(1);
        // console.log("response", response);
        const sections = response.data.data.map((section: any) => {
          const FormatedDate = formatDateAndTime(section.updatedAt);
          return {
            chat_section_id: section.chat_section_id,
            title: section.title,
            time: FormatedDate.time,
            date: FormatedDate.date
          };
        });

        setChatSections(sections);
      } catch (error) {
        console.error("Failed to load chat sections:", error);
      }
    };

    fetchChatSections();
  }, []);

  const handleAddChat = async() => {
    const newChat: ChatSection = {
      chat_section_id: Date.now(),
      title: "New Chat",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date:new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const payload = {
      user_id : 1,
    }
    const response = await chatServices.createChatSection(payload);
    console.log(response);
    setChatSections((prev) => [newChat, ...prev]);
  };

  const handleDeleteChat = async(id: number) => {

    const payload = {
      user_id:1,
      chat_section_id : id
    }
    // alert(id)
    const response = await chatServices.deleteChatSection(payload);
    console.log(response)
    setChatSections((prev) => prev.filter((section) => section.chat_section_id !== id));
  };

  return (
    <div
      ref={chatBoxRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div className="flex flex-row w-[100%] h-[100%] ">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden`}
          style={{ width: isOpen ? "25%" : 0 }}
        >
          <components.VirtualizedList
            height={height}
            width={300}
            chatSections={chatSections}
            onDelete={handleDeleteChat}
          />
        </div>
        <pages.ChattingPage width={isOpen ? "75%" : "100%"} />
      </div>
      <Tooltip
        title={isOpen ? "Close" : "Open"}
        placement="right-start"
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outlined"
          style={{
            position: "absolute",
            left: isOpen ? 300 : 0,
            top: "5%",
            transform: "translateY(-50%)",
            zIndex: 1,
            minWidth: "auto",
            transition: "left 0.3s ease-in-out",
            border: "none",
          }}
        >
          {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
      </Tooltip>
      <Tooltip
        title="New Chat"
        placement="right-start"
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        }}
      >
        <Button
          onClick={handleAddChat}
          variant="outlined"
          style={{
            position: "absolute",
            left: isOpen ? 300 : 0,
            top: "12%",
            transform: "translateY(-50%)",
            zIndex: 1,
            minWidth: "auto",
            transition: "left 0.3s ease-in-out",
            border: "none",
          }}
        >
          <Plus size={20} strokeWidth={3} />
        </Button>
      </Tooltip>
    </div>
  );
}

export default ChatBot;
