import React, { useRef, useEffect } from "react";
import style from "./ChatMessages.module.scss";
import { ChatMessage } from "../ChatMessage/ChatMessage";

interface ChatMessagesProps {
  messages: string[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
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
        />
      ))}
    </div>
  );
};
