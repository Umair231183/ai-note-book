# AI-Native Textbook on Physical AI & Humanoid Robotics

This project is an AI-native technical textbook focused on Physical AI and Humanoid Robotics, built using Docusaurus. It features an integrated Retrieval-Augmented Generation (RAG) AI Tutor, powered by a FastAPI backend, Qdrant vector store, Neon Postgres database, and OpenAI/ChatKit Agents.

## Project Overview

The goal is to provide an accessible, high-quality, and interactive learning experience for students ranging from beginners to advanced levels. Key features include:

*   **Multi-module Textbook**: Structured content on Physical AI, ROS2, Simulation, NVIDIA Isaac, Humanoid Robotics, Conversational Robotics, and a Capstone Project.
*   **RAG AI Tutor**: A conversational chatbot that answers questions strictly from the textbook content, providing citations.
*   **Modern UI/UX**: Clean, minimal, and responsive design for optimal readability.
*   **Personalization (Bonus)**: Features for personalized chapter recommendations and content adaptation.
*   **Urdu Translation (Bonus)**: Dynamic, per-chapter Urdu translation capabilities.
*   **AI Subagents (Bonus)**: Reusable AI agents for content generation, review, and skill execution.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   Python (v3.10 or higher)
*   `pip` and `npm` package managers
*   An OpenAI API Key (set as `OPENAI_API_KEY` environment variable)
*   Access to Qdrant Cloud (or local Qdrant instance)
*   Access to Neon Serverless Postgres

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Umair231183/ai-robotic-book-hackatone-01.git # Replace with actual repo URL
    cd ai-robotic-book-hackatone-01/docusaurus_app
    ```

2.  **Frontend (Docusaurus) Setup:**
    ```bash
    npm install
    ```

3.  **Backend (FastAPI) Setup:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

### Running Locally

1.  **Set Environment Variables:**
    Create a `.env` file in the `docusaurus_app/backend/` directory based on `.env.example`.
    ```
    OPENAI_API_KEY="sk-YOUR_OPENAI_API_KEY"
    QDRANT_URL="http://localhost:6333" # Or your Qdrant Cloud URL
    QDRANT_API_KEY="your_qdrant_api_key" # If using Qdrant Cloud
    NEON_DATABASE_URL="postgresql://user:password@host/dbname" # Your Neon Postgres connection string
    ```

2.  **Start Backend:**
    Navigate to `docusaurus_app/backend/` and run:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

3.  **Start Frontend:**
    In a separate terminal, navigate to `docusaurus_app/` and run:
    ```bash
    npm start
    ```
    The Docusaurus site should open in your browser at `http://localhost:3000/`.

## Deployment

Refer to the CI/CD workflow files in `.github/workflows/` for GitHub Pages (frontend) and backend cloud platform deployments. Detailed instructions for Qdrant Cloud and Neon Postgres setup can be found in `specs/001-pahr-textbook-rag/quickstart.md`.

## Contributing

Contributions are welcome! Please refer to the project's [Constitution](./.specify/memory/constitution.md) and [Specification](./specs/001-pahr-textbook-rag/spec.md) for guidelines.
