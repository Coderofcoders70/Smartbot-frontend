import './ChatHistory.css'
import { LuPlus } from 'react-icons/lu';
import { LuTrash2 } from 'react-icons/lu';

type ChatSession = {
    id: string;
    title: string;
    createdAt: number;
};

type ChatHistoryProps = {
    sessions: ChatSession[];
    currentSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession: (id: string) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    isOpen: boolean
};

function ChatHistory({ sessions, currentSessionId, onSelectSession, onNewChat, onDeleteSession, searchQuery, onSearchChange, isOpen }: ChatHistoryProps) {
    return (
        <aside className={`chat-history ${isOpen ? 'open' : ''}`}>
            <div className="chat-history-header">
                <h3>Chats</h3>
                <input
                    type="text"
                    placeholder='Search Chats...'
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='chat-search'
                />
                <button
                    className="add-chat-btn"
                    onClick={onNewChat}
                    aria-label="New chat"
                >
                    <LuPlus size={18} />
                </button>

            </div>

            <ul className="chat-history-list">
                {sessions.length === 0 && (
                    <p className="no-results">No chats available</p>
                )}
                {sessions.map((session) => (
                    <li
                        key={session.id}
                        className={
                            session.id === currentSessionId ? 'active' : ''
                        }
                        onClick={() => onSelectSession(session.id)}
                    >
                        <span className="chat-title">{session.title}</span>
                        <button
                            className="delete-chat-btn"
                            onClick={(e) => {
                                e.stopPropagation(); // It is important to add it here
                                onDeleteSession(session.id);
                            }}
                            aria-label="Delete chat"
                        >
                            <LuTrash2 size={16} />
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ChatHistory;
