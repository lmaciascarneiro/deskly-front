import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { AmenityFilterChips } from '@/components/AmenityFilterChips';
import { WorkspaceCard } from '@/components/WorkspaceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { workspaceService } from '@/services/workspace.service';

const PAGE_SIZE = 12;

export const WorkspacesList = () => {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [aiText, setAiText] = useState('');
  const [submittedAiText, setSubmittedAiText] = useState('');
  const [amenityIds, setAmenityIds] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'workspaces',
      'list',
      submittedQuery,
      amenityIds,
      submittedAiText,
      page,
    ],
    queryFn: () =>
      workspaceService.list({
        query: submittedQuery,
        amenityIds,
        text: submittedAiText,
        page,
        size: PAGE_SIZE,
      }),
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setSubmittedQuery(query);
  };

  const handleAiSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setSubmittedAiText(aiText);
  };

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

        <div className="mt-8 flex max-w-md flex-col gap-4">
          {isAuthenticated ? (
            <form
              onSubmit={handleAiSearch}
              className="flex items-center gap-2"
            >
              <Input
                value={aiText}
                onChange={(event) => setAiText(event.target.value)}
                placeholder="Descreva o workspace que você procura..."
                className="rounded-2xl"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 rounded-2xl"
              >
                <Search size={16} />
              </Button>
            </form>
          ) : null}

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, neighborhood, or name..."
              className="rounded-2xl"
            />
            <Button type="submit" size="icon" className="shrink-0 rounded-2xl">
              <Search size={16} />
            </Button>
          </form>
        </div>

        <div className="mt-6">
          <AmenityFilterChips
            selectedIds={amenityIds}
            onChange={handleAmenityFilterChange}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading spaces…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              Could not load spaces right now. Please try again later.
            </p>
          ) : !data || data.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No spaces found{submittedQuery ? ` for "${submittedQuery}"` : ''}.
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
      </main>

      <AppFooter />
    </div>
  );
};
