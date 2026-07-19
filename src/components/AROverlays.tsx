import { useState, useEffect } from 'react';
import { Eye, Coffee, Tag, LogOut, ArrowRight } from 'lucide-react';

const layers = [
  { id: 'seats', label: 'Seat Numbers', icon: Eye },
  { id: 'restrooms', label: 'Restroom Directions', icon: Coffee },
  { id: 'promos', label: 'Vendor Promos', icon: Tag },
  { id: 'exits', label: 'Exit Routes', icon: LogOut },
];

const overlayMessages: Record<string, { title: string; subtitle: string }> = {
  seats: { title: 'SEAT NUMBERS · ACTIVE', subtitle: 'Row C · Seats 12–18 identified ahead.' },
  restrooms: { title: 'RESTROOMS · ACTIVE', subtitle: 'Nearest restroom: 40m — turn right at Gate C.' },
  promos: { title: 'VENDOR PROMOS · ACTIVE', subtitle: 'Hot deal: Nachos + Soda for $12 at Stand 7.' },
  exits: { title: 'EXIT ROUTES · ACTIVE', subtitle: 'Closest exit: Gate D — 120m, estimated 2 min.' },
};

export default function AROverlays() {
  const [activeLayer, setActiveLayer] = useState('seats');
  const [recTime, setRecTime] = useState(874);

  useEffect(() => {
    const iv = setInterval(() => setRecTime(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const overlay = overlayMessages[activeLayer];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[#ccff00] mono text-sm font-bold">06</span>
          <h1 className="text-4xl font-bold text-white">AR Overlays</h1>
        </div>
        <p className="text-gray-400 text-sm ml-10">Toggle layers to project digital info onto the live camera feed of the arena.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Camera Feed */}
        <div className="col-span-2 bg-[#0a1628] border border-[#1e3a5f] rounded-xl relative overflow-hidden" style={{ minHeight: 420 }}>
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] pulse-dot" />
            <span className="text-[#3b82f6] text-xs mono font-semibold tracking-wider">AR ACTIVE</span>
          </div>

          <div className="absolute top-4 left-4 bg-[#0d0d0d88] backdrop-blur border border-[#1e3a5f] rounded-lg p-3 max-w-[220px]">
            <div className="text-[#3b82f6] text-[9px] mono font-bold tracking-widest mb-1">{overlay.title}</div>
            <div className="text-gray-300 text-xs">{overlay.subtitle}</div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
            <div className="text-[10px] mono text-gray-600 tracking-widest">SIMULATED CAMERA FEED</div>
            <div className="text-6xl font-black text-gray-700 tracking-widest select-none">ARENA</div>
          </div>

          <div className="absolute bottom-4 right-4">
            <button className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center hover:bg-[#2563eb] transition-colors">
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="text-gray-600 text-[10px] mono blink-rec">REC {formatTime(recTime)}</span>
          </div>

          {/* Grid overlay effect */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Layers Panel */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
          <div className="text-[11px] mono font-semibold text-[#ccff00] tracking-widest mb-4">AR LAYERS</div>
          <div className="space-y-1">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-[#0d1a2e]' : 'hover:bg-[#161616]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-[#3b82f6]' : 'text-gray-500'} />
                    <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{layer.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
