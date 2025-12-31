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
            /my name is (\w+)/i,
            /i am (\w+)/i,
            /call me (\w+)/i,
            /remember my name (\w+)/i,
            /mera naam hai (\w+)/i,
        ];

        for (const pattern of patterns) {
            const match = message.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    async function sendMessage() {
        const trimmedInput = inputText.trim();

        if (trimmedInput === "") return;

        if (isLoading) return;

        ensureActiveSession();
        setIsLoading(true);

        const userMessageId = crypto.randomUUID();
        const extractedName = extractName(trimmedInput);

        if (extractedName) {
            setUserProfile({ name: extractedName });
            const newMsgs: ChatMessage[] = [
                ...chatMessages,
                { 
                    id: userMessageId, 
                    message: trimmedInput, 
                    sender: "user" 
                },
                { 
                    id: crypto.randomUUID(), 
                    message: `Got it, ${extractedName}. I’ll remember that.`, 
                    sender: "robot" 
                }
            ];

            setChatMessages(newMsgs);
            setInputText('');
            setIsLoading(false);
            return;
        }

        if (/do you remember my name/i.test(inputText) || /what is my name/i.test(inputText) || /my name/i.test(inputText) || /tell me my name/i.test(inputText) || /mera naam kya hai /i.test(inputText)) {
            
            const reply = userProfile.name ? `Yes — you’re ${userProfile.name}.` : "I don’t think you’ve told me your name yet.";
            setChatMessages([
                ...chatMessages,
                { 
                    id: userMessageId, 
                    message: trimmedInput, 
                    sender: "user" 
                },
                { 
                    id: crypto.randomUUID(), 
                    message: reply, 
                    sender: "robot" 
                }
            ]);

            setInputText('');
            setIsLoading(false);
            return;
        }

        const tempMessages: ChatMessage[] = [
            ...chatMessages,
            { 
                id: userMessageId, 
                message: trimmedInput, 
                sender: "user" 
            },
            { 
                id: "loading-spinner", // API calling logic here 
                message: <img className="loadSpinner" src="https://supersimple.dev/images/loading-spinner.gif" />, 
                sender: "robot" 
            }
        ];

        setChatMessages(tempMessages);
        setInputText(''); 

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: trimmedInput }),
            });
            const data = await response.json();

            setChatMessages([
                ...tempMessages.filter(m => m.id !== "loading-spinner"),
                { 
                    id: crypto.randomUUID(), 
                    message: data.reply, 
                    sender: "robot" 
                }
            ]);
        }catch (error) {
            console.error("Chat Error:", error);
            setChatMessages([
                ...tempMessages.filter(m => m.id !== "loading-spinner"),
                { 
                    id: crypto.randomUUID(), 
                    message: "Sorry, I encountered with connectivity issue. Please try again.", 
                    sender: "robot" 
                }
            ]);
        } finally {
            setIsLoading(false);
        }
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
                placeholder={isLoading ? "Bot is thinking..." : "Start asking..."}
                disabled={isLoading}
                size={30}
                onChange={saveInputText}
                onKeyDown={pressEnter}
                value={inputText}
                className="chat-input"
            />

            <button
                className="send-button"
                title='Send message (Enter)'
                disabled={isLoading || !inputText.trim()}
                onClick={sendMessage}
                aria-label='Send message'>
                <LuSend size={18} />
            </button>

            <button
                className='clear-button'
                title="Clear current chat messages"
                onClick={clearMessages}
                aria-label='Clear chat'>
                <LuTrash2 size={18} />
            </button>
        </div>
    );
}

export default ChatInput;