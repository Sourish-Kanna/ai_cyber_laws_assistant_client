import React from "react";

interface ResponseAreaProps {
  message: string;
}

function responseArea({ message }: ResponseAreaProps) {
  //interface

  //data

  //useEffect

  //methods

  return (
    <div className="bg-[hsl(0,0%,15%)] p-3 rounded-md mb-4 max-w-[75%]">
      {message}
    </div>
  );
}

export default responseArea;
