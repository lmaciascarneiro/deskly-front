import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl italic tracking-tight">
          Deskly
        </span>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/signup">Criar conta</Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
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
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup">Criar conta</Link>
              </Button>
            </div>
            <GoogleSignInButton />
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
