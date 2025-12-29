import React, { useState, type JSX } from "react";
import { Chatbot } from "supersimpledev";

interface ChatMessage {
    id: string;
    message: string | JSX.Element;
    sender: "user" | "robot";
}

type ChatInputProps = {
    chatMessages: ChatMessage[]
    setChatMessages: (chatMessages: ChatMessage[]) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }: ChatInputProps) {
    const [inputText, setInputText] = useState('');

    function saveInputText(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    setIsLoading(true);

    async function sendMessage() {

        if (isLoading || inputText.trim() === "") {
            return alert("Please check again");
        }

        const newChatMessages: ChatMessage[] = [
            ...chatMessages,
            {
                id: crypto.randomUUID(),
                message: inputText,
                sender: "user",
            },
            {
                id: "loading",
                message: <img className="loadSpinner" src="https://supersimple.dev/images/loading-spinner.gif" />,
                sender: "robot",
            }
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
        setIsLoading(false);
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