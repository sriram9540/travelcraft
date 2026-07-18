import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

export function DestinationsStep() {
  const navigate = useNavigate();
  const { preferences, destinations, selectedDestination, setSelectedDestination, setTripDetails } = useTrip();
  const [loading, setLoading] = useState(false);

  if (destinations.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handleGeneratePlan = async () => {
    if (!selectedDestination) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate-trip-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...preferences,
          destination: selectedDestination.title
        })
      });
      if (res.ok) {
        const data = await res.json();
        setTripDetails(data);
        navigate('/itinerary');
      } else {
        alert('Failed to generate trip plan. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col flex-1">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-5xl font-light tracking-tighter leading-none flex items-center gap-4">
          <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" className="h-8 opacity-80" />
          Destinations
        </h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Top tourist places gathered from Google Maps for your trip style.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <GlassCard 
            key={dest.id} 
            className={`cursor-pointer transition-all duration-300 !p-6 ${selectedDestination?.id === dest.id ? 'ring-2 ring-orange-500 bg-white/20' : 'hover:bg-white/20'}`} 
            onClick={() => setSelectedDestination(dest)}
          >
            <div className="flex flex-col gap-4 h-full">
              <div 
                className="h-40 rounded-3xl w-full bg-cover bg-center border border-white/10"
                style={{ backgroundImage: `url(https://source.unsplash.com/800x600/?${encodeURIComponent(dest.imageQuery || dest.title)})` }}
              ></div>
              
              <div className="flex flex-col gap-1 flex-1">
                {dest.topChoice ? (
                  <div className="inline-block px-3 py-1 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest self-start mb-2">
                    Top Choice
                  </div>
                ) : (
                  <div className="h-6 mb-2"></div>
                )}
                <h3 className="text-4xl font-bold tracking-tighter">{dest.title}</h3>
                <p className="text-white/80 italic font-serif mt-0">{dest.region}</p>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.mapQuery || dest.title)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-1"
                >
                  View on Google Maps &rarr;
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Est. Budget</p>
                <p className="text-2xl font-bold">{dest.budget}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase rounded-2xl transition-colors hover:bg-white/20">
          Back
        </button>
        <button 
          onClick={handleGeneratePlan}
          disabled={!selectedDestination || loading}
          className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Planning...' : 'Generate Trip Plan'}
        </button>
      </div>
    </div>
  );
}
