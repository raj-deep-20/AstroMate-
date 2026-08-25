import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load env variables
load_dotenv()

app = FastAPI(title="AstroMate Backend API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
gemini_available = False

if api_key and api_key.strip():
    try:
        genai.configure(api_key=api_key.strip())
        gemini_available = True
    except Exception as e:
        print(f"Error configuring Gemini: {e}")

class HoroscopeRequest(BaseModel):
    sign: str
    date: str

class BirthChartRequest(BaseModel):
    name: str
    date: str
    time: str
    place: str

class CompatibilityRequest(BaseModel):
    name1: str
    sign1: str
    name2: str
    sign2: str

class ChatMessage(BaseModel):
    role: str  # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    history: list[ChatMessage]
    message: str

def generate_gemini_content(prompt: str, system_instruction: str = None) -> str:
    """Helper function to call Gemini API or return mock if API key is missing."""
    if not gemini_available:
        return (
            "✨ **[AstroMate Simulation Mode]** ✨\n\n"
            "Your cosmic request was processed successfully, but the Gemini API Key is missing or invalid in your `backend/.env` file!\n\n"
            "Here is what the alignment would look like:\n"
            "- *Cosmic Energy:* High potential, pending API connection.\n"
            "- *Guidance:* Please add your `GEMINI_API_KEY` to the `.env` file in the `backend/` folder and restart the server to receive live AI readings!\n\n"
            f"*(Sent prompt: \"{prompt[:60]}...\")*"
        )
    
    try:
        # Use gemini-2.5-flash for maximum stability and speed
        model = genai.GenerativeModel(
            model_name="gemini-3.6-flash",
            system_instruction=system_instruction
        )
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"🔮 The cosmos are foggy right now (API Error: {str(e)}). Please double check your Gemini API key in `backend/.env` and try again."

@app.get("/")
def read_root():
    return {
        "status": "online",
        "gemini_connected": gemini_available,
        "message": "Welcome to AstroMate Cosmic API!"
    }

@app.post("/api/horoscope")
def get_horoscope(req: HoroscopeRequest):
    prompt = (
        f"Give a detailed astrological daily horoscope reading for the zodiac sign '{req.sign}' "
        f"on the date {req.date}. Format the response in markdown with sections for:\n"
        f"- 🌟 **Cosmic Energy** (overall daily theme)\n"
        f"- 💖 **Love & Connection**\n"
        f"- 💼 **Career & Wealth**\n"
        f"- 🔮 **Lucky Elements** (Lucky number, color, and hour of the day)\n"
        f"Keep the tone mystical, encouraging, and rich with astral imagery."
    )
    system_instruction = "You are a professional, mystical astrologer who writes poetic yet insightful daily horoscopes."
    result = generate_gemini_content(prompt, system_instruction)
    return {"reading": result}

@app.post("/api/birthchart")
def get_birthchart(req: BirthChartRequest):
    prompt = (
        f"Create a personalized birth chart (natal chart) cosmic blueprint for {req.name}, "
        f"born on {req.date} at {req.time} in {req.place}.\n"
        f"Since you are an AI, estimate/simulate their key zodiac signs and house placements, and provide sections for:\n"
        f"- 🌞 **Core Essence (Sun Sign Placement)**\n"
        f"- 🌙 **Emotional Landscape (Moon Sign Placement)**\n"
        f"- 🌅 **Personality Mask (Ascendant/Rising Sign Placement)**\n"
        f"- 🌌 **Major Planetary Placements & Life Theme** (e.g. Mercury, Venus, Mars houses)\n"
        f"- 🕉️ **Spiritual Growth & Destiny Guidance**\n"
        f"Format clearly in markdown with beautiful headers and bullet points."
    )
    system_instruction = "You are a master Vedic and Western astrologer crafting detailed natal chart blueprints."
    result = generate_gemini_content(prompt, system_instruction)
    return {"reading": result}

@app.post("/api/compatibility")
def get_compatibility(req: CompatibilityRequest):
    prompt = (
        f"Analyze the astrological love and relationship compatibility between "
        f"{req.name1} (Zodiac sign: {req.sign1}) and {req.name2} (Zodiac sign: {req.sign2}).\n"
        f"Provide the following sections:\n"
        f"- ⚖️ **Cosmic Chemistry (Element Balance: Fire/Earth/Air/Water)**\n"
        f"- 💬 **Communication & Intellectual Harmony**\n"
        f"- ❤️ **Emotional & Romantic Resonance**\n"
        f"- 🏆 **Compatibility Score**: Give a percentage rating (e.g. 85%) and explain the score.\n"
        f"- 🌟 **Cosmic Advice** (How they can balance their differences)\n"
        f"Format the output beautifully in markdown."
    )
    system_instruction = "You are a Relationship Synastry expert analyzing planetary compatibility."
    result = generate_gemini_content(prompt, system_instruction)
    return {"reading": result}

@app.post("/api/chat")
def run_chat(req: ChatRequest):
    # Convert incoming history list to Gemini chat format or construct a prompt string
    # To keep it simple and robust across API variations, we will format history into a single combined context prompt
    system_instruction = (
        "You are AstroMate AI, a wise, mystical, and friendly personal astrologer. "
        "The user is consulting you. Give short, celestial, and supportive answers to their questions. "
        "Use markdown formatting and celestial emojis. Do not output code."
    )
    
    context = ""
    for msg in req.history:
        role_label = "User" if msg.role == "user" else "Astrologer"
        context += f"{role_label}: {msg.content}\n\n"
    
    context += f"User: {req.message}\nAstrologer:"
    
    result = generate_gemini_content(context, system_instruction)
    return {"response": result}
