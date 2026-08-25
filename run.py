import os
import sys
import subprocess
import threading
import time
import webbrowser

# ANSI Colors
GREEN = "\033[92m"
BLUE = "\033[94m"
MAGENTA = "\033[95m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
RESET = "\033[0m"

def print_color(text, color):
    # Check if terminal supports color (simple check)
    if os.name == 'nt':
        # Enable virtual terminal processing on Windows for ANSI colors
        try:
            import ctypes
            kernel32 = ctypes.windll.kernel32
            kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
        except Exception:
            pass
    try:
        print(f"{color}{text}{RESET}")
    except UnicodeEncodeError:
        # Fallback for Windows consoles that don't support emoji/unicode characters
        clean_text = text.encode('ascii', 'ignore').decode('ascii')
        print(f"{color}{clean_text}{RESET}")

def run_backend():
    print_color("🚀 Starting FastAPI Backend on http://127.0.0.1:8000...", BLUE)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    requirements_path = os.path.join(backend_dir, "requirements.txt")
    
    print_color("Checking Python requirements...", BLUE)
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", requirements_path])
    except Exception as e:
        print_color(f"Warning: Failed to auto-install Python requirements: {e}", YELLOW)
        print_color("Please install them manually using: pip install -r backend/requirements.txt", YELLOW)

    # Start FastAPI
    try:
        subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"], cwd=backend_dir, check=True)
    except Exception as e:
        print_color(f"Error starting FastAPI backend: {e}", YELLOW)

def run_frontend():
    print_color("🚀 Starting Vite React Frontend on http://localhost:5173...", MAGENTA)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(base_dir, "frontend")
    
    # Check node_modules
    if not os.path.exists(os.path.join(frontend_dir, "node_modules")):
        print_color("npm modules not found. Running npm install (this may take a minute)...", MAGENTA)
        try:
            # Use shell=True for windows npm compatibility
            subprocess.run("npm install", shell=True, cwd=frontend_dir, check=True)
            print_color("npm modules installed successfully!", GREEN)
        except Exception as e:
            print_color(f"Error installing npm modules: {e}", YELLOW)
            print_color("Please run 'npm install' inside the 'frontend' folder manually.", YELLOW)
            return

    # Run Vite dev server
    try:
        subprocess.run("npm run dev", shell=True, cwd=frontend_dir, check=True)
    except Exception as e:
        print_color(f"Error starting Vite dev server: {e}", YELLOW)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Start Backend Thread
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Wait briefly for FastAPI to bootstrap
    time.sleep(2)
    
    # Start Frontend Thread
    frontend_thread = threading.Thread(target=run_frontend, daemon=True)
    frontend_thread.start()
    
    # Wait and then open Browser
    time.sleep(4)
    print_color("\n✨ Opening AstroMate in your default browser... ✨", GREEN)
    webbrowser.open("http://localhost:5173")
    
    # Keep main script alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print_color("\n🌌 Cosmic connection closed. Farewell!", CYAN)
