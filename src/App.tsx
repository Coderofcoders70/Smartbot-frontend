import './App.css'
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage'

function App() {

  return (
    <>
      <ChatInput />
      <ChatMessage
        message="hello Chatbot"
        sender="user"
      />

      <ChatMessage
        message="Hello! How can I help you today ?"
        sender="robot"
      />

      <ChatMessage
        message="Can you tell me todays date ?"
        sender="user"
      />

      <ChatMessage
        message="Today is November 4 2025"
        sender="robot"
      />
    </>
  )
}

export default App
