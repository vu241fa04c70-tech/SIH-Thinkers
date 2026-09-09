from sqlalchemy import Column, String, Integer, Float, DateTime, func
import uuid
from backend.app.models.database.base import Base

class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    vehicle_id = Column(String(50), unique=True, nullable=False, index=True)
    type = Column(String(50), nullable=False) # truck, van, bus, electric_van, etc.
    fuel_type = Column(String(30), nullable=False) # diesel, petrol, cng, electric
    make = Column(String(100))
    model = Column(String(100))
    year = Column(Integer)
    engine_capacity = Column(Float)
    curb_weight = Column(Float)
    max_payload = Column(Float)
    fuel_tank_capacity = Column(Float)
    emission_standard = Column(String(20)) # BS4, BS6, Euro 6, etc.
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
