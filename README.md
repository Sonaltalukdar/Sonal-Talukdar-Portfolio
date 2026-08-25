a# Sonal Talukdar — Portfolio

Personal portfolio website with an integrated AI chat assistant ("SonalAI") that answers visitor
questions in first person, as Sonal, using live project/education/skill data.

**Live site:** https://sonal-talukdar-portfolio-frontend.onrender.com
**Backend API:** https://sonal-talukdar-portfolio-backend.onrender.com

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- Axios (API calls)
- react-icons / lucide-react

**Backend**
- FastAPI (Python)
- MongoDB (via Motor/PyMongo) — stores feedback submissions
- Groq API (LLaMA 3.3 70B) — powers the SonalAI chat assistant
- Email (SMTP) — feedback notification emails

**Deployment**
- Render (Web Service for backend, Static Site for frontend)

---

## Project Structure

```
Sonal Talukdar Portfolio/
├── backend/
│   ├── main.py              # FastAPI app entrypoint
│   ├── database.py          # MongoDB connection
│   ├── models.py            # Pydantic models
│   ├── routes/
│   │   ├── chat.py          # SonalAI chat endpoint (Groq)
│   │   ├── feedback.py      # Feedback form -> MongoDB + email
│   │   └── resume.py        # Resume PDF download endpoint
│   ├── requirements.txt
│   └── .env                 # Local secrets (never committed)
│
└── frontend/
    ├── src/
    │   ├── components/      # Home, Projects, Education, Footer, Navbar,
    │   │                       SonalAI, TechStack, Certificates, Feedback,
    │   │                       AdditionalSkills, AnimatedBackground
    │   ├── data/
    │   │   └── PortfolioData.js   # Central content (profile, projects, education, etc.)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`.

Create a `backend/.env` file (see `.env.example`) with:

```
MONGODB_URI=
DB_NAME=
GROQ_API_KEY=
FRONTEND_ORIGIN=
EMAIL_USER=
EMAIL_PASS=
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

Create a `frontend/.env` file with:

```
VITE_API_BASE_URL=http://localhost:8000
```

---

## Deployment (Render)

**Backend — Web Service**
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variables: same keys as `backend/.env` above

**Frontend — Static Site**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variable: `VITE_API_BASE_URL` = backend's live Render URL

⚠️ After deploying the frontend, update the backend's `FRONTEND_ORIGIN` environment variable to
the live frontend URL (not `localhost`) to avoid CORS errors.

---

## Features

- Fully responsive, animated single-page portfolio (Home, Education, Projects, Tech Stack,
  Certificates, Additional Skills, Feedback, Footer)
- **SonalAI** chat widget — speaks in first person as Sonal, answers questions about projects,
  education, and skills using grounded facts (no hallucinated details), matches the visitor's
  language/script (English, Bengali, or Banglish)
- Resume download directly from chat or hero section
- Feedback form that stores submissions in MongoDB and sends a confirmation email

---

## Notes

- `.env` files are git-ignored and must be configured manually in each environment (local + Render)
- Never commit real API keys/passwords — rotate any credential that is ever exposed