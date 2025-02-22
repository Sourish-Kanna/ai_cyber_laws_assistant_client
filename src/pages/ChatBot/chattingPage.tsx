import * as pages from "../../index.ts";

interface chattingPageProps {
  width?: String;
}

function chattingPage({ width = "75%" }: chattingPageProps) {
  return (
    <div
      className={`w-[${width}] m-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col max-w-[50vw] min-w-[50vw]">
        <div className="flex justify-end w-[100%]">
          <pages.questionArea />
        </div>
        <div className="flex justify-start w-[100%]">
          <pages.responseArea />
        </div>
      </div>
      <pages.inputArea />
    </div>
  );
}

export default chattingPage;
