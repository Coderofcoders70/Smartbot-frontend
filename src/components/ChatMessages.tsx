import { ChatMessage } from "./ChatMessage";

export function ChatMessages({ chatMessages }: { chatMessages: Array<{ message: string; sender: string; key: string }> }) {
    return (
        <>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.key}
                    />
                );
            })}

        </>
    );
}