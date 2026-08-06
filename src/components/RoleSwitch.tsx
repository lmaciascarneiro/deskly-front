import { useNavigate } from 'react-router-dom';
import { Building2, Compass } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export const RoleSwitch = () => {
  const { activeRole, setActiveRole } = useAuth();
  const navigate = useNavigate();

  const selectGuest = () => {
    setActiveRole('guest');
    navigate('/workspaces');
  };

  const selectHost = () => {
    setActiveRole('host');
    navigate('/host/workspaces');
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={selectGuest}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors',
          activeRole === 'guest'
            ? 'bg-indigo text-white'
            : 'text-muted-foreground hover:text-ink'
        )}
      >
        <Compass size={13} />
        Guest
      </button>
      <button
        type="button"
        onClick={selectHost}
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
  );
};
