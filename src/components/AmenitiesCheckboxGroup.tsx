import { useQuery } from '@tanstack/react-query';
import { amenityService } from '@/services/amenity.service';

interface AmenitiesCheckboxGroupProps {
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
}

export const AmenitiesCheckboxGroup = ({
  selectedIds,
  onChange,
}: AmenitiesCheckboxGroupProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['amenities', 'catalog'],
    queryFn: () => amenityService.list({ size: 100 }),
  });

  const toggle = (amenityId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedIds, amenityId]);
    } else {
      onChange(selectedIds.filter((id) => id !== amenityId));
    }
  };

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Loading amenities…</p>
    );
  }

  if (isError || !data || data.items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No amenities available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {data.items.map((amenity) => (
        <label
          key={amenity.id}
          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(amenity.id)}
            onChange={(event) => toggle(amenity.id, event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border text-indigo focus:ring-indigo"
          />
          <span>
            <span className="block text-sm font-medium">{amenity.name}</span>
            {amenity.description ? (
              <span className="block text-xs text-muted-foreground">
                {amenity.description}
              </span>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
};
