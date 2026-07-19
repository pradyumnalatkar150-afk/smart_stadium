import { Radio, TicketIcon, Globe } from 'lucide-react';

interface LandingPageProps {
  onEnter: (section: string) => void;
}

const navLinks = ['Ticketing', 'Navigation', 'Food & Gastronomy', 'AR Overlays', 'Query & Feedback'];
const navTargets: Record<string, string> = {
  Ticketing: 'tournament',
  Navigation: 'ar',
  'Food & Gastronomy': 'food',
  'AR Overlays': 'ar',
  'Query & Feedback': 'feedback',
};

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Top Nav */}
      <div className="fixed top-9 left-0 right-0 z-40 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <NeuralArenaLogo size={36} />
            <span className="text-white font-bold text-base tracking-tight">Neural Arena</span>
          </div>

          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => onEnter(navTargets[link])}
                className="text-gray-400 text-sm hover:text-white transition-colors duration-150"
              >
                {link}
              </button>
            ))}
          </nav>

          <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <Globe size={14} />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 pt-32 pb-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 bg-[#111] border border-[#1e1e1e] rounded-full px-4 py-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] pulse-dot" />
          <span className="text-[#ccff00] text-xs mono font-semibold tracking-[0.2em]">LIVE — NEURAL ARENA OPERATIONAL</span>
        </div>

        <h1 className="text-7xl font-black text-white leading-tight max-w-4xl mb-6" style={{ letterSpacing: '-0.02em' }}>
          Where Spectatorship<br />Becomes Sentient
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-12 leading-relaxed">
          A sentient stadium ecosystem that breathes data and pulses with the energy of global competition.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onEnter('dashboard')}
            className="flex items-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-105"
          >
            <Radio size={18} />
            Explore Live Match
          </button>
          <button
            onClick={() => onEnter('tournament')}
            className="flex items-center gap-2.5 bg-[#111] border border-[#2a2a2a] hover:border-[#444] text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-105"
          >
            <TicketIcon size={18} />
            Book Your Seat
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-12 mt-20 text-center">
          {[
            { value: '62,418', label: 'Live Attendees' },
            { value: '94%', label: 'AI Confidence' },
            { value: '16 : 1', label: 'Current Score' },
            { value: '90\'', label: 'Match Time' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-white mono">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeuralArenaLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#111" />
      {/* Outer orbit ring */}
      <ellipse cx="20" cy="20" rx="17" ry="6" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.9"
        transform="rotate(-20 20 20)" />
      {/* Glow sphere */}
      <circle cx="20" cy="20" r="12" fill="url(#sphereGrad)" opacity="0.9" />
      {/* Stadium bowl shape */}
      <ellipse cx="20" cy="22" rx="8" ry="3.5" fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.8" />
      <line x1="13" y1="17" x2="13" y2="22" stroke="#7dd3fc" strokeWidth="1" opacity="0.7" />
      <line x1="27" y1="17" x2="27" y2="22" stroke="#7dd3fc" strokeWidth="1" opacity="0.7" />
      <ellipse cx="20" cy="17" rx="7" ry="2.5" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
      {/* Field lines */}
      <ellipse cx="20" cy="22" rx="4" ry="1.5" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.6" />
      <line x1="20" y1="20.5" x2="20" y2="23.5" stroke="#38bdf8" strokeWidth="0.6" opacity="0.5" />
      {/* Ring highlight */}
      <ellipse cx="20" cy="20" rx="17" ry="6" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"
        transform="rotate(-20 20 20)" />
      <defs>
        <radialGradient id="sphereGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#0d1b3e" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#030711" stopOpacity="1" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export { NeuralArenaLogo };
