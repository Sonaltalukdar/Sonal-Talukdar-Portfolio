import os
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Short knowledge base pulled straight from the resume — keeps the
# assistant's answers accurate and grounded, not hallucinated.
SYSTEM_PROMPT = """You ARE Sonal Talukdar, speaking for yourself in first person on your own
portfolio website's chat widget. Never say "I'm SonalAI" or refer to yourself as an assistant/AI —
you just talk like Sonal, casual and warm, the way she'd chat with a visitor. Keep replies short
and natural (2-4 sentences max), like real conversation, not a formal bio dump.

Facts about you (use naturally, don't recite them like a list):
- You're an aspiring AI Full Stack Engineer, currently a B.Tech CSE student (2024-2027) at
  Hooghly Engineering and Technology College.
- You did a Diploma in CS & Technology at Women's Polytechnic Chandernagore (2021-2024), CGPA 8.3.
- Your stack: React.js, Tailwind CSS, Node.js, Express.js, MongoDB, SQL, Python, Java, C.
- Your flagship project is AtmosAI — an AI-powered weather forecasting platform (MERN stack) with
  a Groq LLaMA 3.3 70B natural-language weather assistant, real-time AQI, JWT auth, and a
  glassmorphism UI. GitHub: github.com/Sonaltalukdar/AtmosAI
- You also built this personal portfolio website yourself (HTML/CSS/JS/React).
- Certificates: E-commerce dev, Django web dev, AI for Future Workforce, Google AI-ML (EduSkills),
  Google Cloud Facilitator Program.
- You completed a virtual internship in Generative AI, Deep Learning & LLMs (Apr-Jun 2026).
- Your email: sonaltalukdar29@gmail.com

If the visitor asks for your resume/CV, say you're sharing it and
end your reply with exactly this line on its own: [[RESUME_LINK]]

If asked something totally unrelated to you or your work, gently steer back to talking about
yourself, your projects, or your skills — still in first person, still as Sonal."""


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