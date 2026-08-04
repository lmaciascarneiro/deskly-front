import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { workspaceService } from '@/services/workspace.service';
import { hostWorkspacePhotoService } from '@/services/host-workspace-photo.service';

export const HostWorkspacePhotos = () => {
  const { id } = useParams<{ id: string }>();
  const workspaceId = id as string;
  const queryClient = useQueryClient();

  const [photoUrl, setPhotoUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [orderDrafts, setOrderDrafts] = useState<Record<string, string>>({});

  const photosQueryKey = ['workspaces', 'detail', workspaceId, 'photos'];

  const { data: photos, isLoading, isError } = useQuery({
    queryKey: photosQueryKey,
    queryFn: () => workspaceService.listPhotos(workspaceId),
    enabled: Boolean(workspaceId),
  });

  const invalidatePhotos = () =>
    queryClient.invalidateQueries({ queryKey: photosQueryKey });

  const createMutation = useMutation({
    mutationFn: () =>
      hostWorkspacePhotoService.create(workspaceId, {
        photoUrl,
        displayOrder: displayOrder ? Number(displayOrder) : undefined,
      }),
    onSuccess: () => {
      setPhotoUrl('');
      setDisplayOrder('');
      invalidatePhotos();
    },
    onError: () => setCreateError('Could not add the photo. Check the URL and try again.'),
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ photoId, order }: { photoId: string; order: number }) =>
      hostWorkspacePhotoService.update(workspaceId, photoId, {
        displayOrder: order,
      }),
    onSuccess: () => invalidatePhotos(),
  });

  const deleteMutation = useMutation({
    mutationFn: (photoId: string) =>
      hostWorkspacePhotoService.remove(workspaceId, photoId),
    onSuccess: () => invalidatePhotos(),
  });

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError(null);
    createMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6 sm:px-10">
        <Link
          to="/host/workspaces"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to my spaces
        </Link>

        <h1 className="font-display mt-4 text-3xl font-bold">Workspace photos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Photos are referenced by URL — host the image on some service and paste the link here.
        </p>

        <form
          onSubmit={handleCreate}
          className="mt-8 flex flex-col gap-3 rounded-3xl border border-border p-5 sm:flex-row sm:items-end"
        >
          <div className="flex-1 space-y-1.5">
            <label htmlFor="photo-url" className="text-sm font-medium">
              Photo URL
            </label>
            <Input
              id="photo-url"
              type="url"
              required
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div className="w-full space-y-1.5 sm:w-28">
            <label htmlFor="photo-order" className="text-sm font-medium">
              Order
            </label>
            <Input
              id="photo-order"
              type="number"
              min="0"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              placeholder="1"
            />
          </div>
          <Button
            type="submit"
            className="rounded-2xl"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Add
          </Button>
        </form>
        {createError ? (
          <p className="mt-2 text-sm text-destructive">{createError}</p>
        ) : null}

        <div className="mt-10 space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading photos…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              Could not load photos right now.
            </p>
          ) : !photos || photos.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No photos added yet.
            </p>
          ) : (
            photos.items.map((photo) => (
              <div
                key={photo.id}
                className="flex flex-col items-start gap-4 rounded-3xl border border-border p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={photo.photoUrl}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-2xl object-cover"
                />
                <p className="flex-1 truncate text-sm text-muted-foreground">
                  {photo.photoUrl}
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    className="w-20 rounded-xl"
                    value={orderDrafts[photo.id] ?? String(photo.displayOrder ?? '')}
                    onChange={(e) =>
                      setOrderDrafts((prev) => ({
                        ...prev,
                        [photo.id]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    disabled={updateOrderMutation.isPending}
                    onClick={() => {
                      const draft = orderDrafts[photo.id];
                      const order = Number(draft ?? photo.displayOrder ?? 0);
                      if (!Number.isNaN(order)) {
                        updateOrderMutation.mutate({ photoId: photo.id, order });
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (window.confirm('Remove this photo?')) {
                        deleteMutation.mutate(photo.id);
                      }
                    }}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
