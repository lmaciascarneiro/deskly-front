import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import './landing04.css';

const benefits = [
  {
    title: 'Verified',
    description: 'Every space is visited and approved before joining the catalog.',
  },
  {
    title: 'Fast internet',
    description: 'Speed tested. No more calls dropping mid-meeting.',
  },
  {
    title: 'By the hour',
    description: 'Pay only for the time you need, in whatever way makes sense.',
  },
  {
    title: 'No red tape',
    description: 'Book, confirm, work. Simple cancellation whenever you need it.',
  },
];

const steps = [
  { title: 'Choose', description: 'A space that fits your day.' },
  { title: 'Confirm', description: 'The exact time slot you need.' },
  { title: 'Work', description: 'With everything ready when you arrive.' },
];

const workspaces = [
  { name: 'North Studio', city: 'São Paulo', price: '$40/h', field: 'l04-field-1' },
  { name: 'Quiet Room', city: 'Lisbon', price: '€12/h', field: 'l04-field-2' },
  { name: 'Green Balcony', city: 'Florianópolis', price: '$34/h', field: 'l04-field-3' },
];

export function Landing04() {
  return (
    <div className="l04 min-h-screen antialiased">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 sm:px-10">
        <span className="l04-serif text-xl">Deskly</span>
        <nav className="hidden items-center gap-10 text-[13px] text-[var(--l04-muted)] md:flex">
          <span className="cursor-default">Spaces</span>
          <span className="cursor-default">How it works</span>
          <span className="cursor-default">Hosts</span>
        </nav>
        <span className="flex items-center gap-1.5 text-[13px] text-[var(--l04-ink)]">
          Sign in
          <ArrowRight size={12} />
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-28 pt-20 sm:px-10 sm:pt-32">
        <div className="l04-fade max-w-3xl">
          <p className="text-[13px] uppercase tracking-[0.2em] text-[var(--l04-muted)]">
            Deskly &mdash; workspaces
          </p>
          <h1 className="l04-serif mt-6 text-[42px] leading-[1.15] sm:text-[64px]">
            The <span className="italic text-[var(--l04-blue)]">right</span> place for every
            workday.
          </h1>
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[var(--l04-muted)]">
            Find and book carefully curated spaces. No noise, no excess —
            just the essentials for you to work well.
          </p>
          <div className="mt-10 flex items-center gap-2 text-[14px]">
            <span className="rounded-full border border-[var(--l04-ink)] px-6 py-2.5">
              Explore spaces
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--l04-line)] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
            {workspaces.map((w) => (
              <div key={w.name}>
                <div className={`${w.field} h-56 rounded-md`} />
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <p className="l04-serif text-lg">{w.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-[13px] text-[var(--l04-muted)]">
                      <MapPin size={11} /> {w.city}
                    </p>
                  </div>
                  <span className="text-[13px] text-[var(--l04-muted)]">{w.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--l04-line)] px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="l04-serif max-w-md text-3xl leading-snug sm:text-4xl">
            Details that make a <span className="italic">difference</span>.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div key={b.title} className="border-t border-[var(--l04-line)] pt-6">
                <p className="text-[13px] text-[var(--l04-muted)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="l04-serif mt-3 text-xl">{b.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[var(--l04-muted)]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--l04-line)] px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="l04-serif text-3xl sm:text-4xl">How it works</h2>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--l04-ink)] text-[13px]">
                  {i + 1}
                </span>
                <h3 className="l04-serif mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[var(--l04-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--l04-line)] px-6 py-32 text-center sm:px-10">
        <h2 className="l04-serif mx-auto max-w-lg text-3xl leading-snug sm:text-5xl">
          Your next productive day <span className="italic text-[var(--l04-blue)]">starts</span>{' '}
          here.
        </h2>
        <div className="mt-10">
          <span className="rounded-full border border-[var(--l04-ink)] px-7 py-3 text-[14px]">
            Create free account
          </span>
        </div>
      </section>

      <footer className="border-t border-[var(--l04-line)] px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-[13px] text-[var(--l04-muted)] sm:flex-row">
          <span>&copy; 2026 Deskly</span>
          <div className="flex gap-6">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
            <Link to="/showcase" className="text-[var(--l04-ink)] hover:underline">
              &larr; Showcase
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
