import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

export function BudgetEstimatorStep() {
  const navigate = useNavigate();
  const { tripDetails, preferences, selectedDestination } = useTrip();

  const budget = tripDetails?.budgetEstimate;

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 justify-center">
      <div className="mb-10 text-center">
        <h2 className="text-5xl font-light tracking-tighter leading-none mb-4">Budget Estimator</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Estimated costs for your trip to {selectedDestination?.title || 'the destination'}.</p>
      </div>

      {!budget ? (
        <p className="text-white/50 text-center py-10">No budget generated yet. Please go back and generate a plan.</p>
      ) : (
      <GlassCard className="!p-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-white/10 pb-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">Total Estimated Cost</span>
              <span className="text-5xl font-black tracking-tighter">{budget.total}</span>
            </div>
            <div className="text-right flex flex-col gap-1 text-white/50 text-sm">
              <span>Per Person: {budget.perPerson}</span>
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
              <span className="font-bold font-mono">{budget.accommodation}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">✈️</span>
                <div className="flex flex-col">
                  <span className="font-bold">Transportation</span>
                </div>
              </div>
              <span className="font-bold font-mono">{budget.transportation}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🍽️</span>
                <div className="flex flex-col">
                  <span className="font-bold">Food & Dining</span>
                </div>
              </div>
              <span className="font-bold font-mono">{budget.food}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🎫</span>
                <div className="flex flex-col">
                  <span className="font-bold">Activities & Misc</span>
                </div>
              </div>
              <span className="font-bold font-mono">{budget.activities}</span>
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
