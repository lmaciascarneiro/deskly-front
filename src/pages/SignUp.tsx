import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmailPasswordSignUpForm } from '@/components/EmailPasswordSignUpForm';
import { useAuth } from '@/context/AuthContext';

export const SignUp = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-display text-3xl italic">
            Criar conta
          </CardTitle>
          <CardDescription>Crie sua conta Deskly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EmailPasswordSignUpForm />

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{' '}
            <Link to="/login" className="font-medium text-foreground underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
