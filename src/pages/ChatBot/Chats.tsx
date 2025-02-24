import React from "react";
import * as pages from "../../index.ts";
import { Tooltip } from "@mui/material";
import { Copy } from "lucide-react";
import './components/index.css'

function Chats() {
  return (
    <div>
      <div className="flex justify-end w-[100%] m-2 overflow-y-auto">
        <pages.questionArea />
        {/* <Copy /> */}
      </div>
      <div className="flex justify-start w-[100%] m-2">
        <div className="flex flex-col ">
          <pages.responseArea />
          {/* <IconButton aria-label="Copy" color="default"> */}
          <Tooltip title="Copy">
            <Copy className="hover:opacity-65" size={18} />
          </Tooltip>
          {/* </IconButton> */}
        </div>
      </div>
    </div>
  );
}

export default Chats;
