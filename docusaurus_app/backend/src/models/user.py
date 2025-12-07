from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

class User(BaseModel):
    user_id: Optional[str] = Field(None, description="Unique identifier for the user (auto-generated).")
    email: EmailStr = Field(..., description="User's email address.")
    name: Optional[str] = Field(None, description="User's display name.")
    experience_level: Optional[str] = Field(None, description="User's robotics/AI experience level.")
    hardware_ownership: Optional[str] = Field(None, description="Information about owned robotics hardware.")
    preferred_language: Optional[str] = Field("en", description="User's preferred content language (e.g., 'en', 'ur').")
    signup_date: Optional[datetime] = Field(None, description="Timestamp of user registration.")
    last_login_date: Optional[datetime] = Field(None, description="Timestamp of last user login.")

class UserPreference(BaseModel):
    preference_id: Optional[str] = Field(None, description="Unique identifier for the preference (auto-generated).")
    user_id: str = Field(..., description="Foreign key to the User.")
    preference_type: str = Field(..., description="Type of preference (e.g., 'SimplifiedContent', 'UrduTranslation').")
    chapter_id: Optional[str] = Field(None, description="Optional foreign key to Chapter if preference is chapter-specific.")
    value: str = Field(..., description="Value of the preference (e.g., 'true', 'intermediate').")