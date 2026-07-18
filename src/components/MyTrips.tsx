import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';

export function MyTrips() {
  const [phone, setPhone] = useState('');
  const [loginMethod, setLoginMethod] = useState<'google' | 'phone'>('google');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [savedTrips, setSavedTrips] = useState<any[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const trips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
      setSavedTrips(trips);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'google') {
      setIsLoggedIn(true);
    } else {
      if (!otpSent) {
        setOtpSent(true);
      } else {
        setIsLoggedIn(true);
      }
    }
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-start pt-10">
        <div className="mb-10">
          <h2 className="text-5xl font-light tracking-tighter leading-none mb-4">My Trips</h2>
          <p className="text-white/60 font-medium tracking-wide italic text-lg">Welcome back. Here are your saved trips.</p>
        </div>
        
        {savedTrips.length === 0 ? (
          <GlassCard className="!p-8">
            <div className="text-center py-10">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                 ✈️
               </div>
               <h3 className="text-xl font-bold mb-2">No Saved Trips Yet</h3>
               <p className="text-white/50">Your confirmed trip itineraries will appear here.</p>
            </div>
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-6">
            {savedTrips.map((trip: any) => (
              <GlassCard key={trip.id} className="!p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{trip.selectedDestination?.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{trip.preferences?.dates} • {trip.preferences?.travelers} Travelers</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">Hotel</span>
                      <span className="font-bold">{trip.hotel?.name || 'None'}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Itinerary Highlights</span>
                    {Array.isArray(trip.tripDetails?.itinerary) && trip.tripDetails.itinerary.slice(0, 2).map((day: any) => (
                      <div key={day.day} className="flex gap-4">
                        <span className="text-orange-500 font-bold w-12 shrink-0">Day {day.day}</span>
                        <span className="text-white/80 text-sm truncate">{day.title}</span>
                      </div>
                    ))}
                    {Array.isArray(trip.tripDetails?.itinerary) && trip.tripDetails.itinerary.length > 2 && (
                      <div className="text-white/40 text-sm mt-1">
                        + {trip.tripDetails.itinerary.length - 2} more days...
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-light tracking-tighter leading-none mb-4">Sign In</h2>
        <p className="text-white/60 font-medium tracking-wide italic text-lg">Sign in to access your saved itineraries.</p>
      </div>

      <GlassCard className="!p-8">
        <div className="flex flex-col gap-8">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { setLoginMethod('google'); setOtpSent(false); }}
              className={`flex-1 py-2 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors ${
                loginMethod === 'google' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 text-sm font-bold uppercase tracking-widest rounded-lg transition-colors ${
                loginMethod === 'phone' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {loginMethod === 'google' ? (
              <button 
                type="button"
                onClick={handleLogin}
                className="w-full py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    disabled={otpSent}
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20 disabled:opacity-50"
                  />
                </div>
                {otpSent && (
                  <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Enter OTP</label>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      required
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors placeholder:text-white/20"
                    />
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black font-black text-sm uppercase rounded-xl shadow-xl hover:bg-opacity-90 transition-colors"
                >
                  {otpSent ? 'Verify & Login' : 'Send OTP'}
                </button>
              </div>
            )}
          </form>
        </div>
      </GlassCard>
    </div>
  );
}
