import { useQuery, useQueryClient } from '@tanstack/react-query';
import { healthService } from '@/services/health.service';
import { HealthResponse } from '@/types/health';

export const useHealth = () => {
  const queryClient = useQueryClient();

  const query = useQuery<HealthResponse, Error>({
    queryKey: ['health'],
    queryFn: () => healthService.getHealth(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['health'] });
  };

  return {
    ...query,
    refetch,
  };
};
