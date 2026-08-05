import { api } from '@/api/api';
import { PageResponseDto } from '@/types/pagination';
import {
  CreateFavoriteRequestDto,
  FavoriteDto,
  FavoritePage,
  mapFavoritePage,
} from '@/types/favorite';

export const favoriteService = {
  async list(
    params: { page?: number; size?: number } = {}
  ): Promise<FavoritePage> {
    const page = params.page ?? 0;
    const size = params.size ?? 100;
    const response = await api.get<PageResponseDto<FavoriteDto>>(
      '/api/v1/guest/favorites',
      { params: { page, size } }
    );
    return mapFavoritePage(response.data, page);
  },

  async create(workspaceId: string): Promise<string> {
    const body: CreateFavoriteRequestDto = { workspace_id: workspaceId };
    const response = await api.post<string>('/api/v1/guest/favorites', body);
    return response.data;
  },

  async remove(favoriteId: string): Promise<void> {
    await api.delete(`/api/v1/guest/favorites/${favoriteId}`);
  },
};
