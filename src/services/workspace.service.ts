import { api } from '@/api/api';
import { PageResponseDto } from '@/types/pagination';
import {
  Workspace,
  WorkspaceDto,
  WorkspaceListParams,
  WorkspacePage,
  mapWorkspace,
  mapWorkspacePage,
} from '@/types/workspace';
import {
  PhotoDto,
  PhotoPage,
  mapPhotoPage,
} from '@/types/workspace-photo';

export const workspaceService = {
  async list(params: WorkspaceListParams = {}): Promise<WorkspacePage> {
    const page = params.page ?? 0;
    const size = params.size ?? 12;
    const response = await api.get<PageResponseDto<WorkspaceDto>>(
      '/public/api/v1/workspaces',
      {
        params: {
          query: params.query ?? '',
          page,
          size,
          ...(params.amenityIds && params.amenityIds.length > 0
            ? { amenity_ids: params.amenityIds.join(',') }
            : {}),
          ...(params.text ? { text: params.text } : {}),
        },
      }
    );
    return mapWorkspacePage(response.data, page);
  },

  async getById(id: string): Promise<Workspace> {
    const response = await api.get<WorkspaceDto>(
      `/public/api/v1/workspaces/${id}`
    );
    return mapWorkspace(response.data);
  },

  async listPhotos(
    workspaceId: string,
    params: { page?: number; size?: number } = {}
  ): Promise<PhotoPage> {
    const page = params.page ?? 0;
    const size = params.size ?? 20;
    const response = await api.get<PageResponseDto<PhotoDto>>(
      `/public/api/v1/workspaces/${workspaceId}/photos`,
      { params: { page, size } }
    );
    return mapPhotoPage(response.data, page);
  },
};
