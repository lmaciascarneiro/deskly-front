import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user.service';

const COPY = {
  onboarding: {
    title: 'Complete seu cadastro',
    description: 'Só mais um passo antes de explorar a Deskly.',
    submitLabel: 'Continuar',
  },
  settings: {
    title: 'Editar cadastro',
    description: 'Atualize suas informações pessoais.',
    submitLabel: 'Salvar alterações',
  },
};

export const EditProfile = ({ mode }: { mode: 'onboarding' | 'settings' }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? '');
  const [isHost, setIsHost] = useState(user?.isHost ?? false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const copy = COPY[mode];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setError(null);
    setSaved(false);
    setIsSaving(true);
    try {
      const updatedUser = await userService.updateUser(user.id, {
        name,
        phoneNumber,
        isHost,
      });
      setUser(updatedUser);

      if (mode === 'onboarding') {
        navigate('/workspaces', { replace: true });
      } else {
        setSaved(true);
      }
    } catch {
      setError('Não foi possível salvar suas informações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-lavender">
      <AppHeader />

      <main className="flex justify-center px-6 pb-20 pt-6">
        <Card className="w-full max-w-md rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold">
              {copy.title}
            </CardTitle>
            <CardDescription>{copy.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="profile-name" className="text-sm font-medium">
                  Nome
                </label>
                <Input
                  id="profile-name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Como podemos te chamar?"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="profile-phone" className="text-sm font-medium">
                  Telefone
                </label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="+55 11 91234-5678"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={isHost}
                  onChange={(event) => setIsHost(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-indigo focus:ring-indigo"
                />
                <span>
                  <span className="block text-sm font-medium">
                    Quero anunciar meus espaços
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Ative o modo host para futuramente cadastrar workspaces e
                    receber reservas.
                  </span>
                </span>
              </label>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {saved ? (
                <p className="text-sm text-[#4d7c0f]">Alterações salvas.</p>
              ) : null}

              <Button
                type="submit"
                className="w-full rounded-2xl"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {copy.submitLabel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};
