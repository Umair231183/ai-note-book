import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from pathlib import Path

from src.models.chatbot_models import QueryRequest, ChatbotResponse
from src.services.vector_store_service import VectorStoreService
from src.services.rag_service import RAGService
from src.services.db_service import DBService


# Load environment variables from .env file (handled by python-dotenv)
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(
    title="AI K-12 RAG Chatbot API",
    description="API for the Retrieval-Augmented Generation Chatbot for K-12 AI Education content.",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Adjust as needed for deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskSelectedRequest(BaseModel):
    selected_text: str
    question: str

class IngestRequest(BaseModel):
    chapter_id: str
    content_markdown: str

# Define SignupRequest for /auth/signup
class SignupRequest(BaseModel):
    email: str
    password: str
    experience_level: Optional[str] = None

# Define SigninRequest for /auth/signin
class SigninRequest(BaseModel):
    email: str
    password: str

# Define UserPreference models
class UserPreferenceRequest(BaseModel):
    user_id: str
    preference_type: str
    value: str
    chapter_id: Optional[str] = None

class UserPreferenceResponse(BaseModel):
    user_id: str
    preference_type: str
    value: str
    chapter_id: Optional[str] = None
    preference_id: str

class TranslateChapterRequest(BaseModel):
    chapter_id: str
    content_markdown: str

class TranslateChapterResponse(BaseModel):
    translated_content: str


# Initialize Services
# Ensure OPENAI_API_KEY is set in your environment
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable not set.")

vector_store_service = VectorStoreService()
rag_service = RAGService(vector_store_service)
db_service = DBService() # Initialize DBService

@app.post("/api/query", response_model=ChatbotResponse)
async def query_chatbot(request: QueryRequest):
    try:
        response = rag_service.ask_question(request.question)
        return ChatbotResponse(
            llm_answer=response.get("llm_answer"),
            source_documents=response.get("source_documents")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ask-selected", response_model=ChatbotResponse)
async def ask_selected_text(request: AskSelectedRequest):
    try:
        # Combine selected_text and question for contextual retrieval
        # RAGService can be enhanced to handle selected_text more intelligently
        full_query = f"Based on this text: '{request.selected_text}'. Answer the question: {request.question}"
        response = rag_service.ask_question(full_query)
        return ChatbotResponse(
            llm_answer=response.get("llm_answer"),
            source_documents=response.get("source_documents")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ingest-content")
async def ingest_content(request: IngestRequest):
    # Placeholder for actual ingestion logic using vector_store_service
    # This will involve chunking, embedding, and upserting to Qdrant
    print(f"Ingesting content for chapter: {request.chapter_id}")
    print(f"Content length: {len(request.content_markdown)} characters")
    # Example:
    # chunks = your_chunking_logic(request.content_markdown)
    # embeddings = your_embedding_logic(chunks)
    # points = [PointStruct(...) for chunk, embedding in zip(chunks, embeddings)]
    # vector_store_service.upsert_vectors(points)
    return {"message": f"Content for chapter {request.chapter_id} received for ingestion."}

@app.post("/auth/signup")
async def signup(request: SignupRequest):
    try:
        user_data = {
            "email": request.email,
            "password": request.password, # In a real app, hash this!
            "experience_level": request.experience_level
        }
        new_user = db_service.create_user(user_data) # Placeholder for actual DB interaction
        return {"message": "User registered successfully", "user_id": new_user.get("user_id")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/signin")
async def signin(request: SigninRequest):
    try:
        # Placeholder for actual authentication logic
        # In a real app, this would verify password hash and generate a token
        user = db_service.get_user_by_email(request.email) # Assuming a method like this exists
        if not user or user.get("password") != request.password: # Mock password check
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        return {"access_token": "mock_access_token", "token_type": "bearer"}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/user/preferences", response_model=UserPreferenceResponse)
async def update_user_preferences(request: UserPreferenceRequest):
    try:
        updated_pref = db_service.update_user_preference(request.user_id, request.dict())
        return UserPreferenceResponse(**updated_pref)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user/preferences", response_model=Dict[str, Any])
async def get_user_preferences(user_id: str):
    try:
        preferences = db_service.get_user_preferences(user_id)
        if not preferences:
            raise HTTPException(status_code=404, detail="User preferences not found")
        return preferences
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate/chapter", response_model=TranslateChapterResponse)
async def translate_chapter(request: TranslateChapterRequest):
    try:
        # Placeholder for actual translation service call (e.g., using OpenAI API)
        print(f"Translating chapter {request.chapter_id} content...")
        translated_text = f"Urdu translation of: {request.content_markdown}" # Mock translation
        return TranslateChapterResponse(translated_content=translated_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# For production, Uvicorn's default logging is often sufficient,
# but can be further configured via uvicorn.run's log_config or an external logging system.
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
