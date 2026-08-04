import { api } from '@/api/api';
import {
  CreatePhotoPayload,
  CreatePhotoRequestDto,
  UpdatePhotoPayload,
  UpdatePhotoRequestDto,
  mapCreatePhotoPayload,
  mapUpdatePhotoPayload,
} from '@/types/workspace-photo';

export const hostWorkspacePhotoService = {
  async create(
    workspaceId: string,
    payload: CreatePhotoPayload
  ): Promise<string> {
    const body: CreatePhotoRequestDto = mapCreatePhotoPayload(payload);
    const response = await api.post<string>(
      `/api/v1/host/workspaces/${workspaceId}/photos`,
      body
    );
    return response.data;
  },

  async update(
    workspaceId: string,
    photoId: string,
    payload: UpdatePhotoPayload
  ): Promise<void> {
    const body: UpdatePhotoRequestDto = mapUpdatePhotoPayload(payload);
    await api.put(
      `/api/v1/host/workspaces/${workspaceId}/photos/${photoId}`,
      body
    );
  },

  async remove(workspaceId: string, photoId: string): Promise<void> {
    await api.delete(
      `/api/v1/host/workspaces/${workspaceId}/photos/${photoId}`
    );
  },
};
