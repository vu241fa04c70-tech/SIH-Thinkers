from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session

from backend.app.models.schemas.prediction_schema import (
    SinglePredictionInput, SinglePredictionResponse,
    BatchPredictionInput, BatchPredictionResponse
)
from backend.app.services.prediction.fuel_predictor import FuelPredictorService
from backend.app.models.database.base import get_db
from backend.app.models.database.prediction import PredictionModel

router = APIRouter()

@router.post("/single", response_model=SinglePredictionResponse)
def predict_single_trip(input_data: SinglePredictionInput, db: Session = Depends(get_db)):
    try:
        res = FuelPredictorService.predict_single(input_data.model_dump())
        
        # Save to DB record
        pred_record = PredictionModel(
            id=res["id"],
            prediction_type="single",
            input_data=input_data.model_dump(),
            predicted_fuel_liters=res["predicted_fuel_liters"],
            predicted_ghg_kg=res["predicted_ghg_kg"],
            confidence_score=res["confidence_score"],
            shap_explanations=res["shap_explanations"]
        )
        db.add(pred_record)
        db.commit()
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch", response_model=BatchPredictionResponse)
def predict_batch_trips(input_data: BatchPredictionInput, db: Session = Depends(get_db)):
    results = []
    total_fuel = 0.0
    total_ghg = 0.0
    
    for trip in input_data.trips:
        res = FuelPredictorService.predict_single(trip.model_dump())
        results.append(res)
        total_fuel += res["predicted_fuel_liters"]
        total_ghg += res["predicted_ghg_kg"]
        
    return {
        "total_trips": len(results),
        "total_predicted_fuel_liters": round(total_fuel, 2),
        "total_predicted_ghg_kg": round(total_ghg, 2),
        "predictions": results
    }

@router.get("/history")
def get_prediction_history(limit: int = 20, db: Session = Depends(get_db)):
    preds = db.query(PredictionModel).order_by(PredictionModel.created_at.desc()).limit(limit).all()
    return preds
