import './App.css';
import { useEffect, useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import ChatMessages from './components/ChatMessages';

type ChatSession = {
  id: string;
  title: string;
  messages: any[];
  createdAt: number;
};

type UserProfile = {
  name: string | null;
};

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    try {
      const stored = localStorage.getItem('chatSessions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {

    try {
      const storedProfile = localStorage.getItem('userProfile');
      return storedProfile ? JSON.parse(storedProfile) : { name: null };

    } catch (error) {
      console.error("Error in parsing user-profile from localStorage:", error);
      return { name: null };
    }
  });

  // This function will help us to generate title in the history chats:-
  function generateChatTitle(message: string) {
    return message.length > 30
      ? message.slice(0, 30) + '…'
      : message;
  }

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(
    chatSessions.length ? chatSessions[0].id : null
  );

  const currentSession = chatSessions.find(
    (session) => session.id === currentSessionId
  );

  const chatMessages = currentSession ? currentSession.messages : [];

  function ensureActiveSession() {
    if (!currentSessionId) {
      createNewSession();
    }
  }

  function createNewSession() {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };

    setChatSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }

  function updateCurrentSessionMessages(messages: any[]) {
    setChatSessions((prev) =>
      prev.map((session) => {
        if (session.id !== currentSessionId) return session;

        const shouldSetTitle =
          session.title === 'New Chat' &&
          messages.length > 0 &&
          messages[0].sender === 'user';

        return {
          ...session,
          messages,
          title: shouldSetTitle
            ? generateChatTitle(messages[0].message)
            : session.title,
        };
      })
    );
  }

  function deleteSession(sessionId: string) {
    setChatSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);

      if (sessionId === currentSessionId) {
        setCurrentSessionId(updated.length ? updated[0].id : null);
      }

      return updated;
    });
  }

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  let total = null;
  const num = total += chatMessages.length;
  const title = `${num} Messages`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href='src/assets/robot.png' />
      <title>{title}</title>

      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcomeMessage">Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )}

        <ChatHistory
          onDeleteSession={deleteSession}
        />

        <ChatMessages
          chatMessages={chatMessages}
        />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={updateCurrentSessionMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          ensureActiveSession={ensureActiveSession}
        />
      </div>
    </>
  );
}

export default App
