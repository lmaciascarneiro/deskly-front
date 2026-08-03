import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CalendarCheck, DoorOpen, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const STATS = [
  { icon: CalendarCheck, label: 'Reservas ativas', value: '0' },
  { icon: DoorOpen, label: 'Salas favoritas', value: '0' },
  { icon: Building2, label: 'Espaços anunciados', value: '0' },
];

export const Dashboard = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl italic tracking-tight">
          Deskly
        </span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </Button>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass">
          Painel
        </p>
        <h1 className="mt-2 font-display text-4xl">
          Olá, {user.name ?? user.email}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bem-vindo(a) de volta ao seu painel Deskly.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STATS.map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5 text-brass" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Sua conta
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="text-muted-foreground">Nome:</span>{' '}
              {user.name ?? '—'}
            </p>
            <p>
              <span className="text-muted-foreground">E-mail:</span>{' '}
              {user.email}
            </p>
            <p>
              <span className="text-muted-foreground">Telefone:</span>{' '}
              {user.phoneNumber ?? '—'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
