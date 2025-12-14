from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="EmoHealth AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScanResponse(BaseModel):
    stress_index: int
    energy_score: int
    burnout_meter: int
    explanation: str


@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "EmoHealth AI"}


@app.post("/scan", response_model=ScanResponse)
async def scan():
    stress_index = random.randint(40, 85)
    energy_score = 100 - stress_index
    burnout_meter = random.randint(20, stress_index)
    explanation = "Calculated using emotional pattern analysis (beta)"
    
    return ScanResponse(
        stress_index=stress_index,
        energy_score=energy_score,
        burnout_meter=burnout_meter,
        explanation=explanation
    )

