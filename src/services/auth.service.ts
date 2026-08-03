import { api } from '@/api/api';
import {
  AuthenticateRequest,
  AuthenticateResponseDto,
  AuthSession,
  mapAuthenticateResponse,
} from '@/types/auth';

export const authService = {
  async authenticate(idToken: string): Promise<AuthSession> {
    const request: AuthenticateRequest = { idToken };
    const response = await api.post<AuthenticateResponseDto>(
      '/public/api/v1/auth/authenticate',
      request
    );
    return mapAuthenticateResponse(response.data);
  },
};
