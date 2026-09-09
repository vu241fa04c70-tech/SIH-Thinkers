from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from backend.app.models.schemas.optimization_schema import OptimizationInput, OptimizationResponse
from backend.app.services.optimization.quantum_optimizer import QuantumInspiredOptimizerService
from backend.app.models.database.base import get_db
from backend.app.models.database.optimization import OptimizationModel

router = APIRouter()

@router.post("/fleet-allocation", response_model=OptimizationResponse)
def optimize_fleet_allocation(input_data: OptimizationInput, db: Session = Depends(get_db)):
    data = input_data.model_dump()
    data["optimization_type"] = "fleet_allocation"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    
    _save_optimization_record(res, data, db)
    return res

@router.post("/route", response_model=OptimizationResponse)
def optimize_route(input_data: OptimizationInput, db: Session = Depends(get_db)):
    data = input_data.model_dump()
    data["optimization_type"] = "route"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    
    _save_optimization_record(res, data, db)
    return res

@router.post("/combined", response_model=OptimizationResponse)
def optimize_combined(input_data: OptimizationInput, db: Session = Depends(get_db)):
    data = input_data.model_dump()
    data["optimization_type"] = "combined"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    
    _save_optimization_record(res, data, db)
    return res

@router.get("/{opt_id}/results")
def get_optimization_results(opt_id: str, db: Session = Depends(get_db)):
    opt = db.query(OptimizationModel).filter(OptimizationModel.id == opt_id).first()
    if not opt:
        raise HTTPException(status_code=404, detail="Optimization record not found")
    return opt

def _save_optimization_record(res: dict, input_data: dict, db: Session):
    opt_record = OptimizationModel(
        id=res["id"],
        optimization_type=res["optimization_type"],
        input_parameters=input_data,
        results=res,
        total_predicted_fuel=res["total_predicted_fuel_liters"],
        total_predicted_ghg=res["total_predicted_ghg_kg"],
        optimization_score=res["qubo_energy_score"],
        computation_time_ms=res["computation_time_ms"],
        status=res["status"]
    )
    db.add(opt_record)
    db.commit()
