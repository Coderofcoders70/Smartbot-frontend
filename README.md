🤖 Smartbot - The MuseAi
Smartbot is a production-ready AI chatbot designed with a strong focus on usability, searchability, and real-world conversation management.
Instead of being just an AI response generator, Smartbot aims to feel like a complete, interactive product that users can actually enjoy using.

🔗 Live Demo
Link: https://smartbot-museai.vercel.app

💡 Why This Project?
When I first explored AI chat applications, I noticed that most of them focused heavily on generating answers, but overlooked how users interact with conversations over time. One major limitation was the lack of search functionality—once a conversation became long, it was difficult to find an important response again.

I also felt that many AI apps had a static and uninspiring user experience. While they worked technically, they didn’t feel engaging or alive. To address this, I focused on building an interactive UI using animations and thoughtful design choices, so the chatbot feels more like a living assistant rather than just a text box.

This project was built with the intention of creating a complete conversational experience. Features such as chat sessions, searchable chat history, session deletion, session updates, and persistent storage were intentionally added to give users full control over their conversations. The goal was not just to build an AI chatbot, but to design an AI application that feels practical, interactive, and enjoyable to use.

✨ Key Features
1. AI-powered chat using Google Gemini
2. Automatic chat session creation on first message
3. Chat history with search functionality
4. Create, switch, update, and delete chat sessions
5. Persistent user memory (e.g., name recall)
6. Light & Dark mode with interactive animations
7. Responsive design for desktop and mobile
8. Clean, modern UI with polished UX

🛠 Tech Stack

Frontend

-> React + TypeScript (Vite)

-> Modern CSS-based UI

-> Lottie & SVG animations

Backend

-> Node.js + Express (TypeScript)

-> Gemini SDK for AI responses

-> REST API architecture

Deployment

-> Frontend: Vercel

-> Backend: Render

🏗 Architecture Overview

The frontend is responsible for UI, state management, and user interactions, while the backend securely handles AI requests and API keys. Communication happens through a clean REST endpoint (/api/chat).

The AI layer is designed to be provider-agnostic, allowing future integration with other AI services without requiring changes to the frontend logic.

🚧 Challenges & Solutions

1. AI API billing constraints: Switched to Gemini while keeping the architecture flexible
2. Chat session state issues: Implemented atomic session creation with first-message handling
3. Deployment issues: Solved TypeScript build errors, environment variable mismatches, and production config issues on Render and Vercel
4. Responsive UI with animations: Carefully managed CSS layering and mobile behavior to avoid layout breakage

These challenges helped shape the project into a more realistic, production-style application.

🔮 Future Improvements

User authentication and multi-user support

Database-backed persistent storage

Analytics and usage insights

Guided onboarding experience for first-time users

📌 Final Note

Smartbot was built as a learning-driven, portfolio-quality project with an emphasis on real-world usability rather than just AI integration. It reflects both technical implementation and product-level thinking.
