import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Images, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Button } from '@/components/ui/button';
import { hostWorkspaceService } from '@/services/host-workspace.service';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const HostWorkspacesList = () => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['host-workspaces', 'list'],
    queryFn: () => hostWorkspaceService.list({ size: 50 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => hostWorkspaceService.remove(id),
    onMutate: (id) => setDeletingId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['host-workspaces', 'list'] });
    },
    onSettled: () => setDeletingId(null),
  });

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
              Modo host
            </span>
            <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
              Meus espaços
            </h1>
          </div>
          <Button className="rounded-2xl shadow-lg shadow-indigo-200" asChild>
            <Link to="/host/workspaces/novo" className="flex items-center gap-2">
              <Plus size={16} />
              Novo workspace
            </Link>
          </Button>
        </div>

        <div className="mt-10 space-y-4">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando seus espaços…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              Não foi possível carregar seus espaços agora.
            </p>
          ) : !data || data.items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Você ainda não tem nenhum workspace cadastrado.
              </p>
              <Button className="mt-4 rounded-2xl" asChild>
                <Link to="/host/workspaces/novo">Criar meu primeiro workspace</Link>
              </Button>
            </div>
          ) : (
            data.items.map((workspace) => (
              <div
                key={workspace.id}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-border p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg font-bold">{workspace.title}</p>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      {workspace.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{workspace.city}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="font-display font-bold text-indigo">
                      {currencyFormatter.format(workspace.pricePerHour)}/h
                    </span>
                    {workspace.rating !== null ? (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star size={12} className="fill-lime text-lime" />
                        {workspace.rating.toFixed(1)} ({workspace.reviewCount})
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl" asChild>
                    <Link
                      to={`/host/workspaces/${workspace.id}/editar`}
                      className="flex items-center gap-1.5"
                    >
                      <Pencil size={13} />
                      Editar
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl" asChild>
                    <Link
                      to={`/host/workspaces/${workspace.id}/fotos`}
                      className="flex items-center gap-1.5"
                    >
                      <Images size={13} />
                      Fotos
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    disabled={deletingId === workspace.id}
                    onClick={() => {
                      if (window.confirm(`Excluir "${workspace.title}"? Essa ação não pode ser desfeita.`)) {
                        deleteMutation.mutate(workspace.id);
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
