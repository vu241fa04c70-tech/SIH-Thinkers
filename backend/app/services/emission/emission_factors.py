"""
IPCC & DEFRA standard Greenhouse Gas Emission Factors
Well-to-Wheel (WTW) factors include Tank-to-Wheel (combustion) + Well-to-Tank (production & distribution).
"""

EMISSION_FACTORS = {
    "diesel": {
        "co2_per_liter": 2.68,       # kg CO2/liter (Tank-to-wheel)
        "ch4_factor": 0.0001,        # kg CH4/liter
        "n2o_factor": 0.0001,        # kg N2O/liter
        "wtw_multiplier": 1.20,      # Well-to-wheel total factor (20% WTT upstream)
        "gwp_ch4": 28,               # Global Warming Potential (100-year)
        "gwp_n2o": 265,              # Global Warming Potential
        "unit": "liter"
    },
    "petrol": {
        "co2_per_liter": 2.31,
        "ch4_factor": 0.0002,
        "n2o_factor": 0.00008,
        "wtw_multiplier": 1.18,
        "gwp_ch4": 28,
        "gwp_n2o": 265,
        "unit": "liter"
    },
    "cng": {
        "co2_per_kg": 2.75,
        "ch4_factor": 0.0005,
        "n2o_factor": 0.00005,
        "wtw_multiplier": 1.15,
        "gwp_ch4": 28,
        "gwp_n2o": 265,
        "unit": "kg"
    },
    "electric": {
        "co2_per_kwh": 0.82,         # Grid emission factor (India grid average kg CO2/kWh)
        "ch4_factor": 0.00002,
        "n2o_factor": 0.00001,
        "wtw_multiplier": 1.08,      # Transmission loss factor
        "gwp_ch4": 28,
        "gwp_n2o": 265,
        "unit": "kWh"
    }
}
