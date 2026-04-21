"""Cyber Sentinel AI -- FastAPI entrypoint."""
import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

log = logging.getLogger("uvicorn.error")

def _parse_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", "").strip()
    if not raw:
        frontend_url = os.getenv("FRONTEND_URL", "").strip()
        if frontend_url:
            return [frontend_url]
        return ["http://localhost:3000", "http://127.0.0.1:3000"]
    if raw == "*":
        return ["*"]
    return [o.strip() for o in raw.split(",") if o.strip()]

ALLOW_ORIGINS = _parse_origins()
ALLOW_CREDENTIALS = ALLOW_ORIGINS != ["*"]

app = FastAPI(title="Cyber Sentinel AI", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=ALLOW_CREDENTIALS,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.frontend_router import router as frontend_router
app.include_router(frontend_router)

try:
    from api.router import router as agent_router
    app.include_router(agent_router)
    log.info("Agent router mounted.")
except Exception as exc:  # pragma: no cover
    log.warning("Agent router disabled (install full requirements.txt): %s", exc)

@app.get("/")
def root():
    return {"name": "cyber-sentinel-ai", "docs": "/docs"}
