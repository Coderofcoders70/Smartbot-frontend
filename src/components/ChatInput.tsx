import { useState } from "react";
import { Chatbot } from "supersimpledev";

interface ChatMessage {
    message: string;
    sender: "user" | "robot";
    key: string;
}

export function ChatInput({ chatMessages, setChatMessages }: { chatMessages: ChatMessage[]; setChatMessages: (messages: ChatMessage[]) => void }) {

    const [inputText, setInputText] = useState('');

    function saveInputText(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    function sendMessage() {
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: "user",
                key: crypto.randomUUID(),
            }
        ]

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: "robot",
                key: crypto.randomUUID(),
            }
        ])
    }

    return (
        <>
            <input
                type="text"
                placeholder="Send a message to the Chatbot"
                onChange={saveInputText}
                value={inputText}
                size={30}
            />

            <button
                onClick={sendMessage}
            >
            Send
            </button>
        </>
    );
}