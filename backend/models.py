from datetime import datetime
from pydantic import BaseModel, EmailStr


class FeedbackCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class FeedbackOut(BaseModel):
    id: str
    name: str
    message: str
    ai_reply: str | None = None
    created_at: datetime