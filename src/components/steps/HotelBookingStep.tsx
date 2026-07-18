import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { useTrip } from '../../contexts/TripContext';

export function HotelBookingStep() {
  const navigate = useNavigate();
  const { tripDetails, selectedDestination, preferences } = useTrip();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const hotels = tripDetails?.hotels || [];

  const handleExportText = () => {
    if (!tripDetails || !selectedDestination || !selectedHotel) return;
    
    const hotel = hotels.find(h => h.id === selectedHotel);
    let txt = `TRIP PLAN: ${selectedDestination.title}\n`;
    txt += `=========================================\n\n`;
    txt += `Travelers: ${preferences.travelers}\n`;
    txt += `Dates: ${preferences.dates}\n`;
    txt += `Style: ${preferences.tripStyle}\n\n`;
    txt += `HOTEL BOOKING:\n`;
    txt += `-----------------------------------------\n`;
    txt += `Name: ${hotel?.name}\n`;
    txt += `Location: ${hotel?.location}\n`;
    txt += `Price: ${hotel?.price}\n`;
    txt += `Rating: ${hotel?.rating}\n\n`;
    txt += `ITINERARY:\n`;
    txt += `-----------------------------------------\n`;
    tripDetails.itinerary.forEach(day => {
      txt += `Day ${day.day}: ${day.title}\n`;
      day.activities.forEach(act => {
        txt += `  [${act.time}] ${act.desc}\n`;
      });
      txt += `\n`;
    });
    
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TripCraft_${selectedDestination.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mb-4 border border-green-500/50">
          ✓
        </div>
        <h2 className="text-5xl font-light tracking-tighter leading-none">Trip Planned!</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg max-w-md">
          Your itinerary and hotel preferences have been saved.
        </p>
        <div className="flex gap-4 mt-8">
          <button onClick={handleExportText} className="px-8 py-4 bg-orange-500 text-white font-black text-sm uppercase rounded-2xl shadow-xl transition-colors hover:bg-orange-600">
            Download Itinerary (.txt)
          </button>
          <button onClick={() => navigate('/my-trips')} className="px-8 py-4 bg-white text-black font-black text-sm uppercase rounded-2xl shadow-xl transition-colors hover:bg-opacity-90">
            View My Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col flex-1">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-5xl font-light tracking-tighter leading-none flex items-center gap-4">
          Hotel Booking
        </h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Select a stay for your trip.</p>
      </div>

      {hotels.length === 0 ? (
         <p className="text-white/50 text-center py-10">No hotels generated yet. Please go back and generate a plan.</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <GlassCard 
            key={hotel.id} 
            className={`cursor-pointer transition-all duration-300 !p-6 border-2 ${selectedHotel === hotel.id ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)] scale-105 z-10' : 'border-transparent hover:bg-white/20'}`}
            onClick={() => setSelectedHotel(hotel.id)}
          >
            <div className="flex flex-col gap-4 h-full">
              <div 
                className="h-48 rounded-3xl w-full bg-cover bg-center border border-white/10"
                style={{ backgroundImage: `url(https://source.unsplash.com/800x600/?${encodeURIComponent(hotel.imageQuery || hotel.name)})` }}
              ></div>
              
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold tracking-tight">{hotel.name}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold bg-white/10 px-2 py-1 rounded-lg">
                    ⭐ {hotel.rating}
                  </span>
                </div>
                <p className="text-white/60 italic font-serif mt-0">{hotel.location}</p>
                
                <div className="flex gap-2 flex-wrap mt-4">
                  {hotel.amenities?.map(amenity => (
                    <span key={amenity} className="text-[10px] uppercase font-bold text-white/50 tracking-widest bg-white/5 px-2 py-1 rounded-md">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-white/50 tracking-widest mb-1">Price</span>
                  <span className="text-xl font-bold">{hotel.price}</span>
                </div>
                {selectedHotel === hotel.id && (
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      )}
      
      <div className="mt-12 flex justify-between">
        <button onClick={() => navigate('/packing')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase rounded-2xl transition-colors hover:bg-white/20">
          Back
        </button>
        <button 
          onClick={() => setIsConfirmed(true)} 
          disabled={!selectedHotel}
          className={`px-8 py-4 font-black text-sm uppercase rounded-2xl shadow-xl transition-all ${selectedHotel ? 'bg-white text-black hover:bg-opacity-90' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
        >
          Confirm Plan
        </button>
      </div>
    </div>
  );
}
