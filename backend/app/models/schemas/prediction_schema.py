from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class SinglePredictionInput(BaseModel):
    vehicle_type: str = Field("Heavy Truck", example="Heavy Truck")
    fuel_type: str = Field("diesel", example="diesel")
    distance_km: float = Field(..., example=120.5)
    payload_weight_kg: float = Field(5000.0, example=5000.0)
    average_speed_kmh: float = Field(55.0, example=55.0)
    route_type: str = Field("highway", example="highway") # highway, urban, mixed
    traffic_condition: str = Field("moderate", example="moderate") # light, moderate, heavy
    weather_condition: str = Field("clear", example="clear") # clear, rain, extreme_heat
    temperature_celsius: float = Field(28.0, example=28.0)
    driver_behavior_score: float = Field(8.5, example=8.5) # 1-10 rating

class ShapContribution(BaseModel):
    feature: str
    impact_value: float
    description: str

class SinglePredictionResponse(BaseModel):
    id: str
    vehicle_type: str
    fuel_type: str
    distance_km: float
    predicted_fuel_liters: float
    predicted_ghg_kg: float
    co2_kg: float
    ch4_kg: float
    n2o_kg: float
    confidence_score: float
    model_ensemble: Dict[str, float]
    shap_explanations: List[ShapContribution]
    created_at: datetime

class BatchPredictionInput(BaseModel):
    trips: List[SinglePredictionInput]

class BatchPredictionResponse(BaseModel):
    total_trips: int
    total_predicted_fuel_liters: float
    total_predicted_ghg_kg: float
    predictions: List[SinglePredictionResponse]
