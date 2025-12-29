import './App.css';
import { useEffect, useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const storedMessages = localStorage.getItem('messages');
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (e) {
      console.error("Error parsing messages from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href='src/assets/robot.png' />
      <title>Smartbot</title>

      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcomeMessage">Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )}

        <ChatMessages
          chatMessages={chatMessages}
        />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
}

export default App
