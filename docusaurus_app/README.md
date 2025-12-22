# PAHR Textbook and RAG Chatbot

This project consists of two main components:
1. A FastAPI backend that handles the RAG (Retrieval-Augmented Generation) functionality
2. A Docusaurus frontend that serves as the textbook interface with an integrated chatbot

## Prerequisites

Before starting the application, ensure you have the following installed:
- Python 3.10+
- Node.js 18+
- npm or yarn

## Environment Setup

1. Create a `.env` file in the `docusaurus_app/backend/` directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=your_qdrant_url_here  # Optional, defaults to in-memory for development
QDRANT_API_KEY=your_qdrant_api_key_here  # Optional
NEON_DATABASE_URL=your_neon_database_url_here
```

2. Install backend dependencies:
```bash
cd docusaurus_app/backend
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd docusaurus_app
npm install
```

## Starting the Application

### Method 1: Using the batch script (Windows)
Run the following command from the project root directory:
```bash
start-servers.bat start
```

### Method 2: Manual start
1. Start the backend server:
```bash
cd docusaurus_app/backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

2. In a new terminal, start the frontend server:
```bash
cd docusaurus_app
npm run start
```

## Accessing the Application

- Frontend (Docusaurus): http://localhost:3000
- Backend (FastAPI): http://localhost:8000
- Backend API Documentation: http://localhost:8000/docs
- Chatbot Interface: http://localhost:3000/chatbot

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are properly set
2. Check that the required dependencies are installed
3. Verify that ports 8000 and 3000 are not being used by other applications
4. Check the console output of both servers for error messages

## Project Structure

```
docusaurus_app/                 # Main project directory
├── backend/                    # FastAPI backend
│   ├── main.py                 # Main application entry point
│   ├── requirements.txt        # Python dependencies
│   └── src/
│       ├── models/             # Data models
│       ├── services/           # Business logic
│       │   ├── rag_service.py  # RAG implementation
│       │   └── vector_store_service.py  # Vector store interface
│       ├── chatbot/            # Chatbot components
│       └── agents/             # AI agents
├── src/                        # Docusaurus source files
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   │   └── chatbot.js          # Chatbot page
│   └── css/                    # Custom CSS
├── docs/                       # Documentation
├── docusaurus.config.js        # Docusaurus configuration
└── package.json                # Node.js dependencies
```