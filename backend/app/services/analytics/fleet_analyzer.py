import random
from datetime import datetime, timedelta

class FleetAnalyzerService:
    """
    Fleet Analytics & Performance Insights Service.
    Calculates operational health, efficiency rankings, carbon footprints, and ROI savings.
    """

    @staticmethod
    def get_fleet_summary() -> dict:
        return {
            "total_vehicles": 52,
            "active_vehicles": 44,
            "maintenance_vehicles": 5,
            "idle_vehicles": 3,
            "total_distance_today_km": 14280.5,
            "fuel_consumed_today_liters": 2845.2,
            "ghg_emitted_today_kg": 7625.1,
            "fuel_saved_today_liters": 612.4,
            "ghg_saved_today_kg": 1641.2,
            "fleet_efficiency_score": 91.4,
            "cost_savings_today_usd": 734.88
        }

    @staticmethod
    def get_trend_analysis(days: int = 30) -> list:
        trends = []
        today = datetime.now()
        
        base_fuel = 3200.0
        base_ghg = 8500.0
        
        for i in range(days - 1, -1, -1):
            date_str = (today - timedelta(days=i)).strftime("%Y-%m-%d")
            factor = random.uniform(0.92, 1.08)
            
            opt_fuel = round(base_fuel * factor * 0.79, 1) # ~21% savings
            opt_ghg = round(base_ghg * factor * 0.78, 1)
            
            trends.append({
                "date": date_str,
                "baseline_fuel_liters": round(base_fuel * factor, 1),
                "optimized_fuel_liters": opt_fuel,
                "fuel_saved_liters": round(base_fuel * factor - opt_fuel, 1),
                "baseline_ghg_kg": round(base_ghg * factor, 1),
                "optimized_ghg_kg": opt_ghg,
                "ghg_saved_kg": round(base_ghg * factor - opt_ghg, 1)
            })
            
        return trends

    @staticmethod
    def get_vehicle_rankings() -> list:
        rankings = [
            {"vehicle_id": "FLEET-1004", "type": "Electric Fleet Van", "efficiency_score": 98.2, "co2_intensity_g_km": 42.0, "status": "Top Performer"},
            {"vehicle_id": "FLEET-1012", "type": "CNG Cargo Vehicle", "efficiency_score": 94.5, "co2_intensity_g_km": 110.5, "status": "Efficient"},
            {"vehicle_id": "FLEET-1001", "type": "Heavy Truck", "efficiency_score": 92.1, "co2_intensity_g_km": 245.0, "status": "Optimal"},
            {"vehicle_id": "FLEET-1025", "type": "Medium Van", "efficiency_score": 88.7, "co2_intensity_g_km": 185.2, "status": "Optimal"},
            {"vehicle_id": "FLEET-1038", "type": "Heavy Truck", "efficiency_score": 79.4, "co2_intensity_g_km": 310.8, "status": "Needs Maintenance"},
            {"vehicle_id": "FLEET-1042", "type": "Light Delivery Van", "efficiency_score": 74.1, "co2_intensity_g_km": 210.4, "status": "Audit Required"}
        ]
        return rankings
