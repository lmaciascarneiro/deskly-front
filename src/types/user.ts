export interface UpdateUserPayload {
  name?: string;
  phoneNumber?: string;
  isHost?: boolean;
}

export interface UpdateUserRequestDto {
  name?: string;
  phone_number?: string;
  is_host?: boolean;
}

export const mapUpdateUserPayload = (
  payload: UpdateUserPayload
): UpdateUserRequestDto => ({
  ...(payload.name !== undefined ? { name: payload.name } : {}),
  ...(payload.phoneNumber !== undefined
    ? { phone_number: payload.phoneNumber }
    : {}),
  ...(payload.isHost !== undefined ? { is_host: payload.isHost } : {}),
});
