"""
IPCC 2026 & SIH PS 26138 Emission Factors
Includes Maritime & Land Transport alternative fuels:
- Diesel & Heavy Fuel Oil
- LNG (Liquefied Natural Gas)
- Methanol (Green E-Methanol)
- Hydrogen (Green H2)
- Ammonia (Green NH3)
- Shore Power (Grid electricity at port)
"""

EMISSION_FACTORS = {
    "diesel": {
        "co2_per_unit": 2.68,       # kg CO2/liter
        "ch4_factor": 0.0001,
        "n2o_factor": 0.0001,
        "wtw_multiplier": 1.20,
        "unit": "liter"
    },
    "lng": {
        "co2_per_unit": 2.75,       # kg CO2/kg LNG
        "ch4_factor": 0.0012,       # Methane slip factor
        "n2o_factor": 0.00005,
        "wtw_multiplier": 1.12,
        "unit": "kg"
    },
    "methanol": {
        "co2_per_unit": 1.37,       # kg CO2/kg E-Methanol
        "ch4_factor": 0.00005,
        "n2o_factor": 0.00002,
        "wtw_multiplier": 1.05,
        "unit": "kg"
    },
    "hydrogen": {
        "co2_per_unit": 0.0,        # Zero direct tailpipe emissions
        "ch4_factor": 0.0,
        "n2o_factor": 0.0,
        "wtw_multiplier": 1.02,     # Green H2 electrolysis upstream
        "unit": "kg"
    },
    "ammonia": {
        "co2_per_unit": 0.0,        # Zero CO2 direct
        "ch4_factor": 0.0,
        "n2o_factor": 0.00015,       # Trace N2O combustion factor
        "wtw_multiplier": 1.04,
        "unit": "kg"
    },
    "shore_power": {
        "co2_per_unit": 0.82,       # kg CO2/kWh
        "ch4_factor": 0.00002,
        "n2o_factor": 0.00001,
        "wtw_multiplier": 1.08,
        "unit": "kWh"
    }
}
