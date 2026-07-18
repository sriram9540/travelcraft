import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

const conversionRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AUD: 0.018,
  CAD: 0.016,
};

const currencySymbols: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
};

export function BudgetEstimatorStep() {
  const navigate = useNavigate();
  const { tripDetails, preferences, selectedDestination } = useTrip();
  const [currency, setCurrency] = useState('INR');
  const budget = tripDetails?.budgetEstimate;

  const formatPrice = (priceStr: string | undefined) => {
    if (!priceStr) return '';
    const numMatch = priceStr.replace(/,/g, '').match(/[\d.]+/);
    if (!numMatch) return priceStr;
    const num = parseFloat(numMatch[0]);
    const converted = num * conversionRates[currency];
    const symbol = currencySymbols[currency];
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: currency === 'INR' ? 0 : 2, maximumFractionDigits: currency === 'INR' ? 0 : 2 })}`;
  };

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 justify-center">
      <div className="mb-10 text-center flex flex-col items-center">
        <h2 className="text-5xl font-light tracking-tighter leading-none mb-4">Budget Estimator</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg mb-6">Estimated costs for your trip to {selectedDestination?.title || 'the destination'}.</p>
        
        {budget && (
          <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-white/20 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-white/50 px-2">Currency</span>
            <div className="flex gap-1">
              {Object.keys(conversionRates).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${
                    currency === c ? 'bg-orange-500 text-white' : 'hover:bg-white/10 text-white/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!budget ? (
        <p className="text-white/50 text-center py-10">No budget generated yet. Please go back and generate a plan.</p>
      ) : (
      <GlassCard className="!p-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-white/10 pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">Total Estimated Cost</span>
              <span className="text-5xl font-black tracking-tighter">{formatPrice(budget.total)}</span>
            </div>
            <div className="text-right flex flex-col gap-1 text-white/50 text-sm">
              <span>Per Person: {formatPrice(budget.perPerson)}</span>
              <span>{preferences.travelers} Travelers</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🏨</span>
                <div className="flex flex-col">
                  <span className="font-bold">Accommodation</span>
                </div>
              </div>
              <span className="font-bold font-mono">{formatPrice(budget.accommodation)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">✈️</span>
                <div className="flex flex-col">
                  <span className="font-bold">Transportation</span>
                </div>
              </div>
              <span className="font-bold font-mono">{formatPrice(budget.transportation)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🍽️</span>
                <div className="flex flex-col">
                  <span className="font-bold">Food & Dining</span>
                </div>
              </div>
              <span className="font-bold font-mono">{formatPrice(budget.food)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎫</span>
                <div className="flex flex-col">
                  <span className="font-bold">Activities & Misc</span>
                </div>
              </div>
              <span className="font-bold font-mono">{formatPrice(budget.activities)}</span>
            </div>
          </div>
        </div>
      </GlassCard>
      )}

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/itinerary')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase rounded-2xl transition-colors hover:bg-white/20">
          Back
        </button>
        <button onClick={() => navigate('/packing')} className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl transition-colors hover:bg-opacity-90">
          Continue to Packing
        </button>
      </div>
    </div>
  );
}
