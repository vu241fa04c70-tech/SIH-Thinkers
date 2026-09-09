export interface LocationTask {
  id: string;
  name: string;
  lat: number;
  lng: number;
  demand_kg: number;
}

export interface RouteWaypoint {
  lat: number;
  lng: number;
  name: string;
}

export interface RouteSegment {
  vehicle_id: string;
  vehicle_type: string;
  assigned_tasks: string[];
  total_distance_km: number;
  estimated_time_minutes: number;
  predicted_fuel_liters: number;
  predicted_ghg_kg: number;
  route_waypoints: RouteWaypoint[];
}

export interface OptimizationResult {
  id: string;
  optimization_type: string;
  status: string;
  total_vehicles_used: number;
  total_distance_km: number;
  total_predicted_fuel_liters: number;
  total_predicted_ghg_kg: number;
  fuel_reduction_percentage: number;
  ghg_reduction_percentage: number;
  qubo_energy_score: number;
  computation_time_ms: number;
  routes: RouteSegment[];
  created_at: string;
}
