import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { FavoriteButton } from '@/components/FavoriteButton';
import { workspaceService } from '@/services/workspace.service';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const WorkspaceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: workspace, isLoading, isError } = useQuery({
    queryKey: ['workspaces', 'detail', id],
    queryFn: () => workspaceService.getById(id as string),
    enabled: Boolean(id),
  });

  const { data: photos } = useQuery({
    queryKey: ['workspaces', 'detail', id, 'photos'],
    queryFn: () => workspaceService.listPhotos(id as string),
    enabled: Boolean(id),
  });

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-6 sm:px-10">
        <Link
          to="/workspaces"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to spaces
        </Link>

        {isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Loading workspace…
          </p>
        ) : isError || !workspace ? (
          <p className="mt-10 text-sm text-destructive">
            We couldn't find this space. It may have been removed.
          </p>
        ) : (
          <div className="mt-8">
            {photos && photos.items.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto">
                {photos.items.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.photoUrl}
                    alt={workspace.title}
                    className="h-64 w-auto shrink-0 rounded-3xl object-cover sm:h-80"
                  />
                ))}
              </div>
            ) : (
              <div className="blob-shape flex h-64 items-center justify-center bg-gradient-to-br from-indigo/15 to-lime/25 sm:h-80">
                <span className="font-display text-6xl font-bold text-indigo/40">
                  {workspace.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold sm:text-4xl">
                    {workspace.title}
                  </h1>
                  <FavoriteButton workspaceId={workspace.id} />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={14} /> {workspace.city}
                </p>
                {workspace.rating !== null ? (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star size={13} className="fill-lime text-lime" />
                    {workspace.rating.toFixed(1)} ({workspace.reviewCount}{' '}
                    reviews)
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl bg-lavender px-5 py-3 text-right">
                <p className="font-display text-2xl font-bold text-indigo">
                  {currencyFormatter.format(workspace.pricePerHour)}
                </p>
                <p className="text-xs text-muted-foreground">per hour</p>
              </div>
            </div>

            {workspace.amenities.length > 0 ? (
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold">Amenities</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {workspace.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="rounded-2xl border border-border p-4"
                    >
                      <p className="text-sm font-medium">{amenity.name}</p>
                      {amenity.description ? (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {amenity.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  );
};
