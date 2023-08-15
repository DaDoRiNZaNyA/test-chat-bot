import React from 'react';
import style from './ChatMessage.module.scss';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  isTyping: boolean;
  stopBot: () => void;
  showStopButton: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, message, isTyping, stopBot, showStopButton }) => {
  const messageClass = isBot ? style.botMessage : style.userMessage;
  const avatarClass = isBot ? style.botAvatar : style.userAvatar;

  return (
    <div className={`${style.message} ${messageClass}`}>
      <div className={`${style.avatar} ${avatarClass}`}>
        {isBot ? (
          <img src="src/assets/img/Robot.svg" alt="Robot Avatar" />
        ) : (
          <span>T</span>
        )}
      </div>
      <div className={style.text}>
        {message}
        {isBot && isTyping && showStopButton && (
          <button className={style.stopButton} onClick={stopBot}>X</button>
        )}
      </div>
    </div>
  );
};
