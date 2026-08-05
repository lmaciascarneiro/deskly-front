import { Link, useNavigate } from 'react-router-dom';
import { Compass, LogOut, UserRound, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export const AppHeader = () => {
  const { user, isAuthenticated, activeRole, setActiveRole, signOut } =
    useAuth();
  const navigate = useNavigate();

  const goExplore = () => {
    setActiveRole('guest');
    navigate('/workspaces');
  };

  const goHost = () => {
    setActiveRole('host');
    navigate('/host/workspaces');
  };

  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-display flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          D
        </span>
        <span className="font-display text-lg font-bold">Deskly</span>
      </Link>

      <div className="flex items-center gap-3">
        <nav className="hidden items-center gap-2 rounded-full bg-secondary p-1 text-sm font-medium md:flex">
          <Link to="/workspaces" className="rounded-full px-4 py-1.5 transition-colors hover:bg-white">
            Spaces
          </Link>
          {isAuthenticated ? (
            <Link to="/favorites" className="rounded-full px-4 py-1.5 transition-colors hover:bg-white">
              Favorites
            </Link>
          ) : null}
        </nav>

        {isAuthenticated && user?.isHost ? (
          <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={goExplore}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors',
                activeRole === 'guest'
                  ? 'bg-indigo text-white'
                  : 'text-muted-foreground hover:text-ink'
              )}
            >
              <Compass size={13} />
              Explore
            </button>
            <button
              type="button"
              onClick={goHost}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors',
                activeRole === 'host'
                  ? 'bg-indigo text-white'
                  : 'text-muted-foreground hover:text-ink'
              )}
            >
              <Building2 size={13} />
              Host
            </button>
          </div>
        ) : null}
      </div>

      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profile/edit" className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              <span className="max-w-[8rem] truncate">{user.name ?? user.email}</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" className="rounded-full shadow-lg shadow-indigo-200" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </header>
  );
};
