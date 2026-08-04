export interface AuthenticateRequest {
  idToken: string;
}

export interface UserResponseDto {
  id: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  is_host?: boolean;
}

interface AuthenticateResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserResponseDto;
}

export interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  phoneNumber: string | null;
  isHost: boolean;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export const mapUserResponse = (dto: UserResponseDto): AuthUser => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  phoneNumber: dto.phone_number,
  isHost: dto.is_host ?? false,
});

export const mapAuthenticateResponse = (
  dto: AuthenticateResponseDto
): AuthSession => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
  expiresIn: dto.expiresIn,
  user: mapUserResponse(dto.user),
});

export type { AuthenticateResponseDto };
