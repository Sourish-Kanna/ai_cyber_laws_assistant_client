import React, { useState, useEffect, useRef } from "react";
import * as components from "./components/zindex";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import Button from "@mui/material/Button";

function ChatBot() {
  const [height, setHeight] = useState(400);
  const [isOpen, setIsOpen] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={chatBoxRef} style={{ width: "100%", height: "100%" }}>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={{ width: isOpen ? 300 : 0 }}
      >
        <components.VirtualizedList
          height={height}
          width={300}
          itemSize={50}
          itemCount={100}
          overscanCount={10}
        />
      </div>
      <Button onClick={() => setIsOpen(!isOpen)} variant="outlined">
        Primary
        {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
      </Button>
    </div>
  );
}

export default ChatBot;
