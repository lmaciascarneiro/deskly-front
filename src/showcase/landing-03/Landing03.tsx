import { Link } from 'react-router-dom';
import {
  Search,
  Heart,
  Star,
  MapPin,
  Home,
  Building2,
  Users,
  Coffee,
  Briefcase,
  Palette,
  ShieldCheck,
  Wifi,
  Clock,
  BadgeCheck,
} from 'lucide-react';
import './landing03.css';

const categories = [
  { icon: Home, label: 'Home office' },
  { icon: Building2, label: 'Coworking' },
  { icon: Users, label: 'Meeting room' },
  { icon: Coffee, label: 'Cafe' },
  { icon: Briefcase, label: 'Private office' },
  { icon: Palette, label: 'Studio' },
];

const benefits = [
  { icon: ShieldCheck, title: 'Verified spaces', description: 'Every listing is visited by our team.' },
  { icon: Wifi, title: 'Fast internet', description: 'Guaranteed minimum speed at every space.' },
  { icon: Clock, title: 'Book by the hour', description: 'From 1 hour to a full day, you decide.' },
  { icon: BadgeCheck, title: 'Rated hosts', description: 'Real ratings and reviews from past guests.' },
];

const workspaces = [
  { name: 'Casa Jardim Studio', city: 'Vila Madalena, São Paulo', price: '$32/h', rating: '4.92', photo: 'l03-photo-1', badge: 'Available today' },
  { name: 'Terrace Coworking', city: 'Botafogo, Rio de Janeiro', price: '$41/h', rating: '4.87', photo: 'l03-photo-2', badge: 'Superhost' },
  { name: 'Cafe Works Well', city: 'Savassi, Belo Horizonte', price: '$18/h', rating: '4.75', photo: 'l03-photo-3', badge: 'New' },
  { name: 'Aurora Executive Room', city: 'Batel, Curitiba', price: '$55/h', rating: '4.95', photo: 'l03-photo-4', badge: 'Available today' },
  { name: "Ana's Home Office", city: 'Moinhos de Vento, Porto Alegre', price: '$27/h', rating: '4.81', photo: 'l03-photo-5', badge: 'Superhost' },
  { name: 'Lumen Creative Studio', city: 'Pinheiros, São Paulo', price: '$36/h', rating: '4.9', photo: 'l03-photo-2', badge: 'New' },
];

const steps = [
  { title: 'Search', description: 'Filter by city, space type, and the time you need.', photo: 'l03-photo-1' },
  { title: 'Book', description: 'Confirm the time slot and pay securely through the app.', photo: 'l03-photo-2' },
  { title: 'Work', description: 'Arrive at the scheduled time and enjoy the space.', photo: 'l03-photo-3' },
];

export function Landing03() {
  return (
    <div className="l03 min-h-screen antialiased">
      <header className="sticky top-0 z-20 border-b border-[var(--l03-border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
          <span className="text-xl font-extrabold tracking-tight text-[var(--l03-rausch)]">
            deskly
          </span>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex items-center divide-x divide-[var(--l03-border)] rounded-full border border-[var(--l03-border)] py-2 pl-5 pr-2 shadow-sm transition-shadow hover:shadow-md">
              <span className="pr-4 text-sm font-semibold">Where</span>
              <span className="px-4 text-sm text-[var(--l03-muted)]">Date</span>
              <span className="flex items-center gap-2 pl-4 text-sm text-[var(--l03-muted)]">
                People
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--l03-rausch)] text-white">
                  <Search size={14} />
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden cursor-default rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--l03-surface)] sm:inline">
              List your space
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--l03-surface)]">
              <Users size={16} />
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 pb-4 pt-1 sm:px-10">
          {categories.map((c, i) => (
            <div
              key={c.label}
              className={`flex shrink-0 cursor-default flex-col items-center gap-1.5 border-b-2 pb-2 text-xs ${
                i === 0
                  ? 'border-[var(--l03-ink)] text-[var(--l03-ink)]'
                  : 'border-transparent text-[var(--l03-muted)] hover:border-[var(--l03-muted)]'
              }`}
            >
              <c.icon size={20} strokeWidth={1.6} />
              <span className="whitespace-nowrap font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="l03-pop">
            <h1 className="text-[36px] font-extrabold leading-[1.1] tracking-tight sm:text-[52px]">
              Find the perfect workspace for your next productive day.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[var(--l03-muted)]">
              Thousands of verified spaces — from cozy cafes to executive rooms —
              waiting for you in minutes.
            </p>
            <button className="mt-8 flex items-center gap-2 rounded-full bg-[var(--l03-rausch)] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--l03-rausch)]/25 transition-transform hover:scale-[1.03]">
              <Search size={16} />
              Search workspaces
            </button>

            <div className="mt-10 flex items-center gap-6 text-sm">
              <div>
                <p className="text-xl font-extrabold">2,400+</p>
                <p className="text-xs text-[var(--l03-muted)]">active spaces</p>
              </div>
              <div className="h-8 w-px bg-[var(--l03-border)]" />
              <div>
                <p className="text-xl font-extrabold">4.8</p>
                <p className="text-xs text-[var(--l03-muted)]">average rating</p>
              </div>
              <div className="h-8 w-px bg-[var(--l03-border)]" />
              <div>
                <p className="text-xl font-extrabold">32</p>
                <p className="text-xs text-[var(--l03-muted)]">cities</p>
              </div>
            </div>
          </div>

          <div className="l03-pop relative" style={{ animationDelay: '0.1s' }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="l03-photo-1 h-52 translate-y-6 rounded-3xl" />
              <div className="l03-photo-2 h-52 rounded-3xl" />
              <div className="l03-photo-3 h-52 rounded-3xl" />
              <div className="l03-photo-4 h-52 translate-y-6 rounded-3xl" />
            </div>
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--l03-teal)]/10 text-[var(--l03-teal)]">
                <BadgeCheck size={18} />
              </span>
              <div>
                <p className="text-sm font-bold">Superhost</p>
                <p className="text-xs text-[var(--l03-muted)]">98% approval</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Why book with Deskly
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--l03-border)] text-[var(--l03-rausch)]">
                <Icon size={20} strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--l03-muted)]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--l03-surface)] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className={`${step.photo} mb-5 h-36 rounded-2xl`} />
                <span className="text-xs font-bold text-[var(--l03-rausch)]">Step {i + 1}</span>
                <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--l03-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Featured spaces
          </h2>
          <span className="hidden text-sm font-semibold text-[var(--l03-ink)] underline decoration-2 underline-offset-4 sm:inline">
            See all
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((w) => (
            <div key={w.name} className="l03-card cursor-default">
              <div className={`${w.photo} relative h-56 rounded-2xl`}>
                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--l03-muted)] transition-colors hover:text-[var(--l03-rausch)]">
                  <Heart size={15} />
                </button>
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold">
                  {w.badge}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-bold">{w.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--l03-muted)]">
                    <MapPin size={11} /> {w.city}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                  <Star size={13} className="fill-[var(--l03-ink)] text-[var(--l03-ink)]" />
                  {w.rating}
                </span>
              </div>
              <p className="mt-2 text-sm">
                <span className="font-extrabold">{w.price}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2.5rem] bg-[var(--l03-ink)] px-8 py-14 text-white sm:grid-cols-2 sm:px-14">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Have a great space? Become a host.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
              Turn your space's idle hours into extra income by hosting verified
              remote professionals.
            </p>
            <button className="mt-7 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[var(--l03-ink)] transition-transform hover:scale-[1.03]">
              List your space
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="l03-photo-4 h-32 rounded-2xl" />
            <div className="l03-photo-5 h-32 translate-y-4 rounded-2xl" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--l03-border)] bg-[var(--l03-surface)] px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div className="space-y-3">
            <p className="font-bold">Support</p>
            <p className="text-[var(--l03-muted)]">Help center</p>
            <p className="text-[var(--l03-muted)]">Safety</p>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Community</p>
            <p className="text-[var(--l03-muted)]">Deskly.org</p>
            <p className="text-[var(--l03-muted)]">Accessibility</p>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Hosting</p>
            <p className="text-[var(--l03-muted)]">List your space</p>
            <p className="text-[var(--l03-muted)]">Resources</p>
          </div>
          <div className="space-y-3">
            <p className="font-bold">Deskly</p>
            <p className="text-[var(--l03-muted)]">About</p>
            <p className="text-[var(--l03-muted)]">Careers</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-[var(--l03-border)] pt-6 text-xs text-[var(--l03-muted)] sm:flex-row">
          <span>&copy; 2026 Deskly, Inc.</span>
          <Link to="/showcase" className="font-semibold text-[var(--l03-ink)] hover:underline">
            &larr; Showcase
          </Link>
        </div>
      </footer>
    </div>
  );
}
