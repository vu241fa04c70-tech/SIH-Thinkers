from fastapi import APIRouter
from typing import List, Dict

router = APIRouter()

@router.get("/active")
def get_active_routes() -> List[Dict]:
    return [
        {
            "route_id": "RT-801",
            "vehicle_id": "FLEET-1001",
            "driver_name": "Rajesh Kumar",
            "origin": "Mumbai Central Depot",
            "destination": "Thane Distribution Hub",
            "status": "In Transit",
            "progress_percentage": 65,
            "current_lat": 19.1200,
            "current_lng": 72.9000,
            "fuel_efficiency_status": "Optimal"
        },
        {
            "route_id": "RT-804",
            "vehicle_id": "FLEET-1004",
            "driver_name": "Anil Verma",
            "origin": "Bhiwandi Logistics Hub",
            "destination": "Navi Mumbai Hub",
            "status": "In Transit",
            "progress_percentage": 42,
            "current_lat": 19.2100,
            "current_lng": 73.0800,
            "fuel_efficiency_status": "High Efficiency (EV)"
        }
    ]
