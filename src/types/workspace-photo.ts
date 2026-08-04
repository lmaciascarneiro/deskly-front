import { Page, PageResponseDto, mapPage } from '@/types/pagination';

export interface PhotoDto {
  id: string;
  workspace_id: string;
  photo_url: string;
  display_order?: number | null;
  created_at: string;
}

export interface Photo {
  id: string;
  workspaceId: string;
  photoUrl: string;
  displayOrder: number | null;
  createdAt: string;
}

export const mapPhoto = (dto: PhotoDto): Photo => ({
  id: dto.id,
  workspaceId: dto.workspace_id,
  photoUrl: dto.photo_url,
  displayOrder: dto.display_order ?? null,
  createdAt: dto.created_at,
});

export type PhotoPage = Page<Photo>;

export const mapPhotoPage = (
  dto: PageResponseDto<PhotoDto>,
  requestedPage: number
): PhotoPage => mapPage(dto, mapPhoto, requestedPage);

export interface CreatePhotoPayload {
  objectKey: string;
  displayOrder?: number;
}

export interface CreatePhotoRequestDto {
  object_key: string;
  display_order?: number;
}

export const mapCreatePhotoPayload = (
  payload: CreatePhotoPayload
): CreatePhotoRequestDto => ({
  object_key: payload.objectKey,
  ...(payload.displayOrder !== undefined
    ? { display_order: payload.displayOrder }
    : {}),
});

export interface UploadUrlRequestDto {
  content_type: string;
}

export interface UploadUrlResponseDto {
  upload_url: string;
  object_key: string;
  expires_in: number;
  max_file_size_bytes: number;
}

export interface UploadUrlResult {
  uploadUrl: string;
  objectKey: string;
  expiresIn: number;
  maxFileSizeBytes: number;
}

export const mapUploadUrlResult = (
  dto: UploadUrlResponseDto
): UploadUrlResult => ({
  uploadUrl: dto.upload_url,
  objectKey: dto.object_key,
  expiresIn: dto.expires_in,
  maxFileSizeBytes: dto.max_file_size_bytes,
});

export interface UpdatePhotoPayload {
  displayOrder?: number;
}

export interface UpdatePhotoRequestDto {
  display_order?: number;
}

export const mapUpdatePhotoPayload = (
  payload: UpdatePhotoPayload
): UpdatePhotoRequestDto => ({
  ...(payload.displayOrder !== undefined
    ? { display_order: payload.displayOrder }
    : {}),
});
