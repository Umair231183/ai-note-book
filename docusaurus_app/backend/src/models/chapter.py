from pydantic import BaseModel, Field
from typing import Optional, List, Any

class Chapter(BaseModel):
    chapter_id: str = Field(..., description="Unique identifier for the chapter.")
    module_id: str = Field(..., description="Foreign key to the Module this chapter belongs to.")
    title: str = Field(..., description="Title of the chapter.")
    order: int = Field(..., description="Sequential order of the chapter within its module.")
    content: str = Field(..., description="Raw Markdown content of the chapter.")
    learning_outcomes: Optional[str] = Field(None, description="Textual description of learning objectives.")
    key_takeaways: Optional[str] = Field(None, description="Summary points of the chapter.")
    quiz_data: Optional[Any] = Field(None, description="Structure representing quiz questions and answers.")
    urdu_content: Optional[str] = Field(None, description="Optional translated Markdown content in Urdu.")