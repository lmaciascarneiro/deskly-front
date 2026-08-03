import { FormEvent, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'E-mail ou senha inválidos.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/user-not-found': 'E-mail ou senha inválidos.',
  'auth/wrong-password': 'E-mail ou senha inválidos.',
  'auth/missing-password': 'Informe sua senha.',
  'auth/too-many-requests':
    'Muitas tentativas sem sucesso. Tente novamente mais tarde.',
};

export const EmailPasswordLoginForm = () => {
  const { signInWithEmail, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      const message =
        err instanceof FirebaseError
          ? (FIREBASE_ERROR_MESSAGES[err.code] ??
            'Não foi possível entrar. Tente novamente.')
          : 'Não foi possível entrar. Tente novamente.';
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Entrar
      </Button>
    </form>
  );
};
