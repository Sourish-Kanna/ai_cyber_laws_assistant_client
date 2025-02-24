// chattingPage.tsx
import { Copy } from "lucide-react";
import * as pages from "../../index.ts";
import { IconButton, Tooltip } from "@mui/material";
import "./components/index.css";

interface chattingPageProps {
  width?: String;
}

function chattingPage({ width = "75%" }: chattingPageProps) {
  return (
    <div
      className={`w-[${width}] h-full flex flex-col justify-between items-center p-4`}
    >
      <div className="flex-1 max-w-[50vw] min-w-[50vw] overflow-hidden ">
        <div className="h-full overflow-y-auto overflow-x-hidden hide-scrollbar">
          <pages.Chats />
        </div>
      </div>
      <div className="mt-4">
        <pages.inputArea />
      </div>
    </div>
  );
}

export default chattingPage;
