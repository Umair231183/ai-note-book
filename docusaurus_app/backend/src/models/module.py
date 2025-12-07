from pydantic import BaseModel, Field
from typing import Optional

class Module(BaseModel):
    module_id: str = Field(..., description="Unique identifier for the module.")
    textbook_id: str = Field(..., description="Foreign key to the Textbook this module belongs to.")
    title: str = Field(..., description="Title of the module.")
    order: int = Field(..., description="Sequential order of the module within the textbook.")