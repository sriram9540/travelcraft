export type TripStyle = 'adventure' | 'relaxation' | 'culture' | 'food' | 'nightlife' | 'family';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TripPreferences {
  origin: string;
  dates: string;
  travelers: number;
  budgetRange: [number, number];
  tripStyle: TripStyle;
  interests: string;
}

export interface Trip {
  id: string;
  userId?: string;
  preferences: TripPreferences;
  destination?: string;
  status: 'planning' | 'booked' | 'completed';
}

export interface ItineraryActivity {
  time: string;
  description: string;
  type: 'activity' | 'dining' | 'travel' | 'rest';
}

export interface ItineraryDay {
  day: number;
  date?: string;
  morning: ItineraryActivity[];
  afternoon: ItineraryActivity[];
  evening: ItineraryActivity[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  days: ItineraryDay[];
}

export interface Budget {
  id: string;
  tripId: string;
  items: {
    category: 'flights' | 'stay' | 'food' | 'transport' | 'activities' | 'misc';
    estimatedCost: number;
    actualCost?: number;
  }[];
}

export interface PackingItem {
  id: string;
  tripId: string;
  item: string;
  packed: boolean;
}

export interface Booking {
  id: string;
  tripId: string;
  type: 'flight' | 'hotel';
  provider: string;
  price: number;
  status: 'pending' | 'confirmed';
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  providerRef?: string;
}
