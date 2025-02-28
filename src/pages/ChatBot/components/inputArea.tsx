import { Textarea } from "@/components";
import { IconButton } from "@mui/material";
import { Plus, SendHorizontal } from "lucide-react";
import { useRef, useCallback, useEffect } from "react";

function InputArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to calculate proper scroll height
    textarea.style.height = "auto";
    // Calculate heights in pixels
    const minHeight = window.innerHeight * 0.1; // 10vh
    const maxHeight = window.innerHeight * 0.3; // 20vh
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight
    );
    
    // Apply new height with smooth transition
    textarea.style.height = `${newHeight}px`;
  }, []);

  // Set initial height on mount
  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = window.innerHeight * 0.1; // 10vh
      textareaRef.current.style.height = `${initialHeight}px`;
    }
  }, []);

  return (
    <div className="relative p-2 bg-[hsl(0,0%,12%)] rounded-xl max-w-[50vw] min-w-[50vw] transition-all duration-200">
      <Textarea
        ref={textareaRef}
        onInput={handleInput}
        className="bg-[hsl(0,0%,12%)] rounded-md w-full px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 outline-none focus:ring-0 overflow-y-auto resize-none transition-all duration-200
        focus-visible:ring-0 focus-visible:ring-offset-0
        focus:ring-offset-0 focus-visible:border-0 focus-visible:outline-none "
        placeholder="Type your message here."
      />
      <div className="flex justify-between items-center mt-2">
        <IconButton 
          aria-label="Attach" 
          color="default"
          className="hover:bg-[hsl(0,0%,18%)]"
        >
          <Plus size={20} />
        </IconButton>
        <IconButton 
          aria-label="Send" 
          color="success"
          className="hover:bg-[hsl(143,85%,36%)]"
        >
          <SendHorizontal size={20} />
        </IconButton>
      </div>
    </div>
  );
}

export default InputArea;
