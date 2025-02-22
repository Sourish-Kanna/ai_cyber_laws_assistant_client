import React, { useState, useEffect, useRef } from "react";
import * as components from "../components/zindex";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import Button from "@mui/material/Button";
import { Tooltip, Zoom } from "@mui/material";
import * as pages from "../../index.ts";

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
    <>
      <div
        ref={chatBoxRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <div className="flex flex-row w-[100%] h-[100%]">
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden`}
            style={{ width: isOpen ? "25%" : 0 }}
          >
            <components.VirtualizedList
              height={height}
              width={300}
              // itemSize={50}
              itemCount={100}
              overscanCount={10}
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
                  offset: [0, 10], // [horizontal, vertical] offset
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
      </div>
    </>
  );
}

export default ChatBot;
