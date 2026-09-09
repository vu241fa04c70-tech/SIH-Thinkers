from sqlalchemy import Column, String, Float, DateTime, JSON, ForeignKey, func
import uuid
from backend.app.models.database.base import Base

class PredictionModel(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    prediction_type = Column(String(30), nullable=False) # single, batch, route
    vehicle_id = Column(String(36), ForeignKey("vehicles.id"), nullable=True)
    input_data = Column(JSON, nullable=False)
    predicted_fuel_liters = Column(Float, nullable=False)
    predicted_ghg_kg = Column(Float, nullable=False)
    confidence_score = Column(Float)
    model_version = Column(String(20), default="1.0.0")
    shap_explanations = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now())
