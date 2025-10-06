import { ArrowUp } from "lucide-react";
import { useRef } from "react";

const ChatForm = ({ setChatHistory, chatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((History) => [
      ...History,
      { role: "user", text: userMessage },
    ]);

    // set thiking for the bot

    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),

      //Generating Bot response
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]),
      600
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="chat-form flex items-center gap-2 w-full"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        required
        className="flex-1 h-12 border-2 border-primary/30 rounded-full px-4 text-[0.9rem] outline-none focus:border-primary transition-all ease-in-out duration-200"
      />
      <button
        type="submit"
        className="p-3 bg-primary rounded-full hover:bg-secondary transition-all ease-in-out duration-200 flex items-center justify-center cursor-pointer"
      >
        <ArrowUp color="white" size={20} />
      </button>
    </form>
  );
};
export default ChatForm;
