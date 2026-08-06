import { useQuery } from '@tanstack/react-query';
import { amenityService } from '@/services/amenity.service';
import { cn } from '@/lib/utils';

interface AmenityFilterChipsProps {
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
}

export const AmenityFilterChips = ({
  selectedIds,
  onChange,
}: AmenityFilterChipsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['amenities', 'catalog'],
    queryFn: () => amenityService.list({ size: 100 }),
  });

  const toggle = (amenityId: string) => {
    onChange(
      selectedIds.includes(amenityId)
        ? selectedIds.filter((id) => id !== amenityId)
        : [...selectedIds, amenityId]
    );
  };

  if (isLoading || !data || data.items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {data.items.map((amenity) => {
        const isSelected = selectedIds.includes(amenity.id);
        return (
          <button
            key={amenity.id}
            type="button"
            onClick={() => toggle(amenity.id)}
            aria-pressed={isSelected}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              isSelected
                ? 'border-indigo bg-indigo text-white'
                : 'border-border bg-white text-muted-foreground hover:border-indigo/40 hover:text-ink'
            )}
          >
            {amenity.name}
          </button>
        );
      })}
    </div>
  );
};
