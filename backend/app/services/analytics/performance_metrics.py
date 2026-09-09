class PerformanceMetricsService:
    @staticmethod
    def calculate_roi_projection(fleet_size: int, avg_km_per_day: float, fuel_price_per_unit: float = 1.25) -> dict:
        daily_baseline_fuel = fleet_size * (avg_km_per_day * 0.22)
        daily_optimized_fuel = daily_baseline_fuel * 0.79 # 21% reduction
        
        daily_fuel_saved = daily_baseline_fuel - daily_optimized_fuel
        daily_cost_saved = daily_fuel_saved * fuel_price_per_unit
        
        monthly_cost_saved = daily_cost_saved * 30.0
        annual_cost_saved = daily_cost_saved * 365.0
        annual_ghg_saved_tons = (daily_fuel_saved * 2.68 * 365.0) / 1000.0
        
        return {
            "fleet_size": fleet_size,
            "avg_km_per_day": avg_km_per_day,
            "fuel_price_per_unit": fuel_price_per_unit,
            "daily_fuel_saved_liters": round(daily_fuel_saved, 1),
            "daily_cost_saved_usd": round(daily_cost_saved, 2),
            "monthly_cost_saved_usd": round(monthly_cost_saved, 2),
            "annual_cost_saved_usd": round(annual_cost_saved, 2),
            "annual_ghg_saved_metric_tons": round(annual_ghg_saved_tons, 1)
        }
