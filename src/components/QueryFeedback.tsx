import { useState } from 'react';
import { Star, Send } from 'lucide-react';

const categories = ['Navigation', 'Food', 'Facilities', 'Security', 'Overall experience'];

const sentimentColors: Record<string, string> = {
  positive: '#22c55e',
  neutral: '#f59e0b',
  negative: '#ef4444',
  default: '#6b7280',
};

function getSentiment(text: string): string {
  const lower = text.toLowerCase();
  const positiveWords = ['great', 'amazing', 'love', 'excellent', 'good', 'fantastic', 'best', 'perfect', 'awesome', 'nice'];
  const negativeWords = ['bad', 'terrible', 'awful', 'poor', 'worst', 'horrible', 'hate', 'broken', 'slow', 'crowded'];
  const pos = positiveWords.some(w => lower.includes(w));
  const neg = negativeWords.some(w => lower.includes(w));
  if (pos && !neg) return 'positive';
  if (neg && !pos) return 'negative';
  if (text.length > 10) return 'neutral';
  return 'default';
}

export default function QueryFeedback() {
  const [rating, setRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Facilities');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sentiment = getSentiment(message);
  const sentimentColor = sentimentColors[sentiment];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setRating(3);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[#ccff00] mono text-sm font-bold">07</span>
          <h1 className="text-4xl font-bold text-white">Query & Feedback</h1>
        </div>
        <p className="text-gray-400 text-sm ml-10">Share your experience — AI runs live sentiment analysis as you write.</p>
      </div>

      {submitted ? (
        <div className="max-w-3xl bg-[#111] border border-[#22c55e44] rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#22c55e22] flex items-center justify-center">
            <Send size={28} className="text-[#22c55e]" />
          </div>
          <h3 className="text-2xl font-bold text-white">Feedback sent!</h3>
          <p className="text-gray-400 text-sm text-center">Thank you for your response. Our team will review it shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="relative bg-[#111] border border-[#1e1e1e] rounded-2xl p-8 overflow-hidden">
            {/* Gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#3b82f6] via-[#ccff00] to-[#3b82f6]" />

            {/* Sentiment indicator */}
            {message.length > 3 && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: sentimentColor }} />
                <span className="text-[10px] mono" style={{ color: sentimentColor }}>
                  {sentiment === 'default' ? 'ANALYZING' : sentiment.toUpperCase()}
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm text-gray-300 mb-3">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={30}
                        className="transition-colors"
                        fill={(hoverRating || rating) >= star ? '#ccff00' : 'transparent'}
                        stroke={(hoverRating || rating) >= star ? '#ccff00' : '#4b5563'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-300 mb-3">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        category === cat
                          ? 'bg-[#3b82f6] text-white border border-[#3b82f6]'
                          : 'bg-transparent text-gray-400 border border-[#2a2a2a] hover:border-[#444] hover:text-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-300 mb-3">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your experience..."
                  rows={5}
                  className="w-full bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#2a2a2a] resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="flex items-center gap-2 bg-[#ccff00] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#d4ff1a] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send size={15} />
                Send
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
