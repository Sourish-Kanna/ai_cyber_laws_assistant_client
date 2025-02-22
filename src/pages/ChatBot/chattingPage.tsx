import { Copy } from "lucide-react";
import * as pages from "../../index.ts";
import { IconButton, Tooltip } from "@mui/material";

interface chattingPageProps {
  width?: String;
}

function chattingPage({ width = "75%" }: chattingPageProps) {
  return (
    <div
      className={`w-[${width}] m-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col max-w-[50vw] min-w-[50vw]">
        <div className="flex justify-end w-[100%] m-2">
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
      <pages.inputArea />
    </div>
  );
}

export default chattingPage;
