import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  ShieldCheck,
  Wifi,
  Timer,
  MapPin,
  Star,
} from 'lucide-react';
import './landing01.css';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Espaços verificados',
    description: 'Toda unidade passa por inspeção antes de entrar na plataforma.',
  },
  {
    icon: Wifi,
    title: 'Internet dedicada',
    description: 'Mínimo de 100mbps garantido, testado em cada visita de verificação.',
  },
  {
    icon: Timer,
    title: 'Reserva por hora',
    description: 'Pague só pelo tempo que for usar — de uma hora a um dia inteiro.',
  },
  {
    icon: CalendarCheck,
    title: 'Cancelamento flexível',
    description: 'Reagende ou cancele até 2h antes sem custo adicional.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Escolha o espaço',
    description: 'Filtre por cidade, tipo de ambiente e recursos disponíveis.',
  },
  {
    n: '02',
    title: 'Confirme o horário',
    description: 'Selecione o período exato — sem pacotes fechados ou mínimos.',
  },
  {
    n: '03',
    title: 'Chegue e trabalhe',
    description: 'Check-in digital. O anfitrião já recebe sua confirmação.',
  },
];

const workspaces = [
  { name: 'Estúdio Aurora', city: 'São Paulo, SP', price: 'R$ 39/h', rating: '4.9' },
  { name: 'Base Coworking', city: 'Florianópolis, SC', price: 'R$ 28/h', rating: '4.8' },
  { name: 'Sala Meridiano', city: 'Belo Horizonte, MG', price: 'R$ 45/h', rating: '5.0' },
];

export function Landing01() {
  return (
    <div className="l01 min-h-screen antialiased">
      <header className="sticky top-0 z-20 border-b border-[var(--l01-border)] bg-[var(--l01-bg)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--l01-indigo)] to-[var(--l01-violet)] text-[11px] font-bold text-white">
              D
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Deskly</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[var(--l01-muted)] md:flex">
            <span className="cursor-default transition-colors hover:text-[var(--l01-fg)]">Produto</span>
            <span className="cursor-default transition-colors hover:text-[var(--l01-fg)]">Como funciona</span>
            <span className="cursor-default transition-colors hover:text-[var(--l01-fg)]">Para anfitriões</span>
            <span className="cursor-default transition-colors hover:text-[var(--l01-fg)]">Preços</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden cursor-default text-sm text-[var(--l01-muted)] sm:inline">Entrar</span>
            <button className="rounded-full bg-[var(--l01-fg)] px-4 py-1.5 text-sm font-medium text-[var(--l01-bg)] transition-transform hover:scale-[1.03]">
              Começar
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-28 pt-20 sm:px-8 sm:pt-28">
          <div className="l01-orb -left-32 top-10 h-72 w-72" />
          <div className="l01-orb -right-24 top-40 h-64 w-64" style={{ animationDelay: '2s' }} />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="l01-fade-up l01-mono inline-flex items-center gap-2 rounded-full border border-[var(--l01-border-strong)] px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[var(--l01-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--l01-indigo)]" />
              Workspaces sob demanda
            </span>

            <h1
              className="l01-fade-up mt-6 text-[42px] font-semibold leading-[1.08] tracking-tight sm:text-[64px]"
              style={{ animationDelay: '0.05s' }}
            >
              O escritório certo,
              <br />
              <span className="l01-gradient-text">a qualquer hora.</span>
            </h1>

            <p
              className="l01-fade-up mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[var(--l01-muted)]"
              style={{ animationDelay: '0.1s' }}
            >
              Reserve coworkings, salas de reunião e home offices verificados em minutos.
              Sem contrato, sem mensalidade — só o tempo que você precisa.
            </p>

            <div
              className="l01-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: '0.15s' }}
            >
              <button className="flex items-center gap-1.5 rounded-full bg-[var(--l01-fg)] px-5 py-2.5 text-sm font-medium text-[var(--l01-bg)] transition-transform hover:scale-[1.03]">
                Reservar workspace
                <ArrowRight size={15} />
              </button>
              <button className="flex items-center gap-1.5 rounded-full border border-[var(--l01-border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--l01-fg)] transition-colors hover:border-[var(--l01-muted)]">
                Ver como funciona
              </button>
            </div>
          </div>

          <div
            className="l01-fade-up relative mx-auto mt-20 max-w-4xl"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="rounded-2xl border border-[var(--l01-border)] bg-[var(--l01-bg-elev)] p-2 shadow-[0_0_80px_-20px_rgba(99,102,241,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--l01-border)] px-3 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                <span className="l01-mono ml-3 text-[11px] text-[var(--l01-muted)]">
                  deskly.app/reservas
                </span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-[var(--l01-border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {workspaces.map((w) => (
                  <div key={w.name} className="p-5 text-left">
                    <div className="mb-3 h-20 rounded-lg bg-gradient-to-br from-[#1a1a1f] to-[#0d0d10]" />
                    <p className="text-sm font-medium">{w.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[var(--l01-muted)]">
                      <MapPin size={11} /> {w.city}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="l01-mono text-xs text-[var(--l01-muted)]">{w.price}</span>
                      <span className="flex items-center gap-1 text-xs text-[var(--l01-fg)]">
                        <Star size={11} className="fill-[var(--l01-indigo)] text-[var(--l01-indigo)]" />
                        {w.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--l01-border)] px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="l01-mono text-xs uppercase tracking-[0.2em] text-[var(--l01-muted)]">
              Por que Deskly
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Feito para quem trabalha de qualquer lugar.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 divide-y divide-[var(--l01-border)] border-t border-[var(--l01-border)] sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group px-6 py-8 transition-colors hover:bg-[var(--l01-bg-elev)]">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--l01-border-strong)] text-[var(--l01-indigo)]">
                  <Icon size={16} />
                </div>
                <h3 className="text-[15px] font-medium">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--l01-muted)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--l01-border)] px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="l01-mono text-xs uppercase tracking-[0.2em] text-[var(--l01-muted)]">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Três passos até sua próxima mesa.
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.n} className="relative pl-0">
                  <div className="flex items-center gap-3">
                    <span className="l01-mono text-2xl font-semibold text-[var(--l01-border-strong)]">
                      {step.n}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="hidden h-px flex-1 bg-[var(--l01-border)] sm:block" />
                    )}
                  </div>
                  <h3 className="mt-4 text-[16px] font-medium">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--l01-muted)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--l01-border)] px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between">
              <div>
                <p className="l01-mono text-xs uppercase tracking-[0.2em] text-[var(--l01-muted)]">
                  Catálogo
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Espaços em destaque
                </h2>
              </div>
              <span className="hidden items-center gap-1 text-sm text-[var(--l01-muted)] sm:flex">
                Ver todos <ArrowUpRight size={14} />
              </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {workspaces.map((w) => (
                <div
                  key={w.name}
                  className="group rounded-2xl border border-[var(--l01-border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--l01-border-strong)]"
                >
                  <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-[#16161a] to-[#0a0a0c]" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[15px] font-medium">{w.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[var(--l01-muted)]">
                        <MapPin size={11} /> {w.city}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-[var(--l01-border-strong)] px-2 py-0.5 text-xs">
                      <Star size={10} className="fill-[var(--l01-indigo)] text-[var(--l01-indigo)]" />
                      {w.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--l01-border)] pt-4">
                    <span className="l01-mono text-sm text-[var(--l01-fg)]">{w.price}</span>
                    <span className="text-xs text-[var(--l01-muted)] transition-colors group-hover:text-[var(--l01-fg)]">
                      Reservar &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--l01-border)] px-6 py-24 sm:px-8">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--l01-border)] bg-[var(--l01-bg-elev)] px-8 py-16 text-center">
            <div className="l01-orb left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Seu próximo dia produtivo
              <br />
              <span className="l01-gradient-text">começa em minutos.</span>
            </h2>
            <button className="relative mt-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--l01-fg)] px-6 py-2.5 text-sm font-medium text-[var(--l01-bg)] transition-transform hover:scale-[1.03]">
              Criar conta gratuita
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--l01-border)] px-6 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[var(--l01-indigo)] to-[var(--l01-violet)] text-[11px] font-bold text-white">
                D
              </span>
              <span className="text-[15px] font-semibold tracking-tight">Deskly</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-[var(--l01-muted)]">
              Espaços de trabalho verificados, reservados em minutos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[13px] text-[var(--l01-muted)] sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-[var(--l01-fg)]">Produto</p>
              <p>Como funciona</p>
              <p>Para anfitriões</p>
              <p>Preços</p>
            </div>
            <div className="space-y-2">
              <p className="text-[var(--l01-fg)]">Empresa</p>
              <p>Sobre</p>
              <p>Carreiras</p>
              <p>Blog</p>
            </div>
            <div className="space-y-2">
              <p className="text-[var(--l01-fg)]">Legal</p>
              <p>Privacidade</p>
              <p>Termos</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-[var(--l01-border)] pt-6 text-xs text-[var(--l01-muted)]">
          <span>&copy; 2026 Deskly. Todos os direitos reservados.</span>
          <Link to="/showcase" className="transition-colors hover:text-[var(--l01-fg)]">
            &larr; Showcase
          </Link>
        </div>
      </footer>
    </div>
  );
}
