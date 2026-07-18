import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { FlightDetailsModal } from './FlightDetailsModal';

export function ExploreFlights() {
  const [origin, setOrigin] = useState('LHR');
  const [destination, setDestination] = useState('JFK');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          adults
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch flights');
      }
      setFlights(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col flex-1 gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-light tracking-tighter leading-none flex items-center gap-4">
          <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" className="h-8 opacity-80" />
          Flights
        </h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Search for real-time flights across Air India, IndiGo, Emirates and more.</p>
      </div>

      <GlassCard className="!p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Origin</label>
            <input 
              type="text" 
              value={origin} 
              onChange={e => setOrigin(e.target.value.toUpperCase())}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
              placeholder="e.g. BOM"
              maxLength={3}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Destination</label>
            <input 
              type="text" 
              value={destination} 
              onChange={e => setDestination(e.target.value.toUpperCase())}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
              placeholder="e.g. DEL"
              maxLength={3}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Date</label>
            <input 
              type="date" 
              value={departureDate} 
              onChange={e => setDepartureDate(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Passengers</label>
            <input 
              type="number" 
              min="1"
              max="9"
              value={adults} 
              onChange={e => setAdults(Number(e.target.value))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>
          <div className="flex flex-col justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 h-[46px] bg-white text-black font-black text-sm uppercase rounded-xl shadow-xl hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </GlassCard>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {flights && flights.best_flights && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold tracking-tight">Best Flights ({flights.best_flights.length})</h3>
          {flights.best_flights.length === 0 ? (
            <div className="text-white/50 italic">No flights found. Try different dates or routes.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {flights.best_flights.map((offer: any) => (
                <GlassCard key={offer.id} className="!p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col flex-1 w-full gap-4">
                    {offer.flights.map((flight: any, idx: number) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-sm font-bold text-white/70">
                          <img src={flight.airline_logo} alt={flight.airline} className="h-6 w-6 object-contain bg-white rounded-md p-0.5" />
                          <span>{flight.airline}</span>
                          <span className="text-white/40 ml-auto">{flight.duration} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black">{flight.departure_airport?.time?.includes(' ') ? flight.departure_airport.time.split(' ')[1] : flight.departure_airport?.time || 'N/A'}</span>
                            <span className="text-xs text-white/50">{flight.departure_airport?.id || origin}</span>
                          </div>
                          <div className="flex-1 px-8 flex flex-col items-center">
                            <div className="w-full border-t border-white/20 border-dashed relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] px-2 text-[10px] text-white/40 uppercase font-bold rounded-full whitespace-nowrap">
                                {offer.type || 'Direct'}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-2xl font-black">{flight.arrival_airport?.time?.includes(' ') ? flight.arrival_airport.time.split(' ')[1] : flight.arrival_airport?.time || 'N/A'}</span>
                            <span className="text-xs text-white/50">{flight.arrival_airport?.id || destination}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Total Price</span>
                    <span className="text-3xl font-bold">₹{offer.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => setSelectedOffer(offer)}
                      className="mt-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase rounded-xl transition-colors hover:bg-white/20 w-full whitespace-nowrap"
                    >
                      View Details & Pay
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      )}

      <FlightDetailsModal 
        offer={selectedOffer} 
        onClose={() => setSelectedOffer(null)} 
      />
    </div>
  );
}
