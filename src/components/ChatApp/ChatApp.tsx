import React, { useState } from "react";
import { ChatMessages } from "../ChatMessages/ChatMessages";
import { MessageInput } from "../MessageInput/MessageInput";
import style from "./ChatApp.module.scss";
import axios, { CancelTokenSource } from "axios";

import { fetchBotResponse, stopBot, wait } from "../../api";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentCancelTokenSource, setCurrentCancelTokenSource] =
    useState<CancelTokenSource | null>(null);
  const [botStopped, setBotStopped] = useState<boolean>(false);

  const handleSendMessage = async (message: string) => {
    if (currentCancelTokenSource) {
      currentCancelTokenSource.cancel("Request canceled by user");
    }

    if (botStopped) {
      setBotStopped(false);
    }

    const newMessage = `You: ${message}`;
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const typingMessage = `Bot: Bot is typing...`;
    setMessages((prevMessages) => [...prevMessages, typingMessage]);

    const cancelTokenSource = axios.CancelToken.source();
    setCurrentCancelTokenSource(cancelTokenSource);

    try {
      const botResponse = await fetchBotResponse(message, cancelTokenSource);

      if (botResponse) {
        setMessages((prevMessages) => {
          const typingMessageIndex = prevMessages.lastIndexOf(typingMessage);
          if (typingMessageIndex !== -1) {
            const updatedMessages = [...prevMessages];
            updatedMessages.splice(
              typingMessageIndex,
              1,
              `Bot: ${botResponse}`
            );
            return updatedMessages;
          } else {
            return [...prevMessages, `Bot: ${botResponse}`];
          }
        });
      } else {
        console.error("Error fetching bot response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.ChatApp}>
      <h1 className={style.title_up}>Bot Chat</h1>
      <p className={style.title_down}>AI-based service</p>
      <ChatMessages
        stopBot={() =>
          currentCancelTokenSource &&
          stopBot(currentCancelTokenSource, setBotStopped, wait, setMessages)
        }
        messages={messages}
      />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
