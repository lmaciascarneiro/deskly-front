import { api } from '@/api/api';
import { AuthUser, UserResponseDto, mapUserResponse } from '@/types/auth';
import {
  UpdateUserPayload,
  UpdateUserRequestDto,
  mapUpdateUserPayload,
} from '@/types/user';

export const userService = {
  async getMe(): Promise<AuthUser> {
    const response = await api.get<UserResponseDto>('/api/v1/users/me');
    return mapUserResponse(response.data);
  },

  async updateUser(
    userId: string,
    payload: UpdateUserPayload
  ): Promise<AuthUser> {
    const body: UpdateUserRequestDto = mapUpdateUserPayload(payload);
    const response = await api.put<UserResponseDto>(
      `/api/v1/users/${userId}`,
      body
    );
    return mapUserResponse(response.data);
  },
};
