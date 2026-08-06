import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GuestNavProps {
  isAuthenticated: boolean;
}

const navLinkClass = (isActive: boolean) =>
  cn(
    'rounded-full px-4 py-1.5 transition-colors',
    isActive
      ? 'bg-white text-ink shadow-sm'
      : 'text-muted-foreground hover:bg-white/70 hover:text-ink'
  );

export const GuestNav = ({ isAuthenticated }: GuestNavProps) => {
  const location = useLocation();

  return (
    <nav className="hidden items-center gap-2 rounded-full bg-secondary p-1 text-sm font-medium md:flex">
      <Link
        to="/workspaces"
        className={navLinkClass(location.pathname.startsWith('/workspaces'))}
      >
        Spaces
      </Link>
      {isAuthenticated ? (
        <Link
          to="/favorites"
          className={navLinkClass(location.pathname === '/favorites')}
        >
          Favorites
        </Link>
      ) : null}
    </nav>
  );
};
