import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";
import * as chatServices from "../../../Services/ChatServices";
import { chat_bot_prompt } from "../../../helpers/Prompt";
import { useParams } from "react-router-dom";

function InputArea() {
  //interface

  //data
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { chat_section_id } = useParams<{ chat_section_id: string }>();
  const user_id = 1;
  const chatSectionId = chat_section_id ? parseInt(chat_section_id, 10) : null;
  const [message, setMessage] = useState("");

  // UseEffects
  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = window.innerHeight * 0.1; // 10vh
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, []);

  //methods
  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to calculate proper scroll height
    textarea.style.height = "auto";
    // Calculate heights in pixels
    const minHeight = window.innerHeight * 0.1; // 10vh
    const maxHeight = window.innerHeight * 0.3; // 20vh
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

    // Apply new height with smooth transition
    textarea.style.height = `${newHeight}px`;
  }, []);

  const handle_create_message = async () => {
    const modified_message = chat_bot_prompt.replace("{user_query}", message.trim());
    console.log("modified_message", modified_message);
    const payload = {
      message: modified_message,
      user_message : message,
    };

    const params = {
      user_id:1,
      chat_section_id: chatSectionId
    };
    setMessage("");
    const response = await chatServices.create_message(params, payload);
  };

  return (
    <div className="relative p-2 bg-[hsl(0,0%,12%)] rounded-xl max-w-[50vw] min-w-[50vw] transition-all duration-200">
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="bg-[hsl(0,0%,12%)] rounded-md w-full px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 outline-none focus:ring-0 overflow-y-auto resize-none transition-all duration-200
        focus-visible:ring-0 focus-visible:ring-offset-0
        focus:ring-offset-0 focus-visible:border-0 focus-visible:outline-none "
        placeholder="Type your message here."
      />
      <div className="flex justify-between items-center mt-2">
        <IconButton aria-label="Attach" color="default" className="hover:bg-[hsl(0,0%,18%)]">
          <Plus size={20} />
        </IconButton>
        <IconButton
          aria-label="Send"
          color="success"
          className="hover:bg-[hsl(143,85%,36%)]"
          onClick={handle_create_message}
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
