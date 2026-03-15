# Python Academy: Byte Invader

## 🎯 Project Objective
**Python Academy** (also known as *Byte Invader*) is an interactive, web-based RPG game designed to make learning Python programming engaging and fun. Players take on the role of a tactical Spartan commander infiltrating systems infected by an alien threat. To progress through the game and secure the world, players must navigate a fog-of-war map, avoid hidden mines, and "hack" enemy terminals by solving real Python coding challenges.

This gamified educational platform aims to bridge the gap between theoretical programming concepts and practical application by providing immediate, interactive feedback within a sci-fi narrative setting.

## 🚀 Features
- **Interactive 2D Grid Movement:** Explore a strategic map while avoiding hazards.
- **Embedded Python Code Editor:** Write and execute Python code directly in the browser.
- **Progressive Learning Curve:** Missions start from basic concepts (Variables) and scale up to more complex topics (Loops, Functions, Lists).
- **Real-Time Code Evaluation:** The backend verifies user-submitted Python code against hidden test cases.
- **Mini-Games:** Features like "Battleship" for when you step on a mine, providing a fun penalty mechanic.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Monaco Editor 
- **Backend:** FastAPI, Python, Uvicorn

## 🎮 How to Run Locally
1. **Start the Backend:**
   ```bash
   cd backend
   python -m venv venv
   # On Windows: .\venv\Scripts\activate
   # On Linux/Mac: source venv/bin/activate
   pip install fastapi uvicorn pydantic # install dependencies
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open the provided `localhost` link in your browser to start the mission.