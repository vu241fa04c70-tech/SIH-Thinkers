from backend.app.services.emission.emission_factors import EMISSION_FACTORS

class GHGCalculator:
    """
    IPCC Tier 2 & SIH PS 26138 compliant Greenhouse Gas (GHG) calculator.
    Supports alternative marine and fleet fuels: LNG, Methanol, Hydrogen, Ammonia, Shore Power.
    """

    @staticmethod
    def calculate_emissions(fuel_consumed: float, fuel_type: str = "diesel") -> dict:
        fuel_key = fuel_type.lower()
        if fuel_key not in EMISSION_FACTORS:
            fuel_key = "diesel"
            
        factors = EMISSION_FACTORS[fuel_key]
        
        co2_base = fuel_consumed * factors["co2_per_unit"]
        ch4_base = fuel_consumed * factors["ch4_factor"] * 28.0 # GWP 28
        n2o_base = fuel_consumed * factors["n2o_factor"] * 265.0 # GWP 265
        
        ttw_co2e = co2_base + ch4_base + n2o_base
        wtw_co2e = ttw_co2e * factors["wtw_multiplier"]
        
        return {
            "co2_kg": round(co2_base, 4),
            "ch4_co2e_kg": round(ch4_base, 4),
            "n2o_co2e_kg": round(n2o_base, 4),
            "ttw_total_ghg_kg": round(ttw_co2e, 4),
            "wtw_total_ghg_kg": round(wtw_co2e, 4),
            "fuel_consumed": round(fuel_consumed, 3),
            "fuel_unit": factors["unit"]
        }
