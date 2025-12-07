from pydantic import BaseModel, Field
from typing import Optional, List

class Subagent(BaseModel):
    agent_id: str = Field(..., description="Unique identifier for the subagent.")
    name: str = Field(..., description="Name of the subagent (e.g., 'ContentAgent').")
    description: Optional[str] = Field(None, description="Description of the subagent's function.")
    skills: List[str] = Field([], description="List of AgentSkill IDs that this subagent possesses.")

class AgentSkill(BaseModel):
    skill_id: str = Field(..., description="Unique identifier for the agent skill.")
    name: str = Field(..., description="Name of the skill (e.g., 'CodeExplainer').")
    description: Optional[str] = Field(None, description="Description of what the skill does.")
    api_endpoint: Optional[str] = Field(None, description="Internal API endpoint to invoke this skill.")