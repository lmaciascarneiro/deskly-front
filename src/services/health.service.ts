import { api } from '@/api/api';
import { HealthResponse } from '@/types/health';

export const healthService = {
  async getHealth(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/actuator/health');
    return response.data;
  },
};
