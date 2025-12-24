from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import asyncio

# Load environment variables
load_dotenv()

app = FastAPI(title="PAHR RAG Chatbot API", version="1.0.0")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-note-book-rkas-f3gyxd9vg-hafizmuhammadumairs-projects.vercel.app/"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex=r"https?://localhost(:[0-9]+)?|https?://127\.0\.0\.1(:[0-9]+)?"
)

# Import services
try:
    from src.services.rag_service import RAGService
    from src.services.db_service import NeonDBService

    # Initialize the RAG service
    rag_service = RAGService()
    rag_service_available = True

    # Initialize the Neon database service
    db_service = NeonDBService()
    # Try to connect to the database
    async def init_db():
        if await db_service.connect():
            await db_service.create_tables()

    # Run the database initialization
    asyncio.run(init_db())

except ImportError as e:
    print(f"Warning: Could not import services: {e}")
    rag_service_available = False
    db_service = None
    # Define a mock service for testing purposes
    class MockRAGService:
        def query(self, question: str):
            return {
                "llm_answer": "This is a mock response. The RAG system is not fully implemented yet.",
                "source_documents": ["mock_document.md"]
            }

        def ask_selected_text(self, selected_text: str, question: str):
            return {
                "llm_answer": f"This is a mock response for selected text '{selected_text[:50]}...' with question: {question}",
                "source_documents": ["mock_document.md"]
            }

    rag_service = MockRAGService()

# Pydantic models
class QueryRequest(BaseModel):
    question: str

class ChatbotResponse(BaseModel):
    llm_answer: str
    source_documents: List[str]

class SelectedTextRequest(BaseModel):
    selected_text: str
    question: str

class IngestContentRequest(BaseModel):
    chapter_id: str
    content_markdown: str

# Placeholder endpoints - will be implemented in later tasks
@app.get("/")
def read_root():
    return {
        "message": "PAHR RAG Chatbot API is running",
        "endpoints": {
            "health": "/api/health",
            "query": "/api/query [POST]",
            "ask-selected": "/api/ask-selected [POST]",
            "ingest-content": "/api/ingest-content [POST]"
        },
        "technologies": {
            "llm": "OpenRouter (if configured) or OpenAI",
            "embeddings": "Cohere (if configured) or OpenAI",
            "vector_store": "Qdrant",
            "database": "Neon PostgreSQL"
        }
    }

@app.post("/api/query", response_model=ChatbotResponse)
def query_chatbot(request: QueryRequest):
    if not rag_service_available:
        return ChatbotResponse(
            llm_answer="RAG service is not available. Please check the configuration.",
            source_documents=[]
        )

    # Use the RAG service to generate a response
    try:
        response = rag_service.query(request.question)

        # Save to chat history in Neon database if available
        if db_service:
            # For demo purposes, we'll use a default user ID
            # In a real application, you would get the user ID from authentication
            asyncio.run(
                db_service.save_chat_history(
                    user_id=1,  # Default user for demo
                    question=request.question,
                    answer=response["llm_answer"],
                    source_documents=response["source_documents"]
                )
            )

        return ChatbotResponse(
            llm_answer=response["llm_answer"],
            source_documents=response["source_documents"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

@app.post("/api/ask-selected", response_model=ChatbotResponse)
def ask_selected_text(request: SelectedTextRequest):
    if not rag_service_available:
        return ChatbotResponse(
            llm_answer="RAG service is not available. Please check the configuration.",
            source_documents=[]
        )
    
    # Use the RAG service to generate a response for selected text
    try:
        response = rag_service.ask_selected_text(request.selected_text, request.question)
        return ChatbotResponse(
            llm_answer=response["llm_answer"],
            source_documents=response["source_documents"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing selected text query: {str(e)}")

@app.post("/api/ingest-content")
def ingest_content(request: IngestContentRequest):
    """
    Endpoint to ingest content into the RAG system.
    """
    if not rag_service_available or not hasattr(rag_service, 'vector_store_service') or rag_service.vector_store_service is None:
        return {"message": "RAG service is not available. Content ingestion failed."}

    try:
        # Add the content to the vector store
        # This would involve chunking the content and adding it to the vector database
        rag_service.vector_store_service.add_document(
            doc_id=request.chapter_id,
            content=request.content_markdown,
            metadata={"source": f"chapter_{request.chapter_id}", "type": "markdown"}
        )
        return {"message": f"Content for chapter {request.chapter_id} ingested successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting content: {str(e)}")

@app.get("/api/health")
def health_check():
    """
    Health check endpoint to verify the API is running and RAG service is available.
    """
    return {
        "status": "healthy",
        "rag_service_available": rag_service_available,
        "message": "API is running successfully"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)