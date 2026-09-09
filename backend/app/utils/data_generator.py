import random
import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

VEHICLE_TYPES = {
    "Heavy Truck": {"fuel": "diesel", "cap_range": (12000, 25000), "base_consumption": 0.28}, # L/km
    "Medium Van": {"fuel": "diesel", "cap_range": (3000, 7000), "base_consumption": 0.12},
    "Light Delivery Van": {"fuel": "petrol", "cap_range": (1000, 2500), "base_consumption": 0.09},
    "CNG Cargo Vehicle": {"fuel": "cng", "cap_range": (2000, 5000), "base_consumption": 0.10}, # kg/km
    "Electric Fleet Van": {"fuel": "electric", "cap_range": (1500, 3500), "base_consumption": 0.35} # kWh/km
}

MAKES_MODELS = [
    ("Tata Motors", "Prima 2830.K"),
    ("Ashok Leyland", "AVTR 3120"),
    ("Mahindra", "Furio 14"),
    ("Eicher", "Pro 3019"),
    ("BharatBenz", "1920R"),
    ("Volvo", "FM 420"),
    ("Tata", "Ace EV")
]

ROUTE_TYPES = ["highway", "urban", "mixed"]
TRAFFIC_CONDITIONS = ["light", "moderate", "heavy"]
WEATHER_CONDITIONS = ["clear", "rain", "extreme_heat"]

def generate_fleet_data(num_vehicles=50):
    fleet = []
    for i in range(1, num_vehicles + 1):
        v_type_name, v_info = random.choice(list(VEHICLE_TYPES.items()))
        make, model = random.choice(MAKES_MODELS)
        payload = round(random.uniform(*v_info["cap_range"]), 1)
        curb = round(payload * random.uniform(0.4, 0.6), 1)
        
        vehicle = {
            "vehicle_id": f"FLEET-{1000 + i}",
            "type": v_type_name,
            "fuel_type": v_info["fuel"],
            "make": make,
            "model": model,
            "year": random.randint(2019, 2024),
            "engine_capacity": round(random.uniform(2.0, 7.5), 1),
            "curb_weight": curb,
            "max_payload": payload,
            "fuel_tank_capacity": random.choice([60, 100, 200, 300, 400]),
            "emission_standard": random.choice(["BS4", "BS6", "Euro 6"]),
            "status": "active"
        }
        fleet.append(vehicle)
    return pd.DataFrame(fleet)

def generate_trip_data(fleet_df, num_trips=2000):
    trips = []
    start_date = datetime.now() - timedelta(days=180)
    
    for i in range(num_trips):
        vehicle = fleet_df.sample(1).iloc[0]
        v_type_info = VEHICLE_TYPES.get(vehicle["type"], VEHICLE_TYPES["Heavy Truck"])
        base_rate = v_type_info["base_consumption"]
        
        trip_days = random.randint(0, 180)
        start_time = start_date + timedelta(days=trip_days, hours=random.randint(6, 20), minutes=random.randint(0, 59))
        distance_km = round(random.uniform(15.0, 350.0), 2)
        
        route = random.choice(ROUTE_TYPES)
        traffic = random.choice(TRAFFIC_CONDITIONS)
        weather = random.choice(WEATHER_CONDITIONS)
        
        route_factor = 1.0 if route == "highway" else (1.25 if route == "urban" else 1.1)
        traffic_factor = 1.0 if traffic == "light" else (1.20 if traffic == "moderate" else 1.45)
        weather_factor = 1.0 if weather == "clear" else (1.12 if weather == "rain" else 1.18)
        
        avg_speed = random.uniform(25, 75) if route == "highway" else random.uniform(12, 35)
        duration_mins = int((distance_km / avg_speed) * 60)
        
        payload_weight = round(random.uniform(0.1, 0.95) * vehicle["max_payload"], 1)
        payload_factor = 1.0 + (payload_weight / vehicle["max_payload"]) * 0.35
        
        # Calculate realistic fuel consumed
        fuel_consumed = distance_km * base_rate * route_factor * traffic_factor * weather_factor * payload_factor
        # Add slight noise
        fuel_consumed = round(max(1.0, fuel_consumed * random.uniform(0.96, 1.04)), 3)
        
        trip = {
            "vehicle_id": vehicle["vehicle_id"],
            "trip_date": start_time.strftime("%Y-%m-%d"),
            "start_time": start_time.strftime("%Y-%m-%d %H:%M:%S"),
            "end_time": (start_time + timedelta(minutes=duration_mins)).strftime("%Y-%m-%d %H:%M:%S"),
            "distance_km": distance_km,
            "duration_minutes": duration_mins,
            "average_speed": round(avg_speed, 1),
            "max_speed": round(avg_speed * random.uniform(1.15, 1.4), 1),
            "payload_weight": payload_weight,
            "fuel_consumed_liters": fuel_consumed,
            "route_type": route,
            "traffic_condition": traffic,
            "weather_condition": weather,
            "temperature_celsius": round(random.uniform(18.0, 42.0), 1),
            "driver_id": f"DRV-{random.randint(101, 140)}"
        }
        trips.append(trip)
    
    return pd.DataFrame(trips)

def generate_and_save_datasets():
    fleet_df = generate_fleet_data(50)
    trip_df = generate_trip_data(fleet_df, 2000)
    
    sample_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "sample")
    os.makedirs(sample_dir, exist_ok=True)
    
    fleet_path = os.path.join(sample_dir, "fleet_sample.csv")
    trip_path = os.path.join(sample_dir, "trip_sample.csv")
    
    fleet_df.to_csv(fleet_path, index=False)
    trip_df.to_csv(trip_path, index=False)
    
    return fleet_df, trip_df

if __name__ == "__main__":
    fleet_df, trip_df = generate_and_save_datasets()
    print(f"Generated {len(fleet_df)} vehicles and {len(trip_df)} trips successfully!")
