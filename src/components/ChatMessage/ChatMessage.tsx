import style from './ChatMessage.module.scss';

export const ChatMessage = ({ isBot, message }) => {
  const messageClass = isBot ? style.botMessage : style.userMessage;
  const avatarClass = isBot ? style.botAvatar : style.userAvatar;

  return (
    <div className={`${style.message} ${messageClass}`}>
      <div className={`${style.avatar} ${avatarClass}`}>
        {isBot ? (
          <img src="src\assets\img\Robot.svg" alt="Robot Avatar" />
        ) : (
          <span>T</span>
        )}
      </div>
      <div className={style.text}>
        {message}
      </div>
    </div>
  );
};
