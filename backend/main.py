"""Cyber Sentinel AI -- FastAPI entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Cyber Sentinel AI", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.router import router
app.include_router(router)

@app.get("/")
def root():
    return {"name": "cyber-sentinel-ai", "docs": "/docs"}
