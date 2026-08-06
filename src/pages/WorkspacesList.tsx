import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { FilterSidebar } from '@/components/FilterSidebar';
import { WorkspaceCard } from '@/components/WorkspaceCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { workspaceService } from '@/services/workspace.service';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 400;

export const WorkspacesList = () => {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [aiText, setAiText] = useState('');
  const [amenityIds, setAmenityIds] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const debouncedAiText = useDebouncedValue(aiText, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setPage(0);
  }, [debouncedQuery, debouncedAiText]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'workspaces',
      'list',
      debouncedQuery,
      amenityIds,
      debouncedAiText,
      page,
    ],
    queryFn: () =>
      workspaceService.list({
        query: debouncedQuery,
        amenityIds,
        text: debouncedAiText,
        page,
        size: PAGE_SIZE,
      }),
  });

  const handleAmenityFilterChange = (ids: string[]) => {
    setPage(0);
    setAmenityIds(ids);
  };

  // The backend sometimes returns total_pages=0 even when there are items on the current page.
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:px-10">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
          Catalog
        </span>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
          Find your next workspace
        </h1>

        <div className="mt-8 md:grid md:grid-cols-[12rem_1fr] md:items-start md:gap-6 lg:grid-cols-[15rem_1fr] lg:gap-8">
          <FilterSidebar
            isAuthenticated={isAuthenticated}
            aiText={aiText}
            onAiTextChange={setAiText}
            query={query}
            onQueryChange={setQuery}
            selectedAmenityIds={amenityIds}
            onAmenityChange={handleAmenityFilterChange}
          />

          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading spaces…</p>
              ) : isError ? (
                <p className="text-sm text-destructive">
                  Could not load spaces right now. Please try again later.
                </p>
              ) : !data || data.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No spaces found{debouncedQuery ? ` for "${debouncedQuery}"` : ''}.
                </p>
              ) : (
                data.items.map((workspace) => (
                  <WorkspaceCard key={workspace.id} workspace={workspace} />
                ))
              )}
            </div>

            {data && data.items.length > 0 ? (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  <ChevronLeft size={14} />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page + 1} of {Math.max(totalPages, 1)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={page + 1 >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight size={14} />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
