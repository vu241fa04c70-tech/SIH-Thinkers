export interface Vehicle {
  id: string;
  vehicle_id: string;
  type: string;
  fuel_type: string;
  make: string;
  model: string;
  year: number;
  engine_capacity: number;
  curb_weight: number;
  max_payload: number;
  fuel_tank_capacity: number;
  emission_standard: string;
  status: 'active' | 'maintenance' | 'idle';
  created_at: string;
  updated_at: string;
}

export type VehicleCreate = Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>;
