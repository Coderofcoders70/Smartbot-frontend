type ChatMessages = {
    message: string | null ,
    sender: string | null,
}

export function ChatMessage({ message, sender } : ChatMessages) {

    return (
        <div>
            {sender === 'robot' && (
                <img src="src/assets/robot.png" width="50" />
            )}
            {message}
            {sender === 'user' && (
                <img src="src/assets/user.png" width="50" />
            )}
        </div>
    );
}