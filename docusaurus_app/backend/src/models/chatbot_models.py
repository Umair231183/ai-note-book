from pydantic import BaseModel
from typing import Optional, List

class QueryRequest(BaseModel):
    question: str

class ChatbotResponse(BaseModel):
    llm_answer: str
    source_documents: Optional[List[str]] = None