import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Clock,
  Coffee,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { WorkspaceCard } from '@/components/WorkspaceCard';
import { WorkspaceIllustration } from '@/components/WorkspaceIllustration';
import { Button } from '@/components/ui/button';
import { workspaceService } from '@/services/workspace.service';

const benefits = [
  { icon: ShieldCheck, title: 'Espaços verificados', description: 'Vistoria presencial antes de qualquer anúncio ir ao ar.' },
  { icon: Wifi, title: 'Internet rápida', description: 'Testamos a velocidade real de cada unidade parceira.' },
  { icon: Coffee, title: 'Café incluso', description: 'Boa parte dos espaços já vem com café liberado.' },
  { icon: Clock, title: 'Flexível por hora', description: 'Reserve só o tempo que precisa, sem pacote fechado.' },
];

const steps = [
  { title: 'Descubra', description: 'Explore espaços perto de você com poucos cliques.' },
  { title: 'Reserve', description: 'Escolha o horário certo e confirme na hora.' },
  { title: 'Produza', description: 'Chegue, conecte e comece a trabalhar.' },
];

export const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['workspaces', 'home-highlights'],
    queryFn: () => workspaceService.list({ size: 3 }),
  });

  return (
    <div className="min-h-screen bg-white text-ink antialiased">
      <AppHeader />

      <section className="relative overflow-hidden px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-lime/20 px-4 py-1.5 text-xs font-bold text-[#4d7c0f]">
              <Sparkles size={12} /> Novo em 12 cidades
            </span>
            <h1 className="font-display mt-6 text-[38px] font-bold leading-[1.1] sm:text-[54px]">
              Seu escritório,
              <br />
              onde a vida te levar.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Encontre workspaces verificados perto de você e reserve em minutos. Coworkings,
              salas de reunião e cafés prontos pra produtividade.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-2xl shadow-lg shadow-indigo-200" asChild>
                <Link to="/workspaces" className="flex items-center justify-center gap-2">
                  Buscar workspace
                  <ArrowRight size={15} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-2 border-ink" asChild>
                <Link to="/signup">Criar conta grátis</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="blob-shape absolute inset-0 -z-10 bg-lavender" />
            <div className="relative rounded-[2rem] bg-lavender p-8">
              <WorkspaceIllustration />
              <div className="absolute -left-4 top-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-lg">
                <Wifi size={14} className="text-indigo" />
                300mbps
              </div>
              <div className="absolute -right-2 bottom-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-lg">
                <Coffee size={14} className="text-indigo" />
                Café incluso
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lavender px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
              Benefícios
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Feito pra facilitar seu dia
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
                  <Icon size={18} />
                </span>
                <h3 className="font-display mt-4 text-[15px] font-bold">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
              Como funciona
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Três passos simples
            </h2>
          </div>

          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-indigo/20 sm:block" />
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <span className="font-display relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo text-white shadow-lg shadow-indigo-200">
                  {i + 1}
                </span>
                <h3 className="font-display mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-[13px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lavender px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
                Catálogo
              </span>
              <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
                Espaços em destaque
              </h2>
            </div>
            <Link
              to="/workspaces"
              className="hidden items-center gap-1 text-sm font-semibold text-ink hover:underline sm:flex"
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando espaços…</p>
            ) : isError || !data || data.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum espaço disponível no momento. Volte em breve.
              </p>
            ) : (
              data.items.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-indigo px-8 py-16 text-center text-white sm:py-20">
          <div className="blob-shape absolute -right-16 -top-16 h-56 w-56 bg-lime/30" />
          <div className="blob-shape absolute -bottom-20 -left-10 h-64 w-64 bg-white/10" />
          <h2 className="font-display relative text-3xl font-bold sm:text-5xl">
            Pronto pro seu próximo
            <br />
            dia produtivo?
          </h2>
          <Button
            size="lg"
            className="relative mt-8 rounded-2xl bg-white text-indigo shadow-xl hover:bg-white/90"
            asChild
          >
            <Link to="/signup" className="flex items-center justify-center gap-2">
              Criar conta gratuita
              <ArrowRight size={15} />
            </Link>
          </Button>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};
