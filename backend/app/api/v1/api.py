from fastapi import APIRouter
from backend.app.api.v1.endpoints import vehicles, predictions, optimization, analytics, routes

api_router = APIRouter()

api_router.include_router(vehicles.router, prefix="/vehicles", tags=["Vehicles"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
api_router.include_router(optimization.router, prefix="/optimization", tags=["QUBO Optimization"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(routes.router, prefix="/routes", tags=["Routes"])
