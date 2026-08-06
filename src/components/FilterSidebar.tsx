import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { AmenityFilterChips } from '@/components/AmenityFilterChips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FilterSidebarProps {
  isAuthenticated: boolean;
  aiText: string;
  onAiTextChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  selectedAmenityIds: string[];
  onAmenityChange: (selectedIds: string[]) => void;
}

const FilterContent = ({
  isAuthenticated,
  aiText,
  onAiTextChange,
  query,
  onQueryChange,
  selectedAmenityIds,
  onAmenityChange,
}: FilterSidebarProps) => (
  <div>
    <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
      Filters
    </h2>

    {isAuthenticated ? (
      <div className="mt-5">
        <p className="text-sm font-medium text-muted-foreground">AI Search</p>
        <Textarea
          value={aiText}
          onChange={(event) => onAiTextChange(event.target.value)}
          placeholder="I'm looking for a quiet place to work with air conditioning in São Paulo, close to the subway and available this afternoon..."
          rows={3}
          className="mt-2 rounded-2xl"
        />
      </div>
    ) : null}

    <div className="mt-5">
      <p className="text-sm font-medium text-muted-foreground">Search</p>
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="City, neighborhood, or name..."
        className="mt-2 rounded-2xl"
      />
    </div>

    <div className="mt-5">
      <p className="text-sm font-medium text-muted-foreground">Amenities</p>
      <div className="mt-2">
        <AmenityFilterChips
          selectedIds={selectedAmenityIds}
          onChange={onAmenityChange}
        />
      </div>
    </div>
  </div>
);

export const FilterSidebar = (props: FilterSidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { selectedAmenityIds } = props;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5 rounded-full md:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <SlidersHorizontal size={14} />
        Filters
        {selectedAmenityIds.length > 0 ? (
          <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
            {selectedAmenityIds.length}
          </span>
        ) : null}
      </Button>

      <aside className="hidden md:sticky md:top-6 md:block md:h-fit md:w-48 lg:w-60">
        <FilterContent {...props} />
      </aside>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="ml-auto rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-ink"
            >
              <X size={18} />
            </button>
            <FilterContent {...props} />
          </div>
        </div>
      ) : null}
    </>
  );
};
