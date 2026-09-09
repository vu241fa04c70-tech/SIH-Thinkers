import os
from pydantic_settings import BaseSettings
from typing import List, Union

class Settings(BaseSettings):
    PROJECT_NAME: str = "GREENFLEET AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super-secret-greenfleet-key-change-in-production-2026"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ]
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./greenfleet.db"  # Fallback to local SQLite if Postgres is not configured
    )
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Models path
    MODEL_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_models")
    
    class Config:
        case_sensitive = True

settings = Settings()
