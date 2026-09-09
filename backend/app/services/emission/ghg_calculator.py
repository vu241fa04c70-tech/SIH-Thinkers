from backend.app.services.emission.emission_factors import EMISSION_FACTORS

class GHGCalculator:
    """
    IPCC Tier 1 / Tier 2 compliant Greenhouse Gas (GHG) calculator.
    Calculates CO2, CH4, N2O breakdown and total CO2e (Carbon Dioxide Equivalent) Well-To-Wheel.
    """

    @staticmethod
    def calculate_emissions(fuel_consumed: float, fuel_type: str = "diesel") -> dict:
        fuel_key = fuel_type.lower()
        if fuel_key not in EMISSION_FACTORS:
            fuel_key = "diesel" # Default fallback
            
        factors = EMISSION_FACTORS[fuel_key]
        
        # Base combustion emissions
        if fuel_key == "electric":
            co2_base = fuel_consumed * factors["co2_per_kwh"]
        elif fuel_key == "cng":
            co2_base = fuel_consumed * factors["co2_per_kg"]
        else:
            co2_base = fuel_consumed * factors["co2_per_liter"]
            
        ch4_base = fuel_consumed * factors["ch4_factor"] * factors["gwp_ch4"]
        n2o_base = fuel_consumed * factors["n2o_factor"] * factors["gwp_n2o"]
        
        ttw_co2e = co2_base + ch4_base + n2o_base # Tank-to-wheel
        wtw_co2e = ttw_co2e * factors["wtw_multiplier"] # Well-to-wheel (includes upstream generation)
        
        return {
            "co2_kg": round(co2_base, 4),
            "ch4_co2e_kg": round(ch4_base, 4),
            "n2o_co2e_kg": round(n2o_base, 4),
            "ttw_total_ghg_kg": round(ttw_co2e, 4),
            "wtw_total_ghg_kg": round(wtw_co2e, 4),
            "fuel_consumed": round(fuel_consumed, 3),
            "fuel_unit": factors["unit"]
        }

    @staticmethod
    def calculate_fleet_savings(baseline_fuel: float, optimized_fuel: float, fuel_type: str = "diesel") -> dict:
        baseline_emissions = GHGCalculator.calculate_emissions(baseline_fuel, fuel_type)
        optimized_emissions = GHGCalculator.calculate_emissions(optimized_fuel, fuel_type)
        
        saved_fuel = max(0.0, baseline_fuel - optimized_fuel)
        saved_ghg = max(0.0, baseline_emissions["wtw_total_ghg_kg"] - optimized_emissions["wtw_total_ghg_kg"])
        
        percentage_reduction = (saved_ghg / baseline_emissions["wtw_total_ghg_kg"] * 100.0) if baseline_emissions["wtw_total_ghg_kg"] > 0 else 0.0
        
        return {
            "baseline_fuel_liters": round(baseline_fuel, 2),
            "optimized_fuel_liters": round(optimized_fuel, 2),
            "saved_fuel_liters": round(saved_fuel, 2),
            "baseline_ghg_kg": baseline_emissions["wtw_total_ghg_kg"],
            "optimized_ghg_kg": optimized_emissions["wtw_total_ghg_kg"],
            "saved_ghg_kg": round(saved_ghg, 2),
            "percentage_reduction": round(percentage_reduction, 2),
            "equivalent_trees_planted": round(saved_ghg / 21.7, 1) # ~21.7 kg CO2 absorbed per tree/year
        }
