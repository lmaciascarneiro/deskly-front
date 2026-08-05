import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { favoriteService } from '@/services/favorite.service';
import { Favorite } from '@/types/favorite';

export const FAVORITES_QUERY_KEY = ['favorites', 'list'];

export const useFavorites = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => favoriteService.list(),
    enabled: isAuthenticated,
  });

  const favorites: Favorite[] = data?.items ?? [];
  const favoritesByWorkspaceId = new Map(
    favorites.map((favorite) => [favorite.workspaceId, favorite])
  );

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });

  const addMutation = useMutation({
    mutationFn: (workspaceId: string) => favoriteService.create(workspaceId),
    onSuccess: invalidate,
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: string) => favoriteService.remove(favoriteId),
    onSuccess: invalidate,
  });

  return {
    favorites,
    favoritesByWorkspaceId,
    isLoading,
    isError,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    removingFavoriteId: removeMutation.isPending
      ? (removeMutation.variables ?? null)
      : null,
  };
};
