from fastapi import FastAPI
from backend.app.core.config import settings
from backend.app.core.security import setup_security_and_cors
from backend.app.core.logging import logger
from backend.app.api.v1.api import api_router
from backend.app.models.database.base import Base, engine

# Create DB tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="GreenFleet AI: Comprehensive Green Fleet Management, GHG Emission Prediction, and Quantum-Inspired Optimization Engine."
)

setup_security_and_cors(app)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "status": "online",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting GreenFleet AI FastAPI Server...")
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
