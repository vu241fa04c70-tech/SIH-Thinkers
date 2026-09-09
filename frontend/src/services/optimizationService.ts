import API from './api';
import { OptimizationResult } from '../types/optimization';

export const optimizationService = {
  runOptimization: async (payload: any): Promise<OptimizationResult> => {
    const res = await API.post('/optimization/combined', payload);
    return res.data;
  },
  getAnalyticsSummary: async () => {
    const res = await API.get('/analytics/fleet-summary');
    return res.data;
  },
  getTrends: async (days: number = 30) => {
    const res = await API.get(`/analytics/trends?days=${days}`);
    return res.data;
  },
  getRankings: async () => {
    const res = await API.get('/analytics/vehicle-ranking');
    return res.data;
  }
};
