import API from './api';
import { SinglePredictionInput, SinglePredictionResult } from '../types/prediction';

export const predictionService = {
  predictSingle: async (input: SinglePredictionInput): Promise<SinglePredictionResult> => {
    const res = await API.post('/predictions/single', input);
    return res.data;
  },
  getHistory: async () => {
    const res = await API.get('/predictions/history');
    return res.data;
  }
};
