import { useState } from "react";
import { Chatbot } from "supersimpledev";

interface ChatMessage {
    id: string;
    message: string;
    sender: "user" | "robot";
}

type ChatInputProps = {
    chatMessages: ChatMessage[]
    setChatMessages : (chatMessages: ChatMessage[]) => void;
}

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
    const [inputText, setInputText] = useState('');

    function saveInputText(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    async function sendMessage() {

        const newChatMessages: ChatMessage[] = [
            ...chatMessages,
            {
                id: crypto.randomUUID(),
                message: inputText,
                sender: "user",
            },
        ];

        setChatMessages(newChatMessages);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages.filter((msg) => msg.id !== "loading")
                .slice(0, newChatMessages.length - 1),
            {
                id: crypto.randomUUID(),
                message: response,
                sender: "robot",
            }
        ]);

        setInputText('');
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