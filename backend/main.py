"""Cyber Sentinel AI -- FastAPI entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Cyber Sentinel AI", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.frontend_router import router as frontend_router
app.include_router(frontend_router)

try:
    from api.router import router as agent_router
    app.include_router(agent_router)
except Exception as exc:  # pragma: no cover -- agent deps optional in dev
    import logging
    logging.getLogger("uvicorn.error").warning(
        "Agent router disabled (install full requirements.txt): %s", exc
    )

@app.get("/")
def root():
    return {"name": "cyber-sentinel-ai", "docs": "/docs"}
