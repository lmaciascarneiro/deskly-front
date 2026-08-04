import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmailPasswordLoginForm } from '@/components/EmailPasswordLoginForm';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';

export const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-lavender">
      <header className="px-6 py-6">
        <Link to="/" className="flex w-fit items-center gap-2">
          <span className="font-display flex h-8 w-8 items-center justify-center rounded-xl bg-indigo text-sm font-bold text-white">
            D
          </span>
          <span className="font-display text-lg font-bold">Deskly</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-12">
        <Card className="w-full max-w-sm rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold">
              Entrar
            </CardTitle>
            <CardDescription>Acesse sua conta Deskly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <EmailPasswordLoginForm />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-display text-[11px] uppercase tracking-widest text-muted-foreground">
                ou
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <GoogleSignInButton />

            <p className="text-center text-sm text-muted-foreground">
              Não tem conta?{' '}
              <Link to="/signup" className="font-medium text-indigo underline">
                Criar conta
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
