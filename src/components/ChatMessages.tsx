import dayjs from 'dayjs';
import './ChatMessages.css';
import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';;

function useAutoScroll(dependencies: React.DependencyList = []) {

    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const containerElem = containerRef.current

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
        
    }, dependencies);
    
    return containerRef;
}

type ChatMessagesProps = {
    chatMessages: {
        id: string;
        message: string;
        sender: string;
        key: number;
    }[]
}

function ChatMessages({ chatMessages }: ChatMessagesProps) {

    const chatMessagesRef = useAutoScroll([chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>

            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage 
                        message = {chatMessage.message}
                        sender = {chatMessage.sender}
                        key = {chatMessage.id}
                        time =  {dayjs().valueOf()}
                    />
                );
            })}
        </div>
    );
}

export default ChatMessages;