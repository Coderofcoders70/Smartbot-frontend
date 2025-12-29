import './App.css'
import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'

function App() {

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
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <ChatMessages
        chatMessages={chatMessages}
      />
    </>
  )
}

export default App
