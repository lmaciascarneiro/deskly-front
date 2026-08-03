import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmailPasswordLoginForm } from '@/components/EmailPasswordLoginForm';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';

export const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-display text-3xl italic">
            Entrar
          </CardTitle>
          <CardDescription>Acesse sua conta Deskly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EmailPasswordLoginForm />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              ou
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex justify-center">
            <GoogleSignInButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
