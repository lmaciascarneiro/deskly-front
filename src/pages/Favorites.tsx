import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Loader2, MapPin, X } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { workspaceService } from '@/services/workspace.service';

export const Favorites = () => {
  const { favorites, isLoading, isError, removeFavorite, removingFavoriteId } =
    useFavorites();

  const workspaceQueries = useQueries({
    queries: favorites.map((favorite) => ({
      queryKey: ['workspaces', 'detail', favorite.workspaceId],
      queryFn: () => workspaceService.getById(favorite.workspaceId),
    })),
  });

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6 sm:px-10">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
          Your list
        </span>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
          Favorites
        </h1>

        <div className="mt-10 space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading favorites…
            </p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              Could not load your favorites right now. Please try again later.
            </p>
          ) : favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You don't have yet favorites.
            </p>
          ) : (
            favorites.map((favorite, index) => {
              const workspaceQuery = workspaceQueries[index];
              const workspace = workspaceQuery.data;
              const isRemoving = removingFavoriteId === favorite.id;

              return (
                <div
                  key={favorite.id}
                  className="flex items-center gap-4 rounded-3xl border border-border p-4"
                >
                  {workspace?.coverPhotoUrl ? (
                    <img
                      src={workspace.coverPhotoUrl}
                      alt={workspace.title}
                      className="h-16 w-20 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo/15 to-lime/25">
                      <span className="font-display text-lg font-bold text-indigo/40">
                        {(workspace?.title ?? '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    {workspaceQuery.isLoading ? (
                      <p className="text-sm text-muted-foreground">
                        Loading…
                      </p>
                    ) : workspaceQuery.isError || !workspace ? (
                      <p className="text-sm text-destructive">
                        Workspace unavailable
                      </p>
                    ) : (
                      <Link
                        to={`/workspaces/${workspace.id}`}
                        className="font-display block truncate text-sm font-bold hover:text-indigo"
                      >
                        {workspace.title}
                      </Link>
                    )}
                    {workspace ? (
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={11} /> {workspace.city}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    disabled={isRemoving}
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    {isRemoving ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <X size={13} />
                    )}
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
