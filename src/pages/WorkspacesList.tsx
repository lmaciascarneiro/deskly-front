import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { WorkspaceCard } from '@/components/WorkspaceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { workspaceService } from '@/services/workspace.service';

const PAGE_SIZE = 12;

export const WorkspacesList = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['workspaces', 'list', submittedQuery, page],
    queryFn: () =>
      workspaceService.list({ query: submittedQuery, page, size: PAGE_SIZE }),
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setSubmittedQuery(query);
  };

  // O backend às vezes retorna total_pages=0 mesmo havendo itens na página atual.
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:px-10">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
          Catálogo
        </span>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
          Encontre seu próximo workspace
        </h1>

        <form
          onSubmit={handleSearch}
          className="mt-8 flex max-w-md items-center gap-2"
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por cidade, bairro ou nome..."
            className="rounded-2xl"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-2xl">
            <Search size={16} />
          </Button>
        </form>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando espaços…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              Não foi possível carregar os espaços agora. Tente novamente mais
              tarde.
            </p>
          ) : !data || data.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum espaço encontrado{submittedQuery ? ` para "${submittedQuery}"` : ''}.
            </p>
          ) : (
            data.items.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))
          )}
        </div>

        {data && data.items.length > 0 ? (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeft size={14} />
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {page + 1} de {Math.max(totalPages, 1)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
              <ChevronRight size={14} />
            </Button>
          </div>
        ) : null}
      </main>

      <AppFooter />
    </div>
  );
};
