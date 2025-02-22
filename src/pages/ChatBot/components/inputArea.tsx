import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal } from "lucide-react";

function inputArea() {
  return (
    <div className="p-2 bg-[hsl(0,0%,12%)] rounded-xl max-w-[50vw] min-w-[50vw] bg-transparent">
      <Textarea
        className="bg-[hsl(0,0%,12%)] h-[5vh] rounded-md min-h-[60px] w-full px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 outline-none focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Type your message here."
      />
      <div className="flex justify-between ">
        <IconButton aria-label="Plus" color="default">
          <Plus />
        </IconButton>
        <IconButton aria-label="Plus" color="success">
          <SendHorizontal />
        </IconButton>
      </div>
    </div>
  );
}

export default inputArea;
