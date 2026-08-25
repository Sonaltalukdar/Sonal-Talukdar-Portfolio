import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import feedback, resume, chat

load_dotenv()

app = FastAPI(title="Sonal Talukdar Portfolio API")

origins = [os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(feedback.router)
app.include_router(resume.router)
app.include_router(chat.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "portfolio-api"}