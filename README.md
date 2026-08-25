# 🔮 AstroMate — AI Astrological Platform

AstroMate is a full-stack astrological platform powered by **Google Gemini AI**, built with a **FastAPI** backend and a **Vite + React** frontend with **Tailwind CSS**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌟 **Daily Horoscope** | Personalized daily readings for all 12 zodiac signs |
| 🌀 **Birth Chart** | AI-generated natal chart interpretations (Vedic & Western) |
| 💖 **Synastry Match** | Relationship & love compatibility analysis with percentage scores |
| 🔮 **Astro Chat** | Live AI astrologer consultation via Gemini generative AI |

---

## 🚀 Tech Stack

- **Frontend**: Vite, React 18, Tailwind CSS, marked.js
- **Backend**: FastAPI, Uvicorn, Python 3.11+
- **AI**: Google Gemini Generative AI (`gemini-3.6-flash`)
- **Fonts**: Cinzel (Serif) + Inter from Google Fonts
- **Icons**: FontAwesome 6

---

## 📁 Project Structure

```
AstroMate/
├── backend/
│   ├── main.py            # FastAPI API endpoints
│   ├── requirements.txt   # Python dependencies
│   └── .env               # API key configuration (not committed)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx  # Dedicated cosmic landing page
│   │   │   ├── Dashboard.jsx    # Tabbed application shell
│   │   │   ├── StarField.jsx    # Animated canvas starfield background
│   │   │   ├── ZodiacTab.jsx    # Daily Horoscope feature
│   │   │   ├── BirthChartTab.jsx # Birth Chart feature
│   │   │   ├── MatchTab.jsx     # Compatibility feature
│   │   │   └── ChatTab.jsx      # AI Chat feature
│   │   ├── App.jsx              # Landing ↔ Dashboard view router
│   │   └── main.jsx             # React mount
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── run.py                 # Unified startup script
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- A [Google Gemini API Key](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/raj-deep-20/AstroMate-.git
cd AstroMate-
```

### 2. Set up Your Gemini API Key
Create a `.env` file in the `backend/` folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
HOST=127.0.0.1
```

For a deployed frontend, set the Vite environment variable to the deployed backend URL:
```env
VITE_API_URL=https://your-backend-name.onrender.com
```
Set this in the frontend host's environment settings before building or redeploying. Do not include a trailing slash.

The included `render.yaml` configures the backend to listen on Render's assigned port. If configuring Render manually, use `backend` as the root directory, `pip install -r requirements.txt` as the build command, and `python -m uvicorn main:app --host 0.0.0.0 --port $PORT` as the start command.

### 3. Run the Application
```bash
python run.py
```

This automatically:
- Installs all Python & npm dependencies
- Starts the FastAPI backend on `http://127.0.0.1:8000`
- Starts the Vite React frontend on `http://localhost:5173`
- Opens the browser to the landing page

---

## 🌌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/api/horoscope` | Get daily zodiac reading |
| `POST` | `/api/birthchart` | Get natal chart interpretation |
| `POST` | `/api/compatibility` | Get synastry compatibility score |
| `POST` | `/api/chat` | Chat with AI astrologer |

---

## 📝 License
MIT License — Open source and free to use.
