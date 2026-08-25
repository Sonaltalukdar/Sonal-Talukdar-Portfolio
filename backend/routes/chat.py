import os
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Short knowledge base pulled straight from the resume — keeps the
# assistant's answers accurate and grounded, not hallucinated.
SYSTEM_PROMPT = """You are SonalAI, the assistant embedded on Sonal Talukdar's portfolio website.
Answer visitor questions about Sonal in a friendly, concise way (2-4 sentences max).

About Sonal:
- Aspiring AI Full Stack Engineer, B.Tech CSE student (2024-2027), Hooghly Engineering and Technology College.
- Diploma in CS & Technology, Women's Polytechnic Chandernagore (2021-2024), CGPA 8.3.
- Stack: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, SQL, Python, Java, C.
- Flagship project: AtmosAI — an AI-powered weather forecasting platform (MERN stack) with a
  Groq LLaMA 3.3 70B natural-language weather assistant, real-time AQI, JWT auth, and a
  glassmorphism UI. GitHub: github.com/Sonaltalukdar/AtmosAI
- Also built a personal portfolio website (HTML/CSS/JS).
- Certificates: E-commerce dev, Django web dev, AI for Future Workforce, Google AI-ML (EduSkills),
  Google Cloud Facilitator Program.
- Completed a virtual internship in Generative AI, Deep Learning & LLMs (Apr-Jun 2026).
- Contact: sonaltalukdar29@gmail.com

If the visitor asks for Sonal's resume/CV, tell them you're sharing the download link and
end your reply with exactly this line on its own: [[RESUME_LINK]]

If asked something unrelated to Sonal or her work, politely redirect to her portfolio topics."""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@router.post("")
def chat(payload: ChatRequest):
    if not GROQ_API_KEY:
        return {"reply": "SonalAI isn't configured yet — add GROQ_API_KEY in backend/.env to enable it."}

    try:
        from groq import Groq

        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "system", "content": SYSTEM_PROMPT}]
            + [m.model_dump() for m in payload.messages][-10:],  # keep last 10 turns
            max_tokens=200,
            temperature=0.6,
        )
        return {"reply": completion.choices[0].message.content.strip()}
    except Exception:
        return {"reply": "Something went wrong reaching SonalAI right now. Please try again shortly."}