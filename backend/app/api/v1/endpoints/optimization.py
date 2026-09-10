from fastapi import APIRouter, HTTPException, Depends
from typing import Optional, Any
import logging

try:
    from app.models.schemas.optimization_schema import OptimizationInput, OptimizationResponse
    from app.services.optimization.quantum_optimizer import QuantumInspiredOptimizerService
    from app.models.database.base import get_db
    from app.models.database.optimization import OptimizationModel
except ModuleNotFoundError:
    from backend.app.models.schemas.optimization_schema import OptimizationInput, OptimizationResponse
    from backend.app.services.optimization.quantum_optimizer import QuantumInspiredOptimizerService
    from backend.app.models.database.base import get_db
    from backend.app.models.database.optimization import OptimizationModel

logger = logging.getLogger("greenfleet.optimization")
router = APIRouter()

@router.post("/fleet-allocation", response_model=OptimizationResponse)
def optimize_fleet_allocation(input_data: OptimizationInput, db: Optional[Any] = None):
    data = input_data.model_dump()
    data["optimization_type"] = "fleet_allocation"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    _save_optimization_record(res, data, db)
    return res

@router.post("/route", response_model=OptimizationResponse)
def optimize_route(input_data: OptimizationInput, db: Optional[Any] = None):
    data = input_data.model_dump()
    data["optimization_type"] = "route"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    _save_optimization_record(res, data, db)
    return res

@router.post("/combined", response_model=OptimizationResponse)
def optimize_combined(input_data: OptimizationInput, db: Optional[Any] = None):
    data = input_data.model_dump()
    data["optimization_type"] = "combined"
    res = QuantumInspiredOptimizerService.optimize_fleet_and_routes(data)
    _save_optimization_record(res, data, db)
    return res

@router.get("/{opt_id}/results")
def get_optimization_results(opt_id: str, db: Optional[Any] = None):
    if not db:
        raise HTTPException(status_code=404, detail="Optimization record not found")
    try:
        opt = db.query(OptimizationModel).filter(OptimizationModel.id == opt_id).first()
        if not opt:
            raise HTTPException(status_code=404, detail="Optimization record not found")
        return opt
    except Exception as err:
        raise HTTPException(status_code=404, detail="Optimization record not found")

def _save_optimization_record(res: dict, input_data: dict, db: Optional[Any]):
    if not db:
        return
    try:
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
    except Exception as db_err:
        logger.warning(f"Could not persist optimization record to DB: {db_err}")
