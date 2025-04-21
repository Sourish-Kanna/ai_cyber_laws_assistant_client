// ChatBot.tsx
import React, { useState, useEffect, useRef } from "react";
import * as components from "../components/zindex";
import { PanelLeftOpen, PanelRightOpen, Plus } from "lucide-react";
import Button from "@mui/material/Button";
import { Alert, Tooltip, Zoom } from "@mui/material";
import * as pages from "../../index.ts";
import * as chatServices from "../../Services/ChatServices.ts";
import { formatDateAndTime } from "@/helpers/commonHelper.ts";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import * as routes from "../../routes.ts";

export interface ChatSection {
  chat_section_id: number;
  title: string;
  time: string;
  date: string;
}

function ChatBot() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  //data
  const [height, setHeight] = useState(400);
  const [isOpen, setIsOpen] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [chatSections, setChatSections] = useState<ChatSection[]>([]);

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

  const fetchChatSections = async () => {
    try {
      const response = await chatServices.getAllChatSections(1);
      const sections = response.data.data.map((section: any) => {
        const FormatedDate = formatDateAndTime(section.updatedAt);
        return {
          chat_section_id: section.chat_section_id,
          title: section.title,
          time: FormatedDate.time,
          date: FormatedDate.date
        };
      });
      // toast.success(`${response.data.message}`);
      setChatSections(sections);
    } catch (error) {
      console.error("Failed to load chat sections:", error);
    }
  };

  useEffect(() => {
    fetchChatSections();
  }, []);

  const handleAddChat = async () => {
    try {
      const payload = {
        user_id: 1
      };
      const response = await chatServices.createChatSection(payload);
      fetchChatSections();
      // console.log(response.data.data)
      navigate(`/chatbot/${response.data.data.chat_section_id}`);
      toast.success("Created Successfully!");
    } catch (error) {
      console.error("Error creating chat section:", error);
      toast.error("Failed to create chat section.");
    }
  };

  const handleDeleteChat = async (id: number) => {
    const payload = {
      user_id: 1,
      chat_section_id: id
    };
    // alert(id)
    const response = await chatServices.deleteChatSection(payload);
    // console.log(response);
    toast.success("Deleted Successfully !");
    setChatSections((prev) => prev.filter((section) => section.chat_section_id !== id));
  };

  return (
    <div
      ref={chatBoxRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}
    >
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div
        className={`flex flex-row w-[100%] h-[100%] ${isOpen ? "" : "justify-center items-center"}}`}
      >
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden`}
          style={{ width: isOpen ? "25%" : 0 }}
        >
          <components.VirtualizedList
            height={height}
            width={isOpen ? 300 : 0}
            chatSections={chatSections}
            onDelete={handleDeleteChat}
            onSelect={(id: number) => navigate(`/chatbot/${id}`)}
          />
        </div>
        {/* <pages.ChattingPage width={isOpen ? "75%" : "100%"} /> */}
        <div className={`w-${isOpen ? "75%" : "100%"} `}>
          <Outlet />
        </div>
      </div>
      <Tooltip
        title={isOpen ? "Close" : "Open"}
        placement="right-start"
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10]
              }
            }
          ]
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
            border: "none"
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
                offset: [0, 10]
              }
            }
          ]
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
            border: "none"
          }}
        >
          <Plus size={20} strokeWidth={3} />
        </Button>
      </Tooltip>
    </div>
  );
}

export default ChatBot;
