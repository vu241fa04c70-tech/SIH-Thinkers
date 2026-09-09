import numpy as np
import pandas as pd

class FeatureEngineering:
    """
    Transforms raw trip and vehicle data into rich feature matrices for ML prediction.
    """

    @staticmethod
    def extract_features(input_dict: dict) -> pd.DataFrame:
        distance_km = float(input_dict.get("distance_km", 50.0))
        payload_kg = float(input_dict.get("payload_weight_kg", 2000.0))
        avg_speed = float(input_dict.get("average_speed_kmh", 45.0))
        temperature = float(input_dict.get("temperature_celsius", 25.0))
        driver_score = float(input_dict.get("driver_behavior_score", 8.0))
        
        route_type = input_dict.get("route_type", "highway").lower()
        traffic = input_dict.get("traffic_condition", "moderate").lower()
        weather = input_dict.get("weather_condition", "clear").lower()
        vehicle_type = input_dict.get("vehicle_type", "Heavy Truck")
        fuel_type = input_dict.get("fuel_type", "diesel").lower()

        # Engineered Numerical Features
        route_density_index = 1.0 if route_type == "highway" else (1.3 if route_type == "urban" else 1.15)
        traffic_delay_factor = 1.0 if traffic == "light" else (1.25 if traffic == "moderate" else 1.5)
        weather_severity = 1.0 if weather == "clear" else (1.15 if weather == "rain" else 1.25)
        
        # Optimal speed deviation (optimal efficiency ~55-65 km/h for heavy vehicles)
        speed_efficiency_deviation = abs(avg_speed - 60.0) / 60.0
        driver_inefficiency_penalty = max(0.0, (10.0 - driver_score) * 0.03)

        features = {
            "distance_km": distance_km,
            "payload_weight_kg": payload_kg,
            "average_speed_kmh": avg_speed,
            "temperature_celsius": temperature,
            "driver_behavior_score": driver_score,
            "route_density_index": route_density_index,
            "traffic_delay_factor": traffic_delay_factor,
            "weather_severity": weather_severity,
            "speed_efficiency_deviation": speed_efficiency_deviation,
            "driver_inefficiency_penalty": driver_inefficiency_penalty,
            "is_heavy_vehicle": 1 if "Heavy" in vehicle_type or "Truck" in vehicle_type else 0,
            "is_diesel": 1 if fuel_type == "diesel" else 0,
            "is_electric": 1 if fuel_type == "electric" else 0,
        }

        return pd.DataFrame([features])
