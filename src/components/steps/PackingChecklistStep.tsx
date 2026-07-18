import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

type PackingItem = {
  id: string;
  text: string;
  category: string;
  checked?: boolean;
};

export function PackingChecklistStep() {
  const navigate = useNavigate();
  const { tripDetails, selectedDestination } = useTrip();
  const [items, setItems] = useState<PackingItem[]>([]);

  useEffect(() => {
    if (Array.isArray(tripDetails?.packingList)) {
      setItems(tripDetails.packingList.map(item => ({ ...item, checked: false })));
    }
  }, [tripDetails]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 justify-center">
      <div className="mb-10 text-center flex flex-col gap-2">
        <h2 className="text-5xl font-light tracking-tighter leading-none flex items-center justify-center gap-4">
          <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" className="h-8 opacity-80" />
          Search
        </h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Smart packing suggestions for {selectedDestination?.title || 'the destination'} based on current weather.</p>
      </div>

      {items.length === 0 ? (
        <p className="text-white/50 text-center py-10">No packing list generated yet. Please go back and generate a plan.</p>
      ) : (
      <GlassCard className="!p-8">
        <div className="flex flex-col gap-8">
          {categories.map(category => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">{category}</h3>
              <div className="flex flex-col gap-2">
                {items.filter(i => i.category === category).map(item => (
                  <label key={item.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/5">
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-orange-500 border-orange-500' : 'border-white/30'}`}>
                      {item.checked && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-lg transition-all ${item.checked ? 'text-white/50 line-through' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      )}

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/budget')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase rounded-2xl transition-colors hover:bg-white/20">
          Back
        </button>
        <button onClick={() => navigate('/booking')} className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl transition-colors hover:bg-opacity-90">
          Continue to Hotel Booking
        </button>
      </div>
    </div>
  );
}
