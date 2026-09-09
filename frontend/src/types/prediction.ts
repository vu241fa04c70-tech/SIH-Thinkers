export interface ShapContribution {
  feature: string;
  impact_value: number;
  description: string;
}

export interface SinglePredictionInput {
  vehicle_type: string;
  fuel_type: string;
  distance_km: number;
  payload_weight_kg: number;
  average_speed_kmh: number;
  route_type: string;
  traffic_condition: string;
  weather_condition: string;
  temperature_celsius: number;
  driver_behavior_score: number;
}

export interface SinglePredictionResult {
  id: string;
  vehicle_type: string;
  fuel_type: string;
  distance_km: number;
  predicted_fuel_liters: number;
  predicted_ghg_kg: number;
  co2_kg: number;
  ch4_kg: number;
  n2o_kg: number;
  confidence_score: number;
  model_ensemble: {
    xgboost: number;
    lightgbm: number;
    random_forest: number;
  };
  shap_explanations: ShapContribution[];
  created_at: string;
}
