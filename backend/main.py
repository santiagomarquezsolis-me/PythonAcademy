from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import json

from database.models import create_db_and_tables
from core.runner import run_user_code_with_test

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(title="Python Academy RPG", description="Backend MVP para evaluación de código", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir el contenido estático json de los niveles y las trivias
app.mount("/content", StaticFiles(directory="content"), name="content")

@app.get("/health")
def healthcheck():
    return {"status": "ok", "message": "Backend is running"}

@app.get("/api/v1/levels")
def get_levels():
    levels_path = "content/levels.json"
    if os.path.exists(levels_path):
        with open(levels_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data
    return {"levels": []}

class EvaluationRequest(BaseModel):
    level_id: str
    user_code: str

@app.post("/api/v1/evaluate")
def evaluate_code(req: EvaluationRequest):
    # En un caso real leeríamos de la BD o un sistema de archivos remoto
    # Para MVP, leeremos de los archivos locales de contenido.
    # El test lo suponemos ubicado en `content/tests/<level_id>.py`
    
    test_file_path = f"content/tests/{req.level_id}.py"
    if not os.path.exists(test_file_path):
        raise HTTPException(status_code=404, detail=f"No test found for level {req.level_id}")
        
    with open(test_file_path, "r", encoding="utf-8") as f:
        test_code = f.read()
        
    result = run_user_code_with_test(user_code=req.user_code, test_code=test_code)
    
    return {
        "success": result["success"],
        "output": result["output"],
        # A futuro: actualizar progreso en BD si la respuesta es exitosa
    }
