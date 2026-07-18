import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

export function ItineraryBuilderStep() {
  const navigate = useNavigate();
  const { tripDetails, selectedDestination } = useTrip();

  const itinerary = Array.isArray(tripDetails?.itinerary) ? tripDetails?.itinerary : [];

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
      <div className="mb-10 flex flex-col gap-2 text-center md:text-left">
        <h2 className="text-5xl font-light tracking-tighter leading-none">Your Itinerary</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">A hand-crafted daily plan for {selectedDestination?.title || 'your trip'}.</p>
      </div>

      <div className="flex flex-col gap-8">
        {itinerary.length === 0 && (
           <p className="text-white/50 text-center py-10">No itinerary generated yet. Please go back and generate a plan.</p>
        )}
        {itinerary.map((dayPlan) => (
          <GlassCard key={dayPlan.day} className="!p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                <span className="text-orange-500 font-black text-6xl tracking-tighter">Day {dayPlan.day}</span>
                <h3 className="text-xl font-bold tracking-tight">{dayPlan.title}</h3>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {Array.isArray(dayPlan?.activities) && dayPlan.activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 w-24 shrink-0 mt-1">{activity.time}</span>
                    <p className="text-white/90 text-sm md:text-base">{activity.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/destinations')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase rounded-2xl transition-colors hover:bg-white/20">
          Back
        </button>
        <button onClick={() => navigate('/budget')} className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl transition-colors hover:bg-opacity-90">
          Continue to Budget
        </button>
      </div>
    </div>
  );
}
