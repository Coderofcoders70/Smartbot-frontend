import './App.css'
import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'

function App() {

  const [chatMessages, setChatMessages] = useState([
    {
      message: "hello Chatbot",
      sender: "user",
      key: "1",
    },
    {
      message: "Hello! How can I help you today ?",
      sender: "robot",
      key: "2",
    },
    {
      message: "Can you tell me todays date ?",
      sender: "user",
      key: "3",
    },
    {
      message: "Today is November 4 2025",
      sender: "robot",
      key: "4",
    },
  ]);

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
