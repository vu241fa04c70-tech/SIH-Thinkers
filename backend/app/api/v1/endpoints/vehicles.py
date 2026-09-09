from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
import uuid

from backend.app.models.schemas.vehicle_schema import VehicleCreate, VehicleUpdate, VehicleResponse
from backend.app.models.database.base import get_db
from backend.app.models.database.vehicle import VehicleModel
from backend.app.utils.data_generator import generate_fleet_data

router = APIRouter()

@router.get("/", response_model=List[VehicleResponse])
def get_all_vehicles(db: Session = Depends(get_db)):
    vehicles = db.query(VehicleModel).all()
    if not vehicles:
        # Seed initial vehicles if table is empty
        fleet_df = generate_fleet_data(15)
        for _, row in fleet_df.iterrows():
            v_obj = VehicleModel(
                id=str(uuid.uuid4()),
                vehicle_id=row["vehicle_id"],
                type=row["type"],
                fuel_type=row["fuel_type"],
                make=row["make"],
                model=row["model"],
                year=row["year"],
                engine_capacity=row["engine_capacity"],
                curb_weight=row["curb_weight"],
                max_payload=row["max_payload"],
                fuel_tank_capacity=row["fuel_tank_capacity"],
                emission_standard=row["emission_standard"],
                status=row["status"]
            )
            db.add(v_obj)
        db.commit()
        vehicles = db.query(VehicleModel).all()
    return vehicles

@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle_by_id(vehicle_id: str, db: Session = Depends(get_db)):
    vehicle = db.query(VehicleModel).filter(VehicleModel.vehicle_id == vehicle_id).first()
    if not vehicle:
        vehicle = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
def create_vehicle(vehicle_in: VehicleCreate, db: Session = Depends(get_db)):
    existing = db.query(VehicleModel).filter(VehicleModel.vehicle_id == vehicle_in.vehicle_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vehicle ID already exists.")
    
    new_vehicle = VehicleModel(**vehicle_in.model_dump())
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle

@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(vehicle_id: str, vehicle_in: VehicleUpdate, db: Session = Depends(get_db)):
    vehicle = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
    if not vehicle:
        vehicle = db.query(VehicleModel).filter(VehicleModel.vehicle_id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    update_data = vehicle_in.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(vehicle, field, val)
        
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    vehicle = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
    if not vehicle:
        vehicle = db.query(VehicleModel).filter(VehicleModel.vehicle_id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(vehicle)
    db.commit()
    return None
