import './App.css';
import { LuMenu } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import ChatInput from './components/ChatInput';
import { LuMoon, LuSun } from 'react-icons/lu';
import ChatHistory from './components/ChatHistory';
import ChatMessages from './components/ChatMessages';
import DarkSnowBackground from './components/DarkSnowBackground';
import EmptyChatAnimation from './components/EmptyChatAnimation';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const filteredSessions = chatSessions.filter((session) => {
    const query = searchQuery.toLowerCase();

    if (session.title.toLowerCase().includes(query)) {
      return true;
    }

    return session.messages.some((msg: any) =>
      typeof msg.message === 'string' &&
      msg.message.toLowerCase().includes(query)
    );
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

  let total = 0;
  const num = total += chatMessages.length;
  const title = `${num} Messages`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href='src/assets/robot.png' />
      <title>{chatMessages.length != 0 ? title : "Smartbot" }</title>

      <div className="app-container">

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
        </button>

        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open chat history"
        >
          <LuMenu size={22} />
        </button>

        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <ChatHistory
          sessions={filteredSessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            setCurrentSessionId(id);
            setIsSidebarOpen(false);
          }}
          onNewChat={() => {
            createNewSession();
            setIsSidebarOpen(false);
          }}
          onDeleteSession={deleteSession}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isOpen={isSidebarOpen}
        />

        <div className='chat-main'>
          {chatMessages.length === 0 && (
            <div className="chat-background">
              {theme === 'dark' ? (
                <DarkSnowBackground />
              ) : (
                <EmptyChatAnimation theme="light" />
              )}
            </div>
          )}

          <div className="chat-content">
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
        </div>
      </div>
    </>
  );
}

export default App
