import { api } from '@/api/api';
import { PageResponseDto } from '@/types/pagination';
import {
  CreateWorkspacePayload,
  CreateWorkspaceRequestDto,
  UpdateWorkspacePayload,
  UpdateWorkspaceRequestDto,
  Workspace,
  WorkspaceDto,
  WorkspaceListParams,
  WorkspacePage,
  mapCreateWorkspacePayload,
  mapUpdateWorkspacePayload,
  mapWorkspace,
  mapWorkspacePage,
} from '@/types/workspace';

export const hostWorkspaceService = {
  async list(params: WorkspaceListParams = {}): Promise<WorkspacePage> {
    const page = params.page ?? 0;
    const size = params.size ?? 20;
    const response = await api.get<PageResponseDto<WorkspaceDto>>(
      '/api/v1/host/workspaces',
      { params: { query: params.query ?? '', page, size } }
    );
    return mapWorkspacePage(response.data, page);
  },

  async getById(id: string): Promise<Workspace> {
    const response = await api.get<WorkspaceDto>(
      `/api/v1/host/workspaces/${id}`
    );
    return mapWorkspace(response.data);
  },

  async create(payload: CreateWorkspacePayload): Promise<string> {
    const body: CreateWorkspaceRequestDto = mapCreateWorkspacePayload(payload);
    const response = await api.post<string>('/api/v1/host/workspaces', body);
    return response.data;
  },

  async update(id: string, payload: UpdateWorkspacePayload): Promise<void> {
    const body: UpdateWorkspaceRequestDto = mapUpdateWorkspacePayload(payload);
    await api.put(`/api/v1/host/workspaces/${id}`, body);
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/api/v1/host/workspaces/${id}`);
  },
};
