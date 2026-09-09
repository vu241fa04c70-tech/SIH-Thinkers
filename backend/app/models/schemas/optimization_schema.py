from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class Location(BaseModel):
    id: str
    name: str
    lat: float
    lng: float
    demand_kg: float = 0.0
    time_window_start: Optional[str] = "08:00"
    time_window_end: Optional[str] = "18:00"

class VehicleCandidate(BaseModel):
    id: str
    vehicle_id: str
    type: str
    fuel_type: str
    max_payload_kg: float
    fuel_efficiency_km_l: float = 4.0

class OptimizationInput(BaseModel):
    optimization_type: str = Field("combined", example="combined") # fleet_allocation, route, combined
    depot_location: Location
    tasks: List[Location]
    available_vehicles: List[VehicleCandidate]
    alpha_fuel: float = Field(0.4, description="Weight for fuel cost")
    beta_ghg: float = Field(0.3, description="Weight for GHG emissions")
    gamma_time: float = Field(0.2, description="Weight for travel time")
    delta_penalty: float = Field(0.1, description="Weight for constraint violations")

class RouteSegment(BaseModel):
    vehicle_id: str
    vehicle_type: str
    assigned_tasks: List[str]
    total_distance_km: float
    estimated_time_minutes: float
    predicted_fuel_liters: float
    predicted_ghg_kg: float
    route_waypoints: List[Dict[str, float]] # [{'lat': ..., 'lng': ...}]

class OptimizationResponse(BaseModel):
    id: str
    optimization_type: str
    status: str
    total_vehicles_used: int
    total_distance_km: float
    total_predicted_fuel_liters: float
    total_predicted_ghg_kg: float
    fuel_reduction_percentage: float
    ghg_reduction_percentage: float
    qubo_energy_score: float
    computation_time_ms: int
    routes: List[RouteSegment]
    created_at: datetime
