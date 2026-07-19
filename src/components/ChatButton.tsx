import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const botReplies = [
  'How can I help you today?',
  'Let me check that for you.',
  'Your seat is in Section 112, Row C.',
  'Nearest restroom is at Gate C, level 1.',
  'Food delivery ETA: ~8 minutes.',
];

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hello! I\'m your Neural Arena assistant. How can I help?' },
  ]);
  const [replyIdx, setReplyIdx] = useState(0);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: botReplies[replyIdx % botReplies.length] }]);
      setReplyIdx(r => r + 1);
    }, 800);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-[#111] border border-[#1e1e1e] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] pulse-dot" />
              <span className="text-sm font-semibold text-white">Arena Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.from === 'user'
                      ? 'bg-[#ccff00] text-black font-medium'
                      : 'bg-[#1a1a1a] text-gray-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[#1e1e1e] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              className="flex-1 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#333]"
            />
            <button
              onClick={send}
              className="w-9 h-9 bg-[#ccff00] rounded-lg flex items-center justify-center hover:bg-[#d4ff1a] transition-colors flex-shrink-0"
            >
              <Send size={14} className="text-black" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#ccff00] flex items-center justify-center shadow-lg hover:bg-[#d4ff1a] transition-all duration-200 hover:scale-105 z-50"
      >
        {open ? <X size={22} className="text-black" /> : <MessageCircle size={22} className="text-black" />}
      </button>
    </>
  );
}
