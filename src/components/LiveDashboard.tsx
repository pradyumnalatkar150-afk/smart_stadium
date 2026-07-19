import { useState, useEffect } from 'react';
import { Activity, Users, Shield, Camera, Radio } from 'lucide-react';

const liveFeedEvents = [
  { text: 'GOAL · Cobalt FC · 32\'', color: '#ccff00' },
  { text: 'Substitution · Lime Utd', color: '#3b82f6' },
  { text: 'VAR check complete', color: '#9ca3af' },
  { text: 'Steward dispatched · S219', color: '#9ca3af' },
  { text: 'Gate D flow normalized', color: '#9ca3af' },
  { text: 'GOAL · Cobalt FC · 45\'', color: '#ccff00' },
  { text: 'Yellow card · Neural RX', color: '#f59e0b' },
  { text: 'Medical team · Concourse L1', color: '#ef4444' },
];

const sectionColors: Record<string, string> = {
  green: '#ccff00',
  blue: '#3b82f6',
  red: '#ef4444',
  orange: '#f97316',
};

const crowdGrid = [
  ['blue','blue','green','green','blue','blue','green','green'],
  ['green','green','blue','red','blue','blue','red','green'],
  ['blue','red','green','blue','green','blue','blue','green'],
  ['green','blue','blue','green','red','green','green','blue'],
  ['blue','green','red','blue','green','blue','green','blue'],
];

export default function LiveDashboard() {
  const [score, setScore] = useState({ a: 16, b: 1 });
  const [possession, setPossession] = useState(63);
  const [shot, setShot] = useState(58);
  const [occupancy, setOccupancy] = useState(61);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setPossession(prev => Math.max(40, Math.min(75, prev + (Math.random() - 0.5) * 2)));
      setShot(prev => Math.max(35, Math.min(80, prev + (Math.random() - 0.5) * 2)));
      setOccupancy(prev => Math.max(55, Math.min(70, prev + (Math.random() - 0.5) * 0.5)));
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setFeedIndex(prev => (prev + 1) % liveFeedEvents.length);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const visibleFeed = [...liveFeedEvents.slice(feedIndex), ...liveFeedEvents.slice(0, feedIndex)].slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[#ccff00] mono text-sm font-bold">04</span>
            <h1 className="text-4xl font-bold text-white">Live Flux Dashboard</h1>
          </div>
          <p className="text-gray-400 text-sm ml-10">Real-time situational awareness — hover a module to highlight the corresponding zone on the 3D model.</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-green-400 live-glow" />
          <span className="text-green-400 text-sm font-semibold mono tracking-widest">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Score Dashboard */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-[#3b82f6]" />
            <span className="text-[11px] mono font-semibold text-[#3b82f6] tracking-widest">SCORE DASHBOARD</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-300 tracking-wider">COBALT FC</span>
            <span className="text-xs font-bold text-gray-300 tracking-wider">LIME UTD</span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-1">
            <span className="text-5xl font-black text-white">{score.a}</span>
            <span className="text-2xl text-gray-500 font-light">:</span>
            <span className="text-5xl font-black text-white">{score.b}</span>
          </div>
          <div className="text-center mb-4">
            <span className="text-[#ccff00] text-xs mono">90'</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Possession</span>
                <span>{Math.round(possession)}%</span>
              </div>
              <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full bg-[#3b82f6] rounded-full transition-all duration-1000" style={{ width: `${possession}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Shot Accuracy</span>
                <span>{Math.round(shot)}%</span>
              </div>
              <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full bg-[#ccff00] rounded-full transition-all duration-1000" style={{ width: `${shot}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Crowd Management */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-[#ccff00]" />
            <span className="text-[11px] mono font-semibold text-[#ccff00] tracking-widest">CROWD MANAGEMENT</span>
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl font-black text-white">{Math.round(occupancy)}%</div>
              <div className="text-xs text-gray-400 mt-1">Total occupancy</div>
            </div>
            <div className="text-right">
              <div className="text-[#ccff00] text-xl font-bold">62,418</div>
              <div className="text-xs text-gray-400">fans inside</div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1">
            {crowdGrid.map((row, ri) =>
              row.map((color, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="w-full aspect-square rounded"
                  style={{ backgroundColor: sectionColors[color] + '99' }}
                />
              ))
            )}
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={14} className="text-red-500" />
            <span className="text-[11px] mono font-semibold text-red-500 tracking-widest">SECURITY</span>
          </div>
          <div className="space-y-3">
            <div className="border-l-2 border-[#ccff00] pl-3">
              <div className="text-sm font-semibold text-white">Section 219 — density rising</div>
            </div>
            <div className="pl-4">
              <div className="text-sm text-gray-400">All gates operational</div>
            </div>
            <div className="border-l-2 border-red-500 pl-3">
              <div className="text-sm font-semibold text-red-400">Medical — Concourse L1</div>
            </div>
            <div className="pl-4">
              <div className="text-sm text-gray-400">Perimeter secure</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Resources */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-[#3b82f6]" />
            <span className="text-[11px] mono font-semibold text-[#3b82f6] tracking-widest">RESOURCES</span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Security', current: 48, max: 52, color: '#ef4444' },
              { label: 'Medics', current: 12, max: 14, color: '#ef4444' },
              { label: 'Stewards', current: 86, max: 80, color: '#ccff00' },
              { label: 'Cleaners', current: 30, max: 30, color: '#ccff00' },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{r.label}</span>
                  <span style={{ color: r.color }} className="font-semibold mono">{r.current}/{r.max}</span>
                </div>
                <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((r.current / r.max) * 100, 100)}%`, backgroundColor: r.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] pulse-dot" />
            <span className="text-xs text-gray-400 mono">AI suggests: deploy +4 security to Section 219</span>
          </div>
        </div>

        {/* Image Analysis */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Camera size={14} className="text-[#ccff00]" />
            <span className="text-[11px] mono font-semibold text-[#ccff00] tracking-widest">IMAGE ANALYSIS</span>
          </div>
          <div className="space-y-3">
            {[
              { location: 'Gate C approach', density: 'High density', confidence: 94, color: '#ef4444' },
              { location: 'Concourse L2', density: 'Medium density', confidence: 88, color: '#f59e0b' },
              { location: 'Section 112', density: 'Low density', confidence: 97, color: '#22c55e' },
            ].map((item) => (
              <div key={item.location} className="bg-[#0d0d0d] rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{item.location}</div>
                  <div className="text-xs mt-0.5" style={{ color: item.color }}>{item.density}</div>
                </div>
                <div className="text-gray-400 text-sm mono font-semibold">{item.confidence}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] transition-colors overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Radio size={14} className="text-[#ccff00]" />
            <span className="text-[11px] mono font-semibold text-[#ccff00] tracking-widest">LIVE FEED</span>
          </div>
          <div className="space-y-2">
            {visibleFeed.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs mono transition-all duration-500"
                style={{ opacity: i === 0 ? 1 : 1 - i * 0.15 }}
              >
                <span className="text-gray-600 mt-0.5">{'>'}</span>
                <span style={{ color: event.color }}>{event.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
