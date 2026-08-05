import { Page, PageResponseDto, mapPage } from '@/types/pagination';

export interface FavoriteDto {
  id: string;
  user_id: string;
  workspace_id: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  userId: string;
  workspaceId: string;
  createdAt: string;
}

export const mapFavorite = (dto: FavoriteDto): Favorite => ({
  id: dto.id,
  userId: dto.user_id,
  workspaceId: dto.workspace_id,
  createdAt: dto.created_at,
});

export type FavoritePage = Page<Favorite>;

export const mapFavoritePage = (
  dto: PageResponseDto<FavoriteDto>,
  requestedPage: number
): FavoritePage => mapPage(dto, mapFavorite, requestedPage);

export interface CreateFavoriteRequestDto {
  workspace_id: string;
}
