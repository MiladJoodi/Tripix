export type TransportType = "bus" | "train" | "flight";

export interface City {
  id: string;
  name: string;
  code: string;
  country: string;
}

export interface Stop {
  city: City;
  arrivalTime: string;
  departureTime: string;
  duration: number; // minutes stopped
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  type: TransportType;
  rating: number;
}

export interface Ticket {
  id: string;
  type: TransportType;
  provider: Provider;
  origin: City;
  destination: City;
  departureTime: string;
  arrivalTime: string;
  duration: number; // minutes
  price: number;
  currency: string;
  stops: Stop[];
  class: string;
  amenities: string[];
  seatsAvailable: number;
  baggage?: {
    cabin: string;
    checked: string;
  };
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  idNumber: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  ticket: Ticket;
  passengers: Passenger[];
  status: "confirmed" | "pending" | "cancelled";
  bookedAt: string;
  totalPrice: number;
}

export interface SearchParams {
  origin: City | null;
  destination: City | null;
  date: string;
  passengers: number;
  type: TransportType;
}

export interface FilterState {
  priceRange: [number, number];
  departureTime: "any" | "morning" | "afternoon" | "evening" | "night";
  stopsOnly: "any" | "direct" | "1stop" | "2plus";
  sortBy: "cheapest" | "fastest" | "best";
}

export interface RecentSearch {
  id: string;
  params: SearchParams;
  timestamp: number;
}
