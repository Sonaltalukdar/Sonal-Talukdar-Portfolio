import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
from fastapi import APIRouter, BackgroundTasks

from database import feedback_collection
from models import FeedbackCreate, FeedbackOut

router = APIRouter(prefix="/api/feedback", tags=["feedback"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def generate_ai_reply(message: str) -> str:
    """Generate a short thank-you reply with Groq if a key is configured,
    otherwise fall back to a static message."""
    if not GROQ_API_KEY:
        return "Thanks for the feedback — it means a lot!"

    try:
        from groq import Groq

        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": "You reply to portfolio-site feedback in 1-2 warm, short sentences.",
                },
                {"role": "user", "content": message},
            ],
            max_tokens=60,
        )
        return completion.choices[0].message.content.strip()
    except Exception:
        return "Thanks for the feedback — it means a lot!"


def send_email_notification(name: str, email: str, message: str) -> None:
    """Send an email to the portfolio owner when new feedback arrives.
    Silently skips if EMAIL_USER/EMAIL_PASS aren't configured, and never
    raises - a failed email should not break the feedback submission."""
    if not EMAIL_USER or not EMAIL_PASS:
        print("[email] SKIPPED — EMAIL_USER or EMAIL_PASS not set in .env")
        return

    print(f"[email] attempting to send from {EMAIL_USER}...")
    try:
        subject = f"New Portfolio Feedback from {name}"
        body = (
            f"You got new feedback on your portfolio!\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Message: {message}\n"
            f"Time: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}"
        )

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER

        # timeout=10 added — connection will fail fast instead of hanging forever
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, [EMAIL_USER], msg.as_string())
        print("[email] SENT successfully")
    except Exception as e:
        print(f"[email] FAILED to send notification: {e}")


def serialize(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "message": doc["message"],
        "ai_reply": doc.get("ai_reply"),
        "created_at": doc["created_at"],
    }


@router.post("", response_model=FeedbackOut)
def create_feedback(payload: FeedbackCreate, background_tasks: BackgroundTasks):
    ai_reply = generate_ai_reply(payload.message)
    doc = {
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "ai_reply": ai_reply,
        "created_at": datetime.utcnow(),
    }
    result = feedback_collection.insert_one(doc)
    doc["_id"] = result.inserted_id

    # email is now sent in the background — the response no longer waits for it
    background_tasks.add_task(send_email_notification, payload.name, payload.email, payload.message)

    return serialize(doc)


@router.get("", response_model=list[FeedbackOut])
def list_feedback():
    docs = feedback_collection.find().sort("created_at", -1)
    return [serialize(d) for d in docs]