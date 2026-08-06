import { Link } from 'react-router-dom';
import { LogOut, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuestNav } from '@/components/GuestNav';
import { HostNav } from '@/components/HostNav';
import { RoleSwitch } from '@/components/RoleSwitch';
import { useAuth } from '@/context/AuthContext';

export const AppHeader = () => {
  const { user, isAuthenticated, activeRole, signOut } = useAuth();

  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-display flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          D
        </span>
        <span className="font-display text-lg font-bold">Deskly</span>
      </Link>

      {activeRole === 'host' ? <HostNav /> : <GuestNav isAuthenticated={isAuthenticated} />}

      {isAuthenticated && user ? (
        <div className="flex flex-col items-end gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profile/edit" className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              <span className="max-w-[8rem] truncate">{user.name ?? user.email}</span>
            </Link>
          </Button>
          {user.isHost ? <RoleSwitch /> : null}
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
