import { MouseEvent } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  workspaceId: string;
  className?: string;
}

export const FavoriteButton = ({
  workspaceId,
  className,
}: FavoriteButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { favoritesByWorkspaceId, addFavorite, removeFavorite, isAdding, isRemoving } =
    useFavorites();

  if (!isAuthenticated) return null;

  const favorite = favoritesByWorkspaceId.get(workspaceId);
  const isFavorited = Boolean(favorite);
  const isPending = isAdding || isRemoving;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isPending) return;
    if (favorite) {
      removeFavorite(favorite.id);
    } else {
      addFavorite(workspaceId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorited}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70',
        className
      )}
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-muted-foreground" />
      ) : (
        <Heart
          size={16}
          className={
            isFavorited
              ? 'fill-destructive text-destructive'
              : 'text-muted-foreground'
          }
        />
      )}
    </button>
  );
};
