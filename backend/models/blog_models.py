from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str = ""
    publishDate: str
    readTime: str
    category: str
    url: str
    author: str = "G.J. Rahul"
    featuredImage: Optional[str] = None

class BlogPostsResponse(BaseModel):
    posts: List[BlogPost]
    totalPosts: int
    lastFetched: str
    isFallback: Optional[bool] = False

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    message: str = Field(..., min_length=1, max_length=1000)