import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Coffee,
  Wifi,
  Heart,
  Star,
  MapPin,
  Wand2,
} from 'lucide-react';
import './landing02.css';

const benefits = [
  {
    icon: Zap,
    title: 'Reserva instantânea',
    description: 'Confirmação em segundos, sem trocar mensagem com ninguém.',
    color: 'violet',
  },
  {
    icon: Wifi,
    title: 'Internet turbo',
    description: 'Fibra dedicada testada em toda unidade parceira.',
    color: 'pink',
  },
  {
    icon: Coffee,
    title: 'Café incluso',
    description: 'Porque ninguém programa, desenha ou vende direito sem cafeína.',
    color: 'orange',
  },
  {
    icon: Heart,
    title: 'Curadoria de verdade',
    description: 'Só entra no catálogo quem passa no nosso teste de vibe.',
    color: 'violet',
  },
];

const steps = [
  { title: 'Explore', description: 'Navegue por espaços incríveis perto de você.', color: 'violet' },
  { title: 'Reserve', description: 'Escolha o horário e confirme com um toque.', color: 'pink' },
  { title: 'Produza', description: 'Chegue, faça login no wifi e mergulhe no trabalho.', color: 'orange' },
];

const workspaces = [
  { name: 'Loft Prisma', city: 'São Paulo', price: 'R$ 55/h', tag: 'Popular', color: 'violet' },
  { name: 'Nômade Hub', city: 'Rio de Janeiro', price: 'R$ 42/h', tag: 'Novo', color: 'pink' },
  { name: 'Vértice Coworking', city: 'Curitiba', price: 'R$ 38/h', tag: 'Top avaliado', color: 'orange' },
];

const colorMap: Record<string, { text: string; bg: string; glow: string; ring: string }> = {
  violet: { text: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]', glow: 'l02-glow-violet', ring: 'ring-[#7C3AED]/30' },
  pink: { text: 'text-[#EC4899]', bg: 'bg-[#EC4899]', glow: 'l02-glow-pink', ring: 'ring-[#EC4899]/30' },
  orange: { text: 'text-[#F97316]', bg: 'bg-[#F97316]', glow: 'l02-glow-orange', ring: 'ring-[#F97316]/30' },
};

export function Landing02() {
  return (
    <div className="l02 min-h-screen antialiased">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/25 backdrop-blur">
              <Sparkles size={16} />
            </span>
            <span className="l02-display text-lg font-bold">Deskly</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/90 md:flex">
            <span className="cursor-default">Espaços</span>
            <span className="cursor-default">Como funciona</span>
            <span className="cursor-default">Anfitriões</span>
          </nav>
          <button className="l02-glass rounded-full px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105">
            Começar agora
          </button>
        </div>
      </header>

      <section className="l02-mesh relative overflow-hidden px-6 pb-32 pt-40 sm:px-10 sm:pt-48">
        <div className="l02-blob left-[8%] top-[15%] h-40 w-40 bg-orange-300" />
        <div className="l02-blob right-[10%] top-[35%] h-56 w-56 bg-pink-300" style={{ animationDelay: '2s' }} />
        <div className="l02-blob bottom-[5%] left-[30%] h-48 w-48 bg-white/40" style={{ animationDelay: '4s' }} />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="l02-rise l02-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white">
            <Wand2 size={13} /> Reserve espaços incríveis em segundos
          </span>

          <h1
            className="l02-rise l02-display mt-7 text-[44px] font-bold leading-[1.05] text-white sm:text-[76px]"
            style={{ animationDelay: '0.08s' }}
          >
            Trabalhe onde a
            <br />
            criatividade mora.
          </h1>

          <p
            className="l02-rise mx-auto mt-6 max-w-xl text-[17px] font-medium leading-relaxed text-white/90"
            style={{ animationDelay: '0.16s' }}
          >
            Coworkings, salas de reunião e cafés preparados pra produtividade — reservados em
            minutos, com aquele friozinho na barriga de espaço novo.
          </p>

          <div className="l02-rise mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.24s' }}>
            <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#7C3AED] shadow-xl transition-transform hover:scale-105">
              Encontrar meu espaço
              <ArrowRight size={16} />
            </button>
            <button className="l02-glass rounded-full px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
              Ver como funciona
            </button>
          </div>
        </div>

        <div className="l02-rise relative mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3" style={{ animationDelay: '0.3s' }}>
          {workspaces.map((w) => (
            <div key={w.name} className="l02-glass rounded-3xl p-5 text-left text-white">
              <div className="mb-4 flex h-24 items-center justify-center rounded-2xl bg-white/15">
                <span className="l02-display text-2xl font-bold text-white/70">{w.name[0]}</span>
              </div>
              <p className="l02-display text-[15px] font-semibold">{w.name}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                <MapPin size={11} /> {w.city}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-bold">{w.price}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">{w.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="l02-display text-sm font-bold uppercase tracking-wide text-[#EC4899]">
              Benefícios
            </span>
            <h2 className="l02-display mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
              Tudo pensado pra você render mais
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description, color }) => {
              const c = colorMap[color];
              return (
                <div
                  key={title}
                  className={`group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 ${c.glow}`}
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${c.bg} text-white`}>
                    <Icon size={19} />
                  </div>
                  <h3 className="l02-display text-[16px] font-bold">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/60">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-28 sm:px-10" style={{ background: '#FAF7FF' }}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="l02-display text-sm font-bold uppercase tracking-wide text-[#F97316]">
              Como funciona
            </span>
            <h2 className="l02-display mx-auto mt-3 max-w-xl text-3xl font-bold sm:text-5xl">
              Três passos, zero fricção
            </h2>
          </div>

          <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <div key={step.title} className="relative rounded-3xl bg-white p-8 text-center shadow-sm">
                  <span
                    className={`l02-display mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${c.bg}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="l02-display mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-black/60">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="l02-display text-sm font-bold uppercase tracking-wide text-[#7C3AED]">
                Catálogo
              </span>
              <h2 className="l02-display mt-3 text-3xl font-bold sm:text-5xl">
                Espaços que a galera ama
              </h2>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {workspaces.map((w) => {
              const c = colorMap[w.color];
              return (
                <div
                  key={w.name}
                  className={`group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 ${c.glow}`}
                >
                  <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${c.bg} to-white/0`}>
                    <span className="l02-display text-4xl font-bold text-white/80">{w.name[0]}</span>
                    <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black/60 transition-colors hover:text-[#EC4899]">
                      <Heart size={14} />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="l02-display text-[15px] font-bold">{w.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-black/50">
                          <MapPin size={11} /> {w.city}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold">
                        <Star size={11} className="fill-[#F97316] text-[#F97316]" />
                        4.9
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="l02-display text-sm font-bold">{w.price}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${c.bg}`}>
                        {w.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="l02-mesh relative overflow-hidden px-6 py-28 text-center sm:px-10">
        <div className="l02-blob left-1/4 top-1/4 h-40 w-40 bg-white/30" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="l02-display text-3xl font-bold text-white sm:text-5xl">
            Bora achar seu próximo espaço favorito?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-medium text-white/90">
            Crie sua conta grátis e reserve seu primeiro workspace hoje mesmo.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#7C3AED] shadow-xl transition-transform hover:scale-105">
            Criar conta gratuita
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="px-6 py-14 sm:px-10" style={{ background: 'var(--l02-ink)' }}>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 text-white sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                <Sparkles size={16} />
              </span>
              <span className="l02-display text-lg font-bold">Deskly</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-white/60">
              O jeito mais vibrante de encontrar onde trabalhar hoje.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[13px] text-white/60 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="font-semibold text-white">Produto</p>
              <p>Como funciona</p>
              <p>Anfitriões</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-white">Empresa</p>
              <p>Sobre</p>
              <p>Blog</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-white">Legal</p>
              <p>Privacidade</p>
              <p>Termos</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <span>&copy; 2026 Deskly</span>
          <Link to="/showcase" className="transition-colors hover:text-white">
            &larr; Showcase
          </Link>
        </div>
      </footer>
    </div>
  );
}
