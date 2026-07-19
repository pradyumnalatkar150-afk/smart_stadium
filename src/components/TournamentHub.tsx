import { Trophy, Calendar } from 'lucide-react';

const fixtures = [
  { stage: 'QF', teamA: 'Cobalt FC', teamB: 'Lime Utd', date: 'Jul 19' },
  { stage: 'QF', teamA: 'Neural RX', teamB: 'Pulse City', date: 'Jul 21' },
  { stage: 'SF', teamA: 'Winner QF1', teamB: 'Winner QF2', date: 'Jul 24' },
  { stage: 'F', teamA: 'TBD', teamB: 'TBD', date: 'Jul 27' },
];

const standings = [
  { team: 'Cobalt FC', p: 3, w: 3, l: 0, gd: '+7', pts: 9 },
  { team: 'Lime Utd', p: 3, w: 2, l: 1, gd: '+2', pts: 6 },
  { team: 'Pulse City', p: 3, w: 1, l: 2, gd: '-1', pts: 3 },
  { team: 'Neural RX', p: 3, w: 0, l: 3, gd: '-8', pts: 0 },
];

export default function TournamentHub() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Trophy size={28} className="text-[#ccff00]" />
          <h1 className="text-4xl font-bold text-white">Tournament Hub</h1>
        </div>
        <p className="text-gray-400 text-sm ml-11">Fixtures, brackets and live standings.</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Fixtures */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={14} className="text-[#ccff00]" />
            <span className="text-[11px] mono font-bold text-[#ccff00] tracking-widest">FIXTURES</span>
          </div>
          <div className="space-y-2">
            {fixtures.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
              >
                <span className="text-[10px] mono text-gray-500 font-semibold w-6">{f.stage}</span>
                <div className="flex-1 text-right">
                  <span className={`text-sm font-medium ${f.teamA === 'TBD' ? 'text-gray-600' : 'text-white'}`}>
                    {f.teamA}
                  </span>
                </div>
                <span className="text-gray-600 text-xs mx-3">vs</span>
                <div className="flex-1">
                  <span className={`text-sm font-medium ${f.teamB === 'TBD' ? 'text-gray-600' : 'text-white'}`}>
                    {f.teamB}
                  </span>
                </div>
                <span className="text-[#ccff00] text-xs mono font-semibold ml-3">{f.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Standings */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
          <div className="mb-5">
            <span className="text-[11px] mono font-bold text-[#ccff00] tracking-widest">GROUP A · STANDINGS</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-[#1a1a1a]">
                <th className="text-left font-normal pb-3">Team</th>
                <th className="text-center font-normal pb-3">P</th>
                <th className="text-center font-normal pb-3">W</th>
                <th className="text-center font-normal pb-3">L</th>
                <th className="text-center font-normal pb-3">GD</th>
                <th className="text-right font-bold pb-3 text-[#ccff00]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={i} className="border-b border-[#0d0d0d] hover:bg-[#0d0d0d] transition-colors">
                  <td className="py-3 text-sm font-semibold text-white">{row.team}</td>
                  <td className="py-3 text-center text-sm text-gray-400">{row.p}</td>
                  <td className="py-3 text-center text-sm text-gray-400">{row.w}</td>
                  <td className="py-3 text-center text-sm text-gray-400">{row.l}</td>
                  <td className={`py-3 text-center text-sm mono font-semibold ${row.gd.startsWith('+') ? 'text-[#ccff00]' : 'text-red-500'}`}>
                    {row.gd}
                  </td>
                  <td className="py-3 text-right text-sm font-bold text-white">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
