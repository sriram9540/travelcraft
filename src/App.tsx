import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WizardLayout } from './pages/WizardLayout';
import { PreferencesStep } from './components/steps/PreferencesStep';
import { DestinationsStep } from './components/steps/DestinationsStep';
import { ExploreFlights } from './components/ExploreFlights';
import { MyTrips } from './components/MyTrips';
import { ItineraryBuilderStep } from './components/steps/ItineraryBuilderStep';
import { BudgetEstimatorStep } from './components/steps/BudgetEstimatorStep';
import { PackingChecklistStep } from './components/steps/PackingChecklistStep';
import { HotelBookingStep } from './components/steps/HotelBookingStep';
import { TripProvider } from './contexts/TripContext';

export default function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WizardLayout />}>
            <Route path="/" element={<PreferencesStep />} />
            <Route path="/destinations" element={<DestinationsStep />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/itinerary" element={<ItineraryBuilderStep />} />
            <Route path="/budget" element={<BudgetEstimatorStep />} />
            <Route path="/packing" element={<PackingChecklistStep />} />
            <Route path="/booking" element={<HotelBookingStep />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}
