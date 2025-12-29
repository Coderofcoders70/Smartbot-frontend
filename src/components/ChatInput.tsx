import './ChatInput.css'
import { Chatbot } from 'supersimpledev'
import { useState, type JSX } from 'react'

type ChatMessage = {
    id: string;
    message: string | JSX.Element;
    sender: "user" | "robot";
}

type ChatInputProps = {
    chatMessages: ChatMessage[]
    setChatMessages: (chatMessages: ChatMessage[]) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }: ChatInputProps) {
    const [inputText, setInputText] = useState('');

    function saveInputText(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    async function sendMessage() {

        if (isLoading || inputText.trim() === "") {
            return alert("Please check again");
        }

        setIsLoading(true);

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

    function pressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            sendMessage()
        }
        else if (e.key === 'Escape') {
            setInputText('');
        }
    }

    function clearMessages() {
        setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to the Chatbot"
                size={30}
                onChange={saveInputText}
                onKeyDown={pressEnter}
                value={inputText}
                className="chat-input"
            />

            <button className="send-button" onClick={sendMessage}>Send</button>
            <button className='clear-button' onClick={clearMessages}>Clear</button>
        </div>
    );
}

export default ChatInput;