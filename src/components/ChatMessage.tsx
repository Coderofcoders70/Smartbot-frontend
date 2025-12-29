import dayjs from 'dayjs';
import './ChatMessage.css'
import UserProfileImage from '../assets/user.png'
import RobotProfileImage from '../assets/robot.png'

type ChatMessageProps = {
    message: string;
    sender: string;
    time?: string | number | Date;
}

export function ChatMessage({ message, sender, time }: ChatMessageProps){

    return (
        <div className={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
            {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-message-profile" alt="Robot profile" />
            )}
            
            <div className="chat-message-text">
                {message}

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