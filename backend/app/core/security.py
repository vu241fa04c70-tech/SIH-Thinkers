from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from backend.app.core.config import settings

def setup_security_and_cors(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
