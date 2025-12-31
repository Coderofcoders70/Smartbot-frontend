import dayjs from 'dayjs';
import './ChatMessage.css';
import ReactMarkdown from 'react-markdown';
import UserProfileImage from '../assets/user.png'
import RobotProfileImage from '../assets/robot.png'

type ChatMessageProps = {
    message: any;
    sender: string;
    time?: string | number | Date;
}

export function ChatMessage({ message, sender, time }: ChatMessageProps) {

    return (
        <div className={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
            {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-message-profile" alt="Robot profile" />
            )}

            <div className="chat-message-text">
                {sender === 'robot' && typeof message === 'string' ? (
                    <div className="markdown-content">
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </div>
                ) : (
                    message
                )}

                {time && (
                    <div className='chat-message-time'>
                        {dayjs(time).format('h:mma')}
                    </div>
                )}
            </div>

            {sender === 'user' && (
                <img src={UserProfileImage} className="chat-message-profile" alt="User profile" />
            )}

        </div>

    );
}