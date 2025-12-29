import './App.css';
import { useEffect, useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';

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

  useEffect(() => {
    Chatbot.addResponses({
      'i am fine': "That's great!! How can I help You ?",
      'goodbye': "Okay!! If you want to know something don't hesitate to reach",
      'What can you do': "I know how to flip a coin, roll a dice, or get today's date. Let me know how I can help!",
      'give me an unique Id': function () {
        return `Sure here's an unique Id: ${crypto.randomUUID()}`
      }
    });
  }, []);

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
