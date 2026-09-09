from sqlalchemy import Column, String, Float, Integer, DateTime, JSON, func
import uuid
from backend.app.models.database.base import Base

class OptimizationModel(Base):
    __tablename__ = "optimizations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    optimization_type = Column(String(30), nullable=False) # fleet_allocation, route, combined
    input_parameters = Column(JSON, nullable=False)
    constraints = Column(JSON)
    results = Column(JSON, nullable=False)
    total_predicted_fuel = Column(Float)
    total_predicted_ghg = Column(Float)
    optimization_score = Column(Float)
    computation_time_ms = Column(Integer)
    status = Column(String(20), default="completed")
    created_at = Column(DateTime, default=func.now())
