import { Page, PageResponseDto, mapPage } from '@/types/pagination';
import { Amenity, AmenityDto, mapAmenity } from '@/types/amenity';

// Shape confirmed via GET /v3/api-docs (WorkspaceResponse schema) — the response
// doesn't include description/address/neighborhood/lat/long, only the create request.
// "amenities" is only populated on the single-workspace detail endpoints
// (GET .../workspaces/{id}); list endpoints always return it as [].
export interface WorkspaceDto {
  id: string;
  host_id: string;
  title: string;
  city: string;
  price_per_hour: number;
  rating: number | null;
  review_count: number;
  status: string;
  created_at: string;
  cover_photo_url?: string | null;
  amenities?: AmenityDto[];
}

export interface Workspace {
  id: string;
  hostId: string;
  title: string;
  city: string;
  pricePerHour: number;
  rating: number | null;
  reviewCount: number;
  status: string;
  createdAt: string;
  coverPhotoUrl: string | null;
  amenities: Amenity[];
}

export const mapWorkspace = (dto: WorkspaceDto): Workspace => ({
  id: dto.id,
  hostId: dto.host_id,
  title: dto.title,
  city: dto.city,
  pricePerHour: dto.price_per_hour,
  rating: dto.rating ?? null,
  reviewCount: dto.review_count,
  status: dto.status,
  createdAt: dto.created_at,
  coverPhotoUrl: dto.cover_photo_url ?? null,
  amenities: (dto.amenities ?? []).map(mapAmenity),
});

export type WorkspacePage = Page<Workspace>;

export const mapWorkspacePage = (
  dto: PageResponseDto<WorkspaceDto>,
  requestedPage: number
): WorkspacePage => mapPage(dto, mapWorkspace, requestedPage);

export interface WorkspaceListParams {
  query?: string;
  amenityIds?: string[];
  page?: number;
  size?: number;
}

export interface CreateWorkspacePayload {
  title: string;
  address: string;
  city: string;
  pricePerHour: number;
  description?: string;
  neighborhood?: string;
  amenityIds?: string[];
}

export interface CreateWorkspaceRequestDto {
  title: string;
  address: string;
  city: string;
  price_per_hour: number;
  description?: string;
  neighborhood?: string;
  amenity_ids?: string[];
}

export const mapCreateWorkspacePayload = (
  payload: CreateWorkspacePayload
): CreateWorkspaceRequestDto => ({
  title: payload.title,
  address: payload.address,
  city: payload.city,
  price_per_hour: payload.pricePerHour,
  ...(payload.description ? { description: payload.description } : {}),
  ...(payload.neighborhood ? { neighborhood: payload.neighborhood } : {}),
  ...(payload.amenityIds !== undefined
    ? { amenity_ids: payload.amenityIds }
    : {}),
});

export interface UpdateWorkspacePayload {
  title?: string;
  description?: string;
  address?: string;
  city?: string;
  neighborhood?: string;
  pricePerHour?: number;
  // Omitted/undefined = amenities are left unchanged; providing an array
  // (even []) fully replaces the workspace's current amenity set.
  amenityIds?: string[];
}

export interface UpdateWorkspaceRequestDto {
  title?: string;
  description?: string;
  address?: string;
  city?: string;
  neighborhood?: string;
  price_per_hour?: number;
  amenity_ids?: string[];
}

export const mapUpdateWorkspacePayload = (
  payload: UpdateWorkspacePayload
): UpdateWorkspaceRequestDto => ({
  ...(payload.title !== undefined ? { title: payload.title } : {}),
  ...(payload.description !== undefined
    ? { description: payload.description }
    : {}),
  ...(payload.address !== undefined ? { address: payload.address } : {}),
  ...(payload.city !== undefined ? { city: payload.city } : {}),
  ...(payload.neighborhood !== undefined
    ? { neighborhood: payload.neighborhood }
    : {}),
  ...(payload.pricePerHour !== undefined
    ? { price_per_hour: payload.pricePerHour }
    : {}),
  ...(payload.amenityIds !== undefined
    ? { amenity_ids: payload.amenityIds }
    : {}),
});
