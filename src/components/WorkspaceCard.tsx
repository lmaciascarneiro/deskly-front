import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Workspace } from '@/types/workspace';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link
      to={`/workspaces/${workspace.id}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="blob-shape relative m-4 flex h-36 items-center justify-center bg-gradient-to-br from-indigo/15 to-lime/25">
        <span className="font-display text-3xl font-bold text-indigo/40">
          {workspace.title.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display truncate text-[15px] font-bold">
            {workspace.title}
          </p>
          {workspace.rating !== null ? (
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold">
              <Star size={11} className="fill-lime text-lime" />
              {workspace.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={11} /> {workspace.city}
        </p>
        <p className="font-display mt-4 text-sm font-bold text-indigo">
          {currencyFormatter.format(workspace.pricePerHour)}/h
        </p>
      </div>
    </Link>
  );
};
