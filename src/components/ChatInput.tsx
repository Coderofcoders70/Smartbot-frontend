import './ChatInput.css';
import { BACKEND_URL } from '../config';
import { useState, type JSX } from 'react';
import { LuSend, LuTrash2 } from 'react-icons/lu';

type ChatMessage = {
    id: string;
    message: string | JSX.Element;
    sender: "user" | "robot";
}

type UserProfile = {
    name: string | null;
}

type ChatInputProps = {
    chatMessages: ChatMessage[]
    setChatMessages: (chatMessages: ChatMessage[]) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>
    ensureActiveSession: () => void;
}

function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading, userProfile, setUserProfile, ensureActiveSession }: ChatInputProps) {
    const [inputText, setInputText] = useState('');

    function saveInputText(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
    }

    function extractName(message: string): string | null {
        const patterns = [
            /my name (\w+)/i,
            /my name is (\w+)/i,
            /i am (\w+)/i,
            /call me (\w+)/i,
            /remember my name (\w+)/i,
            /mera naam hai (\w+)/i,
            /mera naam (\w+)/i,
        ];

        for (const pattern of patterns) {
            const match = message.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    async function sendMessage() {

        ensureActiveSession();

        if (!chatMessages || chatMessages.length === 0) {
            setChatMessages([]); // To create new chat
        }

        if (isLoading || inputText.trim() === "") {
            return alert("Please check again");
        }

        setIsLoading(true);

        const extractedName = extractName(inputText);

        if (extractedName) {

            setUserProfile({ name: extractedName });

            setChatMessages([
                ...chatMessages,
                {
                    id: crypto.randomUUID(),
                    message: inputText,
                    sender: "user",
                },
                {
                    id: crypto.randomUUID(),
                    message: `Got it, ${extractedName}. I’ll remember that.`,
                    sender: "robot",
                },
            ]);

            setInputText('');
            setIsLoading(false);
            return;
        }

        if (/do you remember my name/i.test(inputText) || /what is my name/i.test(inputText) || /my name/i.test(inputText) || /tell me my name/i.test(inputText) || /kya hai mera naam/i.test(inputText) || /mera naam kya hai /i.test(inputText) || /kya naam/i.test(inputText)) {

            const reply = (userProfile.name
                ? `Yes — you’re ${userProfile.name}.`
                : "I don’t think you’ve told me your name yet.")
                || `Haan aapka naam ${userProfile.name}`;

            setChatMessages([
                ...chatMessages,
                {
                    id: crypto.randomUUID(),
                    message: inputText,
                    sender: "user",
                },
                {
                    id: crypto.randomUUID(),
                    message: reply,
                    sender: "robot",
                },
            ]);

            setInputText('');
            setIsLoading(false);
            return;
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

        async function sendMessageToBackend(message: string): Promise<string> {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            return data.reply;
        }

        const response = await sendMessageToBackend(inputText);
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
                placeholder="Start asking..."
                size={30}
                onChange={saveInputText}
                onKeyDown={pressEnter}
                value={inputText}
                className="chat-input"
            />

            <button
                className="send-button"
                onClick={sendMessage}
                aria-label='Send message'>
                <LuSend size={18} />
            </button>

            <button
                className='clear-button'
                onClick={clearMessages}
                aria-label='Clear chat'>
                <LuTrash2 size={18} />
            </button>
        </div>
    );
}

export default ChatInput;