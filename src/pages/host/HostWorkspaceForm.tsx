import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { hostWorkspaceService } from '@/services/host-workspace.service';

export const HostWorkspaceForm = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';

  const { data: existing, isLoading: isLoadingExisting } = useQuery({
    queryKey: ['host-workspaces', 'detail', id],
    queryFn: () => hostWorkspaceService.getById(id as string),
    enabled: isEdit && Boolean(id),
  });

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setCity(existing.city);
      setPricePerHour(String(existing.pricePerHour));
    }
  }, [existing]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const price = Number(pricePerHour.replace(',', '.'));
    if (Number.isNaN(price) || price <= 0) {
      setError('Informe um preço por hora válido.');
      return;
    }

    setIsSaving(true);
    try {
      if (mode === 'create') {
        const newId = await hostWorkspaceService.create({
          title,
          address,
          city,
          pricePerHour: price,
          description: description || undefined,
          neighborhood: neighborhood || undefined,
        });
        navigate(`/host/workspaces/${newId}/fotos`, { replace: true });
      } else if (id) {
        await hostWorkspaceService.update(id, {
          ...(title ? { title } : {}),
          ...(address ? { address } : {}),
          ...(city ? { city } : {}),
          ...(description ? { description } : {}),
          ...(neighborhood ? { neighborhood } : {}),
          pricePerHour: price,
        });
        navigate('/host/workspaces', { replace: true });
      }
    } catch {
      setError('Não foi possível salvar o workspace. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isEdit && isLoadingExisting) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader />
        <p className="mx-auto max-w-2xl px-6 py-16 text-sm text-muted-foreground">
          Carregando workspace…
        </p>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-6 sm:px-10">
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="font-display text-3xl font-bold">
              {isEdit ? 'Editar workspace' : 'Criar workspace'}
            </CardTitle>
            <CardDescription>
              {isEdit
                ? 'A API não retorna descrição, endereço e bairro atuais — preencha novamente só se quiser alterá-los.'
                : 'Preencha as informações do seu espaço.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="ws-title" className="text-sm font-medium">
                  Título
                </label>
                <Input
                  id="ws-title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Estúdio Aurora"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="ws-city" className="text-sm font-medium">
                    Cidade
                  </label>
                  <Input
                    id="ws-city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="São Paulo"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ws-neighborhood" className="text-sm font-medium">
                    Bairro
                  </label>
                  <Input
                    id="ws-neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Vila Madalena"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-address" className="text-sm font-medium">
                  Endereço
                </label>
                <Input
                  id="ws-address"
                  required={!isEdit}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua Harmonia, 123"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-description" className="text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  id="ws-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Conte o que torna esse espaço especial."
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ws-price" className="text-sm font-medium">
                  Preço por hora (R$)
                </label>
                <Input
                  id="ws-price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  placeholder="39.90"
                />
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <Button type="submit" className="w-full rounded-2xl" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isEdit ? 'Salvar alterações' : 'Criar workspace'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};
