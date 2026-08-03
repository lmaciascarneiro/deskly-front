export interface AuthenticateRequest {
  idToken: string;
}

interface UserResponseDto {
  id: string;
  name: string | null;
  email: string;
  phone_number: string | null;
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
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

export const mapAuthenticateResponse = (
  dto: AuthenticateResponseDto
): AuthSession => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
  expiresIn: dto.expiresIn,
  user: {
    id: dto.user.id,
    name: dto.user.name,
    email: dto.user.email,
    phoneNumber: dto.user.phone_number,
  },
});

export type { AuthenticateResponseDto };
