import { ArrowDown } from "lucide-react";
import ChatbotIcon from "./components/ChatbotIcon";
import { useEffect, useState } from "react";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const listModels = async () => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      const data = await response.json();
      console.log("Available Models:", data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  useEffect(() => {
    listModels();
  }, []);

  const generateBotResponse = async (history) => {
    // Transform the history to match the expected format
    const chatHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contents: chatHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeOut = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return (
    <div className="container scroll-smooth">
      <div className="relative w-[420px] overflow-hidden bg-white shadow-box rounded-2xl">
        {/* chatbot header  */}
        <div className="flex justify-between items-center bg-primary px-4 py-5">
          <div className="header-info flex items-center gap-3">
            <ChatbotIcon />
            <h2 className="logo-text text-[1.3rem] font-bold text-white">
              HelperBot
            </h2>
          </div>
          <button
            className="close-btn"
            onClick={() => handleTimeOut(setIsActive(!isActive))}
          >
            <ArrowDown
              color="white"
              className={`${
                isActive ? "translate-y-[150%]" : "translate-y-0"
              }  transition-transform duration-300 ease-in-out`}
            />
          </button>
        </div>

        {/* chatbot body  */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello there! <br /> How can I assist you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* chatbot footer  */}
        <div className="chat-footer p-3 border-t border-gray-200">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
