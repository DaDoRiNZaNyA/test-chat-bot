import React, { useState, useRef, useEffect } from "react";
import style from "./MessageInput.module.scss";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={style.MessageInput}>
      <div className={style.InputConainer}>
        <input
          className={style.Input}
          type="text"
          name="name"
          placeholder="Start typing here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className={style.circle} onClick={handleSendMessage}>
          <svg
            className={style.plane}
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="carbon:send-filled">
                <path
                  id="Vector"
                  d="M22.875 12.5917L4.54169 3.42502C4.398 3.35315 4.2366 3.32436 4.07692 3.3421C3.91725 3.35984 3.7661 3.42337 3.64169 3.52502C3.52288 3.62459 3.4342 3.75534 3.38562 3.90255C3.33704 4.04977 3.33048 4.20761 3.36669 4.35835L5.57503 12.5H15V14.1667H5.57503L3.33336 22.2833C3.29938 22.4092 3.29541 22.5413 3.32178 22.669C3.34814 22.7967 3.4041 22.9164 3.48516 23.0186C3.56621 23.1207 3.6701 23.2024 3.78847 23.257C3.90684 23.3117 4.03639 23.3379 4.16669 23.3333C4.29714 23.3326 4.42559 23.3012 4.54169 23.2417L22.875 14.075C23.0115 14.0051 23.1261 13.8988 23.2061 13.768C23.2861 13.6371 23.3284 13.4867 23.3284 13.3333C23.3284 13.18 23.2861 13.0296 23.2061 12.8987C23.1261 12.7679 23.0115 12.6616 22.875 12.5917Z"
                  fill="white"
                />
              </g>
            </svg>
          </svg>
        </div>
      </div>
    </div>
  );
};
