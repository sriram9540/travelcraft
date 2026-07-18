import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface FlightDetailsModalProps {
  offer: any;
  onClose: () => void;
}

export function FlightDetailsModal({ offer, onClose }: FlightDetailsModalProps) {
  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <GlassCard className="!p-0 overflow-hidden flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" className="h-5 opacity-80" />
              Flight Details
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-8">
            {Array.isArray(offer?.flights) && offer.flights.map((flight: any, flightIdx: number) => (
              <div key={flightIdx} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {flightIdx === 0 ? 'Outbound' : 'Return'}
                  </div>
                  <span className="text-sm font-bold text-white/70">
                    {flight.departure_airport.id} to {flight.arrival_airport.id}
                  </span>
                  <span className="text-sm font-bold text-white/40 ml-auto">
                    {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                  </span>
                </div>

                <div className="flex flex-col gap-0 border-l-2 border-white/10 ml-4 pl-6 relative">
                  <div className="flex flex-col gap-6 relative pb-6">
                    {/* Timeline dots */}
                    <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#0f172a]" />
                    <div className="absolute -left-[29px] bottom-0 w-3 h-3 rounded-full bg-white border-2 border-[#0f172a]" />

                    {/* Departure */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black">
                          {flight.departure_airport.time.split(' ')[1]}
                        </span>
                        <span className="text-white/70">{flight.departure_airport.time.split(' ')[0]}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">{flight.departure_airport.name}</span>
                      </div>
                    </div>

                    {/* Flight Info */}
                    <div className="flex flex-col gap-2 py-4 px-5 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img src={flight.airline_logo} alt={flight.airline} className="h-6 w-6 object-contain bg-white rounded-md p-0.5" />
                          <span className="font-bold">{flight.airline}</span>
                          <span className="text-sm text-white/50">{flight.flight_number}</span>
                        </div>
                        <span className="text-sm text-white/70">
                          {flight.travel_class}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Aircraft</span>
                          <span>{flight.airplane}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Legroom</span>
                          <span>{flight.legroom}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black">
                          {flight.arrival_airport.time.split(' ')[1]}
                        </span>
                        <span className="text-white/70">{flight.arrival_airport.time.split(' ')[0]}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">{flight.arrival_airport.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
            
          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Total Price</span>
              <span className="text-3xl font-bold">₹{Number(offer?.price || 0).toLocaleString('en-IN')}</span>
            </div>
            {offer.booking_link ? (
              <a href={offer.booking_link} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-orange-500 text-white font-black text-sm uppercase rounded-xl shadow-xl hover:bg-orange-600 transition-colors inline-block text-center">
                Book Flight
              </a>
            ) : (
              <button className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-xl shadow-xl hover:bg-opacity-90 transition-colors" onClick={onClose}>
                Save Flight
              </button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
