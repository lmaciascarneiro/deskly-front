import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Wifi,
  Coffee,
  ShieldCheck,
  Clock,
  Star,
  MapPin,
  Sparkles,
} from 'lucide-react';
import './landing05.css';
import { WorkspaceIllustration } from './WorkspaceIllustration';

const benefits = [
  { icon: ShieldCheck, title: 'Verified spaces', description: 'In-person inspection before any listing goes live.' },
  { icon: Wifi, title: 'Fast internet', description: 'We test the real speed of every partner location.' },
  { icon: Coffee, title: 'Coffee included', description: 'Most spaces already come with free coffee.' },
  { icon: Clock, title: 'Flexible by the hour', description: 'Book only the time you need, no fixed packages.' },
];

const steps = [
  { title: 'Discover', description: 'Explore spaces near you in just a few clicks.' },
  { title: 'Book', description: 'Pick the right time slot and confirm instantly.' },
  { title: 'Produce', description: 'Arrive, connect, and start working.' },
];

const workspaces = [
  { name: 'Orbit Coworking', city: 'São Paulo, SP', price: '$37/h', rating: '4.9' },
  { name: 'Flow Room', city: 'Recife, PE', price: '$29/h', rating: '4.7' },
  { name: 'Base 12', city: 'Belo Horizonte, MG', price: '$44/h', rating: '4.8' },
];

export function Landing05() {
  return (
    <div className="l05 min-h-screen antialiased">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <span className="l05-display flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--l05-indigo)] text-sm font-bold text-white">
            D
          </span>
          <span className="l05-display text-lg font-bold">Deskly</span>
        </div>
        <nav className="hidden items-center gap-2 rounded-full bg-[var(--l05-lavender)] p-1 text-sm font-medium md:flex">
          <span className="cursor-default rounded-full px-4 py-1.5">Spaces</span>
          <span className="cursor-default rounded-full px-4 py-1.5">How it works</span>
          <span className="cursor-default rounded-full px-4 py-1.5">Hosts</span>
        </nav>
        <button className="l05-display flex items-center gap-1.5 rounded-full bg-[var(--l05-indigo)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105">
          Get started
          <ArrowRight size={14} />
        </button>
      </header>

      <section className="relative overflow-hidden px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="l05-pop">
            <span className="l05-display inline-flex items-center gap-1.5 rounded-full bg-[var(--l05-lime)]/20 px-4 py-1.5 text-xs font-bold text-[#4d7c0f]">
              <Sparkles size={12} /> New in 12 cities
            </span>
            <h1 className="l05-display mt-6 text-[38px] font-bold leading-[1.1] sm:text-[54px]">
              Your office,
              <br />
              wherever life takes you.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--l05-muted)]">
              Find verified workspaces near you and book in minutes. Coworking spaces,
              meeting rooms, and cafes ready for productivity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="l05-display flex items-center justify-center gap-2 rounded-2xl bg-[var(--l05-indigo)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105">
                Find a workspace
                <ArrowRight size={15} />
              </button>
              <button className="l05-display rounded-2xl border-2 border-[var(--l05-ink)] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[var(--l05-ink)] hover:text-white">
                See how it works
              </button>
            </div>
          </div>

          <div className="l05-pop relative" style={{ animationDelay: '0.1s' }}>
            <div className="l05-blob absolute inset-0 -z-10 bg-[var(--l05-lavender)]" />
            <div className="relative rounded-[2rem] bg-[var(--l05-lavender)] p-8">
              <WorkspaceIllustration />
              <div
                className="l05-float absolute -left-4 top-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-lg"
                style={{ ['--r' as string]: '-4deg' }}
              >
                <Wifi size={14} className="text-[var(--l05-indigo)]" />
                300mbps
              </div>
              <div
                className="l05-float absolute -right-2 bottom-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-lg"
                style={{ ['--r' as string]: '3deg', animationDelay: '1s' }}
              >
                <Coffee size={14} className="text-[var(--l05-indigo)]" />
                Coffee included
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--l05-lavender)] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="l05-display text-sm font-bold uppercase tracking-wide text-[var(--l05-indigo)]">
              Benefits
            </span>
            <h2 className="l05-display mt-3 text-3xl font-bold sm:text-4xl">
              Made to make your day easier
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--l05-indigo)]/10 text-[var(--l05-indigo)]">
                  <Icon size={18} />
                </span>
                <h3 className="l05-display mt-4 text-[15px] font-bold">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--l05-muted)]">
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
            <span className="l05-display text-sm font-bold uppercase tracking-wide text-[var(--l05-indigo)]">
              How it works
            </span>
            <h2 className="l05-display mt-3 text-3xl font-bold sm:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-[var(--l05-indigo)]/20 sm:block" />
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <span className="l05-display relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--l05-indigo)] text-white shadow-lg shadow-indigo-200">
                  {i + 1}
                </span>
                <h3 className="l05-display mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-[13px] leading-relaxed text-[var(--l05-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--l05-lavender)] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <span className="l05-display text-sm font-bold uppercase tracking-wide text-[var(--l05-indigo)]">
                Catalog
              </span>
              <h2 className="l05-display mt-3 text-3xl font-bold sm:text-4xl">
                Trending spaces
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {workspaces.map((w, i) => (
              <div
                key={w.name}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="l05-blob relative m-4 flex h-36 items-center justify-center bg-gradient-to-br from-[var(--l05-indigo)]/15 to-[var(--l05-lime)]/25">
                  <span className="l05-display text-3xl font-bold text-[var(--l05-indigo)]/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="px-5 pb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="l05-display text-[15px] font-bold">{w.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[var(--l05-muted)]">
                        <MapPin size={11} /> {w.city}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <Star size={11} className="fill-[var(--l05-lime)] text-[#65a30d]" />
                      {w.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="l05-display text-sm font-bold text-[var(--l05-indigo)]">
                      {w.price}
                    </span>
                    <span className="rounded-full bg-[var(--l05-ink)] px-3 py-1 text-xs font-semibold text-white">
                      Book
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[var(--l05-indigo)] px-8 py-16 text-center text-white sm:py-20">
          <div className="l05-blob absolute -right-16 -top-16 h-56 w-56 bg-[var(--l05-lime)]/30" />
          <div className="l05-blob absolute -bottom-20 -left-10 h-64 w-64 bg-white/10" />
          <h2 className="l05-display relative text-3xl font-bold sm:text-5xl">
            Ready for your next
            <br />
            productive day?
          </h2>
          <button className="l05-display relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-[var(--l05-indigo)] shadow-xl transition-transform hover:scale-105">
            Create free account
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <footer className="bg-[var(--l05-ink)] px-6 py-14 text-white sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="l05-display flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--l05-lime)] text-sm font-bold text-[var(--l05-ink)]">
                D
              </span>
              <span className="l05-display text-lg font-bold">Deskly</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-white/60">
              On-demand workspaces for people who work from anywhere.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[13px] text-white/60 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="l05-display font-semibold text-white">Product</p>
              <p>How it works</p>
              <p>Hosts</p>
            </div>
            <div className="space-y-2">
              <p className="l05-display font-semibold text-white">Company</p>
              <p>About</p>
              <p>Blog</p>
            </div>
            <div className="space-y-2">
              <p className="l05-display font-semibold text-white">Legal</p>
              <p>Privacy</p>
              <p>Terms</p>
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
