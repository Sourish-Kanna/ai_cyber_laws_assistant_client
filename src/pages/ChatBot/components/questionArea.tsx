import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface QuestionAreaProps {
  message: string;
}

function QuestionArea({ message }: QuestionAreaProps) {
  return (
    <div className="bg-[#1c261a] p-4 mr-3 rounded-md mb-4 max-w-[75%] text-white">
      {/* <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3 mt-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-2 mt-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 mt-2" {...props} />,
          strong: ({ node, ...props }) => <strong className="text-[#86c232]" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-3" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-3" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
          code: ({ node, ...props }) => (
            <code className="bg-gray-800 p-1 rounded text-sm" {...props} />
          ),
          a: ({ node, ...props }) => <a className="text-[#86c232] underline" {...props} />
        }}
      > */}
        {message}
      {/* </ReactMarkdown> */}
    </div>
  );
}

export default QuestionArea;
