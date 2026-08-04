import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface LandingMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  swatches: string[];
  bg: string;
  fg: string;
  accentText: string;
  font: string;
}

const landings: LandingMeta[] = [
  {
    id: 'landing-01',
    number: '01',
    title: 'Minimal',
    subtitle: 'Linear / Stripe',
    description:
      'Near-absolute black, precise grotesque typography, and hairlines. For those who trust the product without needing to shout.',
    swatches: ['#0A0A0B', '#6366F1', '#F4F4F5'],
    bg: '#0A0A0B',
    fg: '#F4F4F5',
    accentText: '#818CF8',
    font: "'Inter', sans-serif",
  },
  {
    id: 'landing-02',
    number: '02',
    title: 'Modern Gradient',
    subtitle: 'Bold & Vivid',
    description:
      'Vibrant mesh gradients, frosted glass, and lots of visual energy. A landing page that doesn\'t go unnoticed.',
    swatches: ['#7C3AED', '#EC4899', '#F97316'],
    bg: 'linear-gradient(135deg,#7C3AED,#EC4899 60%,#F97316)',
    fg: '#FFFFFF',
    accentText: '#FDE68A',
    font: "'Space Grotesk', sans-serif",
  },
  {
    id: 'landing-03',
    number: '03',
    title: 'Airbnb Style',
    subtitle: 'Warm & Trusted',
    description:
      'White, rounded corners, rausch red, and photographic space cards. Familiar, welcoming, trustworthy.',
    swatches: ['#FF385C', '#00A699', '#FFFFFF'],
    bg: '#FFFFFF',
    fg: '#222222',
    accentText: '#FF385C',
    font: "'Plus Jakarta Sans', sans-serif",
  },
  {
    id: 'landing-04',
    number: '04',
    title: 'Apple Style',
    subtitle: 'Notion / Editorial Clean',
    description:
      'Lots of white space, editorial serif type, and a single accent color used with surgical restraint.',
    swatches: ['#FAFAF8', '#1D1D1F', '#0071E3'],
    bg: '#FAFAF8',
    fg: '#1D1D1F',
    accentText: '#0071E3',
    font: "'Fraunces', serif",
  },
  {
    id: 'landing-05',
    number: '05',
    title: 'SaaS Startup',
    subtitle: 'Cards & Illustrations',
    description:
      'Electric blue, vibrant lime, loose geometric shapes, and optimistic cards. Confident and playful.',
    swatches: ['#4F46E5', '#A3E635', '#0B1220'],
    bg: '#EEF2FF',
    fg: '#0B1220',
    accentText: '#4F46E5',
    font: "'Outfit', sans-serif",
  },
];

export function Showcase() {
  return (
    <div className="min-h-screen bg-[#0B0C0F] text-[#EDEDEF] antialiased">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 sm:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6B6D76]">
            Deskly &middot; Design Exploration
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Visual identity showcase
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <p className="max-w-2xl text-balance text-[15px] leading-relaxed text-[#9799A3]">
          Five complete landing page concepts for Deskly, each with its own typographic
          identity, palette, and composition. Choose a card to open the full landing
          page.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {landings.map((landing) => (
            <Link
              key={landing.id}
              to={`/showcase/${landing.id}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1E1F24] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#33353D]"
              style={{ background: landing.bg, color: landing.fg, minHeight: '260px' }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-xs tracking-[0.25em] opacity-70"
                  style={{ fontFamily: landing.font }}
                >
                  {landing.number}
                </span>
                <ArrowUpRight
                  size={20}
                  className="opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </div>

              <div>
                <h2
                  className="text-3xl font-semibold leading-tight"
                  style={{ fontFamily: landing.font, color: landing.accentText }}
                >
                  {landing.title}
                </h2>
                <p className="mt-1 text-sm opacity-70">{landing.subtitle}</p>
                <p className="mt-4 max-w-sm text-[13px] leading-relaxed opacity-80">
                  {landing.description}
                </p>

                <div className="mt-6 flex gap-2">
                  {landing.swatches.map((sw) => (
                    <span
                      key={sw}
                      className="h-5 w-5 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: sw }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/"
            className="group flex flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-[#2A2C33] p-7 text-[#6B6D76] transition-colors duration-300 hover:border-[#454852] hover:text-[#9799A3]"
          >
            <span className="text-sm">&larr; Back to the current site</span>
            <span className="text-xs opacity-70">Exit showcase mode</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
