# 🌐 Sonal Talukdar — Portfolio

Personal portfolio website featuring an integrated chat assistant that speaks in first person as
Sonal, answering visitor questions about projects, education, and skills using grounded, factual
data (no hallucinations).

🔗 **Live Site:**
[sonal-talukdar-portfolio-frontend.onrender.com](https://sonal-talukdar-portfolio-frontend.onrender.com)

⚙️ **Backend API:**
[sonal-talukdar-portfolio-backend.onrender.com](https://sonal-talukdar-portfolio-backend.onrender.com)

---

## ✨ Features

- 🎨 Fully responsive, animated single-page portfolio — Home, Education, Projects, Tech Stack,
  Certificates, Additional Skills, Feedback, Footer
- 🤖 **Chat Widget** — talks in first person as Sonal, understands English, Bengali, and
  Banglish (Bengali written in Roman letters)
- 📄 One-click resume download, straight from chat or the hero section
- 📬 Feedback form that saves submissions to MongoDB and sends a confirmation email
- 🚀 Deployed on Render with auto-deploy on every push

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| ⚛️ React + Vite | UI framework & build tool |
| 🎨 Tailwind CSS | Styling |
| 🎬 Framer Motion | Animations |
| 🔌 Axios | API requests |
| 🧩 react-icons / lucide-react | Icons |

### Backend
| Tech | Purpose |
|---|---|
| 🐍 FastAPI | REST API framework |
| 🍃 MongoDB (Motor/PyMongo) | Stores feedback submissions |
| 🧠 Groq API (LLaMA 3.3 70B) | Powers the chat assistant |
| ✉️ SMTP (Gmail) | Feedback confirmation emails |

### Deployment
| Service | Type |
|---|---|
| Render | Web Service (backend) + Static Site (frontend) |

---

## 📁 Project Structure

```
Sonal Talukdar Portfolio/
├── backend/
│   ├── main.py              # FastAPI app entrypoint
│   ├── database.py          # MongoDB connection
│   ├── models.py            # Pydantic models
│   ├── routes/
│   │   ├── chat.py          # Chat endpoint (Groq)
│   │   ├── feedback.py      # Feedback form to MongoDB + email
│   │   └── resume.py        # Resume PDF download endpoint
│   ├── requirements.txt
│   └── .env                 # Local secrets (never committed)
│
└── frontend/
    ├── src/
    │   ├── components/       # Home, Projects, Education, Footer, Navbar,
    │   │                        SonalAI, TechStack, Certificates, Feedback,
    │   │                        AdditionalSkills, AnimatedBackground
    │   ├── data/
    │   │   └── PortfolioData.js   # Central content (profile, projects, education, etc.)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---

## 🚀 Local Setup

### 1️⃣ Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at `http://localhost:8000`.

Create `backend/.env`:

```env
MONGODB_URI=
DB_NAME=
GROQ_API_KEY=
FRONTEND_ORIGIN=
EMAIL_USER=
EMAIL_PASS=
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## ☁️ Deployment (Render)

**Backend — Web Service**
- 📂 Root Directory: `backend`
- 🔨 Build Command: `pip install -r requirements.txt`
- ▶️ Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- 🔑 Environment variables: same keys as `backend/.env` above

**Frontend — Static Site**
- 📂 Root Directory: `frontend`
- 🔨 Build Command: `npm install && npm run build`
- 📦 Publish Directory: `dist`
- 🔑 Environment variable: `VITE_API_BASE_URL` → backend's live Render URL

> ⚠️ After deploying the frontend, update the backend's `FRONTEND_ORIGIN` environment variable to
> the live frontend URL (not `localhost`) to avoid CORS errors.

---

## 🔒 Security Notes

- `.env` files are git-ignored and must be configured manually in each environment
- Never commit real API keys or passwords — rotate any credential that is ever exposed publicly

---

## 👩‍💻 Author

**Sonal Talukdar** — Aspiring Full Stack Engineer
📧 sonaltalukdar29@gmail.com