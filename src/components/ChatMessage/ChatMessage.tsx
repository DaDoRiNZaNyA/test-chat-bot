import React from 'react';
import style from './ChatMessage.module.scss';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, message }) => {
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
        {isBot && (
          <span className={style.typingAnimation}>Bot is typing...</span>
        )}
      </div>
    </div>
  );
};
