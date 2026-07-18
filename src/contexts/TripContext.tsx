import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripStyle } from '../types';

type Destination = {
  id: string;
  title: string;
  region: string;
  imageQuery: string;
  budget: string;
  topChoice: boolean;
  mapQuery: string;
};

type ItineraryActivity = {
  time: string;
  desc: string;
};

type ItineraryDay = {
  day: number;
  title: string;
  activities: ItineraryActivity[];
};

type BudgetEstimate = {
  total: string;
  perPerson: string;
  accommodation: string;
  transportation: string;
  food: string;
  activities: string;
};

type PackingItem = {
  id: string;
  text: string;
  category: string;
  checked?: boolean;
};

type Hotel = {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: string;
  imageQuery: string;
  amenities: string[];
};

type TripDetails = {
  itinerary: ItineraryDay[];
  budgetEstimate: BudgetEstimate;
  packingList: PackingItem[];
  hotels: Hotel[];
};

type Preferences = {
  origin: string;
  dates: string;
  travelers: number;
  budget: string;
  tripStyle: TripStyle;
  interests: string;
};

type TripContextType = {
  preferences: Preferences;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
  destinations: Destination[];
  setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  selectedDestination: Destination | null;
  setSelectedDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
  tripDetails: TripDetails | null;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails | null>>;
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const saved = localStorage.getItem('trip_preferences');
    return saved ? JSON.parse(saved) : {
      origin: '',
      dates: '',
      travelers: 1,
      budget: '₹1,00,000 - ₹2,00,000',
      tripStyle: 'relaxation',
      interests: '',
    };
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('trip_destinations');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(() => {
    const saved = localStorage.getItem('trip_selectedDestination');
    return saved ? JSON.parse(saved) : null;
  });

  const [tripDetails, setTripDetails] = useState<TripDetails | null>(() => {
    const saved = localStorage.getItem('trip_details');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('trip_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('trip_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('trip_selectedDestination', JSON.stringify(selectedDestination));
  }, [selectedDestination]);

  useEffect(() => {
    localStorage.setItem('trip_details', JSON.stringify(tripDetails));
  }, [tripDetails]);

  return (
    <TripContext.Provider
      value={{
        preferences,
        setPreferences,
        destinations,
        setDestinations,
        selectedDestination,
        setSelectedDestination,
        tripDetails,
        setTripDetails,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
