export interface PageResponseDto<T> {
  content: T[];
  total_elements: number;
  total_pages: number;
  size: number;
}

export interface Page<T> {
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export const mapPage = <TDto, TDomain>(
  dto: PageResponseDto<TDto>,
  mapItem: (item: TDto) => TDomain,
  requestedPage: number
): Page<TDomain> => ({
  items: dto.content.map(mapItem),
  page: requestedPage,
  size: dto.size,
  totalPages: dto.total_pages,
  totalElements: dto.total_elements,
});
