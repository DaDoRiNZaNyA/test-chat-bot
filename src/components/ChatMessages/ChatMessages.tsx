import style from './ChatMessages.module.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';
export const ChatMessages = () => {
  const messages = [
    { id: 1, isBot: true, text: 'Hello! I’m BotHub, AI-based bot designed to answer all your questions.' },
    { id: 2, isBot: false, text: 'Hello. help me to solve my math test' },
    { id: 3, isBot: true, text: 'Alright. Send me tasks' },
    { id: 4, isBot: false, text: "First task is following: Lucy has measuring cups of sizes 1 cup, 1/5 cup, 1/3 cup, and 1/4 cup. She is trying to measure out 1/6 of a cup of water and says, ''If I fill up the the 1/2 cup and then pour that into the 1/3 cup until it is full, there will be 1/6 of a cup of water left.'" },
    { id: 5, isBot: true, text: 'I guess you can solve it by yourself!' },
    { id: 6, isBot: false, text: "First task is following: Lucy has measuring cups of sizes 1 cup, 1/5 cup, 1/3 cup, and 1/4 cup. She is trying to measure out 1/6 of a cup of water and says, ''If I fill up the the 1/2 cup and then pour that into the 1/3 cup until it is full, there will be 1/6 of a cup of water left.'" },
  ];
  return (
    <div className={style.ChatMessages}>
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          isBot={msg.isBot}
          message={msg.text}
        />
      ))}
    </div>
  )
}
