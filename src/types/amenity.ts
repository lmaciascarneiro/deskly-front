import { Page, PageResponseDto, mapPage } from '@/types/pagination';

export interface AmenityDto {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export const mapAmenity = (dto: AmenityDto): Amenity => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  createdAt: dto.created_at,
});

export type AmenityPage = Page<Amenity>;

export const mapAmenityPage = (
  dto: PageResponseDto<AmenityDto>,
  requestedPage: number
): AmenityPage => mapPage(dto, mapAmenity, requestedPage);

export interface AmenityListParams {
  query?: string;
  page?: number;
  size?: number;
}
