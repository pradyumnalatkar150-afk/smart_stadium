import { useState } from 'react';
import { Sparkles, Plus, ShoppingCart } from 'lucide-react';

const menuItems = [
  { id: 1, name: 'Craft Cold Soda', category: 'Drink', price: 6, tag: 'Cold', tagColor: '#3b82f6', gradient: 'from-[#0a1628] to-[#0d2240]' },
  { id: 2, name: 'Artisan Burger', category: 'Food', price: 14, tag: 'Hot', tagColor: '#f97316', gradient: 'from-[#1a0a00] to-[#2d1400]' },
  { id: 3, name: 'Vegan Buddha Bowl', category: 'Food', price: 12, tag: 'Vegan', tagColor: '#22c55e', gradient: 'from-[#001a0a] to-[#002d14]' },
  { id: 4, name: 'Stadium Nachos', category: 'Food', price: 9, tag: 'Hot', tagColor: '#f97316', gradient: 'from-[#1a0a00] to-[#2d1400]' },
  { id: 5, name: 'Fresh Lemonade', category: 'Drink', price: 5, tag: 'Cold', tagColor: '#3b82f6', gradient: 'from-[#0a1628] to-[#0d2240]' },
  { id: 6, name: 'Gluten-Free Wrap', category: 'Food', price: 10, tag: 'GF', tagColor: '#a78bfa', gradient: 'from-[#0f0a1a] to-[#1a1030]' },
];

export default function FoodGastronomy() {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[#ccff00] mono text-sm font-bold">05</span>
            <h1 className="text-4xl font-bold text-white">Food & Gastronomy</h1>
          </div>
          <p className="text-gray-400 text-sm ml-10">Personalized recommendations · seat delivery · live order tracking.</p>
        </div>
        {totalItems > 0 && (
          <button className="flex items-center gap-2 bg-[#ccff00] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#d4ff1a] transition-colors">
            <ShoppingCart size={16} />
            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </button>
        )}
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 flex items-center gap-3">
        <Sparkles size={16} className="text-[#ccff00] flex-shrink-0" />
        <p className="text-sm text-gray-300">
          <span className="text-[#ccff00] font-semibold">Personalized:</span>{' '}
          Based on the heat and your seat at Section 112, you might like a cold craft soda and the vegan bowl.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden hover:border-[#2a2a2a] transition-all duration-200 group">
            <div className={`relative h-40 bg-gradient-to-br ${item.gradient} flex items-end`}>
              <span
                className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded mono"
                style={{ color: item.tagColor, backgroundColor: item.tagColor + '22', border: `1px solid ${item.tagColor}44` }}
              >
                {item.tag}
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <div className="font-semibold text-white text-base">{item.name}</div>
                <div className="text-[#ccff00] font-bold mono">${item.price}</div>
              </div>
              <div className="text-gray-500 text-xs mb-3">{item.category}</div>
              <button
                onClick={() => addToCart(item.id)}
                className="w-full flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-[#ccff00] hover:text-[#ccff00] text-gray-400 text-sm py-2 rounded-lg transition-all duration-200 group-hover:border-[#333]"
              >
                <Plus size={14} />
                <span>{cart[item.id] ? `Add (${cart[item.id]})` : 'Add'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
