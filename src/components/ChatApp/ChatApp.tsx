import React, { useState } from "react";
import { ChatMessages } from "../ChatMessages/ChatMessages";
import { MessageInput } from "../MessageInput/MessageInput";
import style from "./ChatApp.module.scss";
import axios from "axios";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = async (message: string) => {
    const newMessage = `You: ${message}`;
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const typingMessage = `Bot: Bot is typing...`;
    setMessages((prevMessages) => [...prevMessages, typingMessage]);

    const botResponse = await fetchBotResponse(message);

    if (botResponse) {
      setMessages((prevMessages) => {
        const typingMessageIndex = prevMessages.lastIndexOf(typingMessage);
        if (typingMessageIndex !== -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages.splice(typingMessageIndex, 1, `Bot: ${botResponse}`);
          return updatedMessages;
        } else {
          return [...prevMessages, `Bot: ${botResponse}`];
        }
      });
    } else {
      console.error("Error fetching bot response");
    }
  };

  const fetchBotResponse = async (message: string): Promise<string | null> => {
    try {
      const response = await axios.post(
        "http://185.46.8.130/api/v1/chat/send-message",
        { message },
        {
          responseType: "arraybuffer",
        }
      );

      const chunks = new Uint8Array(response.data);
      const botResponseChunks: string[] = [];
      let currentChunk = "";

      for (const chunk of chunks) {
        if (chunk === 123) {
          currentChunk = String.fromCharCode(chunk);
        } else if (chunk === 125) {
          currentChunk += String.fromCharCode(chunk);
          botResponseChunks.push(currentChunk);
          currentChunk = "";
        } else {
          currentChunk += String.fromCharCode(chunk);
        }
      }

      const botResponse = botResponseChunks
        .map((chunk) => JSON.parse(chunk).value)
        .join("");

      return botResponse;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return null;
    }
  };

  return (
    <div className={style.ChatApp}>
      <h1 className={style.title_up}>Bot Chat</h1>
      <p className={style.title_down}>AI-based service</p>
      <ChatMessages messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
