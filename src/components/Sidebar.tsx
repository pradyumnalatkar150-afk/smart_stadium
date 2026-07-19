import { Activity, Utensils, Glasses, MessageSquare, Trophy, Home } from 'lucide-react';
import { NeuralArenaLogo } from './LandingPage';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, num: '' },
  { id: 'dashboard', label: 'Live Dashboard', icon: Activity, num: '04' },
  { id: 'food', label: 'Food & Drink', icon: Utensils, num: '05' },
  { id: 'ar', label: 'AR Overlays', icon: Glasses, num: '06' },
  { id: 'feedback', label: 'Query & Feedback', icon: MessageSquare, num: '07' },
  { id: 'tournament', label: 'Tournament Hub', icon: Trophy, num: '' },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-9 bottom-0 w-16 bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col items-center py-4 gap-1 z-40">
      <button
        onClick={() => onNavigate('home')}
        className="mb-3 hover:opacity-80 transition-opacity"
        title="Neural Arena"
      >
        <NeuralArenaLogo size={36} />
      </button>

      <div className="w-8 h-px bg-[#1e1e1e] mb-2" />

      <div className="flex-1 flex flex-col gap-1 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`relative w-full flex flex-col items-center justify-center py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#1a1a1a] text-[#ccff00]'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-[#161616]'
              }`}
            >
              {item.num && (
                <span className={`text-[9px] mono font-bold mb-0.5 ${isActive ? 'text-[#ccff00]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {item.num}
                </span>
              )}
              <Icon size={18} />
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#ccff00] rounded-r" />
              )}
              <div className="absolute left-full ml-3 px-2 py-1 bg-[#1e1e1e] border border-[#2a2a2a] rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
