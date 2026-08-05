import { api } from '@/api/api';
import { PageResponseDto } from '@/types/pagination';
import {
  AmenityDto,
  AmenityListParams,
  AmenityPage,
  mapAmenityPage,
} from '@/types/amenity';

export const amenityService = {
  async list(params: AmenityListParams = {}): Promise<AmenityPage> {
    const page = params.page ?? 0;
    const size = params.size ?? 100;
    const response = await api.get<PageResponseDto<AmenityDto>>(
      '/public/api/v1/amenities',
      { params: { query: params.query ?? '', page, size } }
    );
    return mapAmenityPage(response.data, page);
  },
};
