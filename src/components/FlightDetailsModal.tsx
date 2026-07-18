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
            {offer.flights.map((flight: any, flightIdx: number) => (
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
            
            {/* Razorpay Payment Info */}
            <div className="mt-4 pt-6 border-t border-white/10 flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Payment Integration</h3>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="p-2 bg-white rounded-lg">
                  <svg viewBox="0 0 71 16" className="h-4 w-auto fill-[#02042b]">
                    <path d="M12.98 1.48c-1.3-.2-3.14-.34-4.82-.34-4.63 0-7.85 2.1-7.85 5.58 0 2.22 1.4 3.73 3.63 4.41l3.52 1.05c1.4.42 2.05.9 2.05 1.7 0 1.02-1.21 1.77-3.21 1.77-1.78 0-3.66-.35-5.12-.86v4.35c1.65.57 3.75.82 5.51.82 5.1 0 8.35-2.22 8.35-5.87 0-2.31-1.35-3.87-3.85-4.63l-3.32-.99c-1.34-.41-1.93-.84-1.93-1.6 0-.84 1.03-1.55 2.82-1.55 1.45 0 3.03.26 4.22.65V1.48zM24.78 6.42l-2.02 5.25h4.06l-2.04-5.25zm.02-5.28c-1.12 0-2.12.63-2.6 1.7L16.27 19.6h4.86l1.23-3.1h4.88l1.19 3.1h4.88l-5.83-16.8c-.46-1.1-1.46-1.66-2.68-1.66zM54.12 1.14c-4.48 0-7.65 3.32-7.65 7.9 0 4.6 3.2 7.9 7.6 7.9 4.3 0 7.55-3.3 7.55-7.9 0-4.57-3.22-7.9-7.5-7.9zm0 11.96c-1.9 0-3.15-1.58-3.15-4.06 0-2.48 1.25-4.04 3.12-4.04 1.88 0 3.1 1.56 3.1 4.04 0 2.5-1.22 4.06-3.07 4.06zM69.06 6.32l-2.58 3.52 2.6 4.3h-4.32l-1.4-2.5-1.58 2.5h-4.3l2.84-4.14-2.48-3.68h4.25l1.12 1.96 1.25-1.96h4.6z"/>
                    <path d="M42.48 1.15c-3.1 0-5.46 1.26-6.47 3.37L36 1.48h-4.32v18.13h4.4v-6.95l.02-.02c.98 2.05 3.2 3.34 6.2 3.34 4.5 0 7.7-3.32 7.7-7.92s-3.25-7.9-7.52-7.9zm-1.02 11.95c-1.93 0-3.18-1.58-3.18-4.06 0-2.48 1.25-4.04 3.12-4.04 1.88 0 3.1 1.56 3.1 4.04 0 2.5-1.22 4.06-3.04 4.06z"/>
                  </svg>
                </div>
                <div className="flex flex-col text-sm">
                  <span>Powered by Razorpay</span>
                  <span className="text-xs text-white/50">Test Mode (rzp_test_...)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Total Price</span>
              <span className="text-3xl font-bold">₹{offer.price.toLocaleString('en-IN')}</span>
            </div>
            <button className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-xl shadow-xl hover:bg-opacity-90 transition-colors">
              Pay with Razorpay
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
