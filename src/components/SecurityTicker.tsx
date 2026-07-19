import { Shield } from 'lucide-react';

const alerts = [
  'Section 219 density rising — steward dispatched',
  'Medical assistance requested · Concourse L1',
  'Gate D traffic normalized',
  'Perimeter security: all clear',
  'AI image analysis: 94% confidence · Gate C',
  'Steward deployed · Section 219',
  'VIP access granted · Suite Level',
  'Crowd flow optimized · North entrance',
];

export default function SecurityTicker() {
  const doubled = [...alerts, ...alerts];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-[#0d0d0d] border-b border-[#1e1e1e] flex items-center overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-2 px-3 h-full bg-red-600 mr-3">
        <Shield size={13} className="text-white" />
        <span className="text-white text-[11px] font-bold tracking-widest mono">SECURITY</span>
      </div>

      <div className="overflow-hidden flex-1 h-full flex items-center">
        <div className="ticker-track">
          {doubled.map((alert, i) => (
            <span key={i} className="flex items-center gap-3 pr-8 text-[11px] text-gray-300 mono whitespace-nowrap">
              {i % alerts.length !== 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] pulse-dot inline-block" />
              )}
              {alert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
