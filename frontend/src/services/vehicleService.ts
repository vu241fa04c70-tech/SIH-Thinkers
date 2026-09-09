import API from './api';
import { Vehicle, VehicleCreate } from '../types/vehicle';

export const vehicleService = {
  getVehicles: async (): Promise<Vehicle[]> => {
    const res = await API.get('/vehicles');
    return res.data;
  },
  getVehicleById: async (id: string): Promise<Vehicle> => {
    const res = await API.get(`/vehicles/${id}`);
    return res.data;
  },
  createVehicle: async (vehicle: VehicleCreate): Promise<Vehicle> => {
    const res = await API.post('/vehicles', vehicle);
    return res.data;
  },
  deleteVehicle: async (id: string): Promise<void> => {
    await API.delete(`/vehicles/${id}`);
  }
};
