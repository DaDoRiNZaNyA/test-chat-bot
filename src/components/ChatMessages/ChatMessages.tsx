import React, { useRef, useEffect } from "react";
import style from "./ChatMessages.module.scss";
import { ChatMessage } from "../ChatMessage/ChatMessage";

interface ChatMessagesProps {
  messages: string[];
  stopBot: () => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, stopBot }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={style.ChatMessages} ref={chatContainerRef}>
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          message={msg.slice(5)}
          isBot={msg.startsWith("Bot:")}
          isTyping={msg === "Bot: Bot is typing..."}
          stopBot={stopBot}
          showStopButton={index === messages.length - 1}
        />
      ))}
    </div>
  );
};
