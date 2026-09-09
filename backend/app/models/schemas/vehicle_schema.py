from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class VehicleBase(BaseModel):
    vehicle_id: str = Field(..., example="TRK-1001")
    type: str = Field(..., example="Heavy Truck") # Heavy Truck, Medium Van, EV Bus, etc.
    fuel_type: str = Field(..., example="diesel") # diesel, petrol, cng, electric
    make: Optional[str] = "Tata Motors"
    model: Optional[str] = "Prima 2830.K"
    year: Optional[int] = 2022
    engine_capacity: Optional[float] = 6.7
    curb_weight: Optional[float] = 8500.0
    max_payload: Optional[float] = 18000.0
    fuel_tank_capacity: Optional[float] = 300.0
    emission_standard: Optional[str] = "BS6"
    status: Optional[str] = "active"

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    type: Optional[str] = None
    fuel_type: Optional[str] = None
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    engine_capacity: Optional[float] = None
    curb_weight: Optional[float] = None
    max_payload: Optional[float] = None
    fuel_tank_capacity: Optional[float] = None
    emission_standard: Optional[str] = None
    status: Optional[str] = None

class VehicleResponse(VehicleBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
