import axios, { CancelTokenSource } from "axios";

export const fetchBotResponse = async (
  message: string,
  cancelTokenSource: CancelTokenSource
): Promise<string | null> => {
  try {
    const response = await axios.post(
      "http://185.46.8.130/api/v1/chat/send-message",
      { message },
      {
        responseType: "arraybuffer",
        cancelToken: cancelTokenSource.token,
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
    throw error;
  }
};

export const stopBot = async (
  currentCancelTokenSource: CancelTokenSource,
  setBotStopped: React.Dispatch<React.SetStateAction<boolean>>,
  wait: (ms: number) => Promise<void>,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (currentCancelTokenSource) {
    currentCancelTokenSource.cancel("Bot stopped by user");
    setBotStopped(true);
    const newBotStoppedMessage = `Bot: Bot was stopped`;
    await wait(200);
    setMessages((prevMessages) => [...prevMessages, newBotStoppedMessage]);
  }
};

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
