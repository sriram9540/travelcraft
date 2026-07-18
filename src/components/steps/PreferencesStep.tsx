import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { TripStyle } from '../../types';
import { useTrip } from '../../contexts/TripContext';

export function PreferencesStep() {
  const navigate = useNavigate();
  const { preferences, setPreferences, setDestinations } = useTrip();
  const [origin, setOrigin] = useState(preferences.origin || '');
  const [dates, setDates] = useState(preferences.dates || '');
  const [travelers, setTravelers] = useState(preferences.travelers || 1);
  const [budget, setBudget] = useState(preferences.budget || '₹1,00,000 - ₹2,00,000');
  const [tripStyle, setTripStyle] = useState<TripStyle>(preferences.tripStyle || 'relaxation');
  const [interests, setInterests] = useState(preferences.interests || '');
  const [loading, setLoading] = useState(false);

  const tripStyles: { value: TripStyle, label: string, icon: string }[] = [
    { value: 'adventure', label: 'Adventure', icon: '⛰️' },
    { value: 'relaxation', label: 'Relaxation', icon: '🏖️' },
    { value: 'culture', label: 'Culture & Food', icon: '🏛️' },
    { value: 'nightlife', label: 'Nightlife', icon: '🍸' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prefs = { origin, dates, travelers, budget, tripStyle, interests };
      setPreferences(prefs);
      
      const res = await fetch('/api/generate-destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });
      
      if (res.ok) {
        const data = await res.json();
        setDestinations(Array.isArray(data.destinations) ? data.destinations : []);
        navigate('/destinations');
      } else {
        alert('Failed to generate destinations. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-light tracking-tighter leading-none mb-4">Where to next?</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg md:text-xl">Tell us what you're looking for, and we'll craft the perfect journey.</p>
      </div>

      <GlassCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Origin City</label>
              <input 
                type="text" 
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                placeholder="e.g. Mumbai"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Travel Dates / Length</label>
              <input 
                type="text" 
                value={dates}
                onChange={e => setDates(e.target.value)}
                placeholder="e.g. Next week, for 5 days"
                required
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Travelers</label>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="text-white/50 hover:text-white text-xl px-2">&minus;</button>
                <span className="flex-1 text-center font-bold text-lg">{travelers}</span>
                <button type="button" onClick={() => setTravelers(travelers + 1)} className="text-white/50 hover:text-white text-xl px-2">&#43;</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Estimated Budget</label>
              <select 
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                <option value="₹2,00,000+">₹2,00,000+</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Trip Style</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tripStyles.map(style => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setTripStyle(style.value)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    tripStyle === style.value 
                      ? 'bg-orange-500/20 border-orange-500/50 text-white shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{style.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Must-see interests (optional)</label>
            <textarea 
              value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="e.g. Historic museums, local street food, sunset boat ride"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20 resize-none h-24"
            />
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Finding Destinations...' : 'Generate Destinations'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
