import { Outlet, Link } from 'react-router-dom';

export function WizardLayout() {
  // We'll use a placeholder Unsplash image for now.
  // In later phases, this will be dynamically fetched based on the destination.
  const bgUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop';

  return (
    <div className="relative min-h-screen w-full bg-[#0f172a] font-sans text-white overflow-x-hidden flex flex-col">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/90 via-[#334155]/90 to-[#0f172a]/90 backdrop-blur-sm" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 sm:px-12 flex justify-between items-center border-b border-white/10">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
             <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
               <div className="w-1 h-1 bg-white rounded-full"></div>
             </div>
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase">TripCraft</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest opacity-80">
          <Link to="/" className="border-b-2 border-transparent hover:border-white pb-1 transition-colors">Plan</Link>
          <Link to="/explore" className="border-b-2 border-transparent hover:border-white pb-1 transition-colors">Explore</Link>
          <Link to="/my-trips" className="border-b-2 border-transparent hover:border-white pb-1 transition-colors">My Trips</Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 lg:p-12 w-full max-w-7xl mx-auto overflow-hidden">
        <div className="w-full flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-4 sm:py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 sm:px-12 py-4 bg-black/40 backdrop-blur-md border-t border-white/10 flex justify-between items-center">
        <div className="flex space-x-12">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Claude AI Engine: Online</span>
          </div>
        </div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest hidden sm:block">
          TripCraft Prototype v4.2 &copy; 2026
        </div>
      </footer>
    </div>
  );
}
