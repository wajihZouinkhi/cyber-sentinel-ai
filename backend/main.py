"""Cyber Sentinel AI - FastAPI entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Cyber Sentinel AI",
    description="Multi-agent cybersecurity platform: threat detection, CVE triage, MITRE ATT&CK mapping.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0.0"}


@app.get("/")
def root():
    return {"message": "Cyber Sentinel AI backend", "docs": "/docs"}


try:
    from api.router import router as api_router
    app.include_router(api_router)
except Exception:
    pass
