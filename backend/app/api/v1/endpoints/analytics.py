from fastapi import APIRouter
from backend.app.services.analytics.fleet_analyzer import FleetAnalyzerService
from backend.app.services.analytics.performance_metrics import PerformanceMetricsService

router = APIRouter()

@router.get("/fleet-summary")
def get_fleet_summary():
    return FleetAnalyzerService.get_fleet_summary()

@router.get("/trends")
def get_trend_analysis(days: int = 30):
    return FleetAnalyzerService.get_trend_analysis(days)

@router.get("/vehicle-ranking")
def get_vehicle_rankings():
    return FleetAnalyzerService.get_vehicle_rankings()

@router.get("/roi-calculator")
def calculate_roi(fleet_size: int = 50, avg_km_per_day: float = 180.0, fuel_price: float = 1.25):
    return PerformanceMetricsService.calculate_roi_projection(fleet_size, avg_km_per_day, fuel_price)
