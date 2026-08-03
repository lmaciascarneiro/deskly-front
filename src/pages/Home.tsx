import { Link } from 'react-router-dom';
import { useHealth } from '@/hooks/useHealth';
import { Button } from '@/components/ui/button';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';
import { RefreshCw, MapPin, Clock, DoorOpen } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: MapPin,
    title: 'Perto de onde você está',
    body: 'Escritórios, salas de reunião e coworkings com vagas ociosas no seu bairro, prontos para uso.',
  },
  {
    icon: Clock,
    title: 'Reserve por hora',
    body: 'Sem contrato, sem fiador. Você paga só pelo tempo que for usar a sala.',
  },
  {
    icon: DoorOpen,
    title: 'Rentabilize seu espaço',
    body: 'Anuncie metros quadrados parados e transforme uma sala vazia em renda.',
  },
];

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    dataUpdatedAt,
    errorUpdatedAt,
  } = useHealth();

  const isOnline = data?.status === 'UP';
  const isDown = Boolean(error) || (!isLoading && !isOnline);
  const lastChecked = error ? errorUpdatedAt : dataUpdatedAt;

  const statusLabel = isLoading ? 'VERIFICANDO' : isDown ? 'OFFLINE' : 'ONLINE';
  const statusColor = isLoading
    ? 'text-brass'
    : isDown
      ? 'text-rust'
      : 'text-moss';
  const dotColor = isLoading ? 'bg-brass' : isDown ? 'bg-rust' : 'bg-moss';
  const doorMessage = isLoading
    ? 'Checando se a recepção está de portas abertas...'
    : isDown
      ? 'As portas estão fechadas no momento.'
      : 'O sistema está de portas abertas e pronto para reservas.';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl italic tracking-tight">
          Deskly
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span
              className={`h-1.5 w-1.5 rounded-full ${dotColor} ${!isDown ? 'animate-pulse' : ''}`}
            />
            API {statusLabel}
          </div>
          {!isAuthenticated ? (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          ) : null}
          <GoogleSignInButton />
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-10 text-center sm:pt-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
            Marketplace de espaços para trabalhar
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            Alugue uma sala.
            <br />
            <span className="italic text-moss">Ou abra a sua.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Deskly conecta quem precisa de um lugar tranquilo para trabalhar a
            escritórios e salas com vagas ociosas pela cidade — reserva por
            hora, sem contrato.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="#status">Testar disponibilidade</a>
            </Button>
            <div className="relative">
              <Button variant="outline" size="lg" disabled>
                Anunciar meu espaço
              </Button>
              <span className="absolute -right-3 -top-3 rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-secondary-foreground">
                em breve
              </span>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-3">
            {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-3">
                <Icon className="h-5 w-5 text-brass" strokeWidth={1.75} />
                <h3 className="font-display text-xl">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="status"
          className="mx-auto max-w-3xl scroll-mt-10 px-6 py-20"
        >
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Painel da recepção
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-ink p-3 shadow-xl">
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-paper/20" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                Deskly HQ · Servidor
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-paper/20" />
            </div>

            <div className="rounded-xl bg-paper px-6 py-8 text-center">
              <span
                className={`mx-auto block h-3 w-3 rounded-full ${dotColor} animate-pulse`}
              />
              <p
                className={`mt-4 font-mono text-4xl font-bold tracking-tight ${statusColor}`}
              >
                {statusLabel}
              </p>
              <p className="mt-3 text-sm text-ink/70">{doorMessage}</p>
              {lastChecked ? (
                <p className="mt-4 font-mono text-[11px] text-ink/40">
                  última verificação{' '}
                  {new Date(lastChecked).toLocaleTimeString('pt-BR')}
                </p>
              ) : null}
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="mt-6 border-ink/15 font-mono text-xs uppercase tracking-wide text-ink hover:bg-ink/5"
                disabled={isFetching}
              >
                <RefreshCw
                  className={`mr-2 h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`}
                />
                Atualizar
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Deskly — escritórios sob demanda
        </div>
      </footer>
    </div>
  );
};
