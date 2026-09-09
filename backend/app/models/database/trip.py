from sqlalchemy import Column, String, Integer, Float, DateTime, Date, JSON, ForeignKey, func
import uuid
from backend.app.models.database.base import Base

class TripModel(Base):
    __tablename__ = "trips"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    vehicle_id = Column(String(36), ForeignKey("vehicles.id"), nullable=False, index=True)
    trip_date = Column(Date, nullable=False, index=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    start_location = Column(JSON) # {"lat": ..., "lng": ..., "address": ...}
    end_location = Column(JSON)
    distance_km = Column(Float, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    average_speed = Column(Float)
    max_speed = Column(Float)
    payload_weight = Column(Float)
    fuel_consumed_liters = Column(Float, nullable=False)
    route_type = Column(String(30)) # highway, urban, mixed
    traffic_condition = Column(String(20)) # light, moderate, heavy
    weather_condition = Column(String(30))
    temperature_celsius = Column(Float)
    driver_id = Column(String(50))
    created_at = Column(DateTime, default=func.now())
