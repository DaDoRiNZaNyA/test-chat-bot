import { ChatMessages } from "../ChatMessages/ChatMessages";
import { MessageInput } from "../MessageInput/MessageInput";
import style from "./ChatApp.module.scss";


export const ChatApp = () => {
  return (
    <>
      <div className={style.ChatApp}>
        <h1 className={style.title_up}>Bot Chat</h1>
        <p className={style.title_down}>AI-based service</p>
        <ChatMessages/>
        <MessageInput/>
      </div>
    </>
  );
};
