import { Provider } from "@/types";

export const busProviders: Provider[] = [
  { id: "greyhound", name: "Greyhound", logo: "🚌", type: "bus", rating: 4.1 },
  { id: "flixbus", name: "FlixBus", logo: "🟢", type: "bus", rating: 4.3 },
  { id: "megabus", name: "Megabus", logo: "🔵", type: "bus", rating: 3.9 },
  { id: "peter-pan", name: "Peter Pan Bus", logo: "🟡", type: "bus", rating: 4.0 },
  { id: "redcoach", name: "RedCoach", logo: "🔴", type: "bus", rating: 4.4 },
];

export const trainProviders: Provider[] = [
  { id: "amtrak", name: "Amtrak", logo: "🚆", type: "train", rating: 4.2 },
  { id: "amtrak-acela", name: "Amtrak Acela", logo: "⚡", type: "train", rating: 4.5 },
  { id: "brightline", name: "Brightline", logo: "🟡", type: "train", rating: 4.6 },
];

export const flightProviders: Provider[] = [
  { id: "delta", name: "Delta Airlines", logo: "✈️", type: "flight", rating: 4.3 },
  { id: "united", name: "United Airlines", logo: "🌐", type: "flight", rating: 4.0 },
  { id: "american", name: "American Airlines", logo: "🦅", type: "flight", rating: 4.1 },
  { id: "jetblue", name: "JetBlue", logo: "💙", type: "flight", rating: 4.4 },
  { id: "southwest", name: "Southwest", logo: "❤️", type: "flight", rating: 4.2 },
  { id: "spirit", name: "Spirit Airlines", logo: "💛", type: "flight", rating: 3.5 },
  { id: "frontier", name: "Frontier Airlines", logo: "🟢", type: "flight", rating: 3.6 },
];

export const allProviders = [...busProviders, ...trainProviders, ...flightProviders];
