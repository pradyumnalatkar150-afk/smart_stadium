export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] mt-16 pt-12 pb-8">
      <div className="grid grid-cols-4 gap-8 mb-10">
        <div>
          <h3 className="text-white font-bold text-base mb-2">Neural Arena</h3>
          <p className="text-gray-500 text-sm leading-relaxed">A sentient stadium ecosystem redefining spectatorship.</p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Experience</h4>
          <ul className="space-y-2">
            {['Tickets', 'Food & Drink', 'AR Overlays'].map(item => (
              <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Operations</h4>
          <ul className="space-y-2">
            {['Live Dashboard', 'Navigation', 'Feedback'].map(item => (
              <li key={item}><a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li><span className="text-gray-500 text-sm">info@neuralarena.io</span></li>
            <li><span className="text-gray-500 text-sm">+1 (555) 021-2025</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#1a1a1a] pt-6 text-center">
        <p className="text-gray-600 text-[11px] mono tracking-widest">
          © 2026 NEURAL ARENA · SYNAPTIC SPECTATORSHIP
        </p>
      </div>
    </footer>
  );
}
