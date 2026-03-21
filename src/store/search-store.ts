import { create } from "zustand";
import { SearchParams, RecentSearch, TransportType, City, FilterState } from "@/types";
import { generateId } from "@/utils/helpers";

interface SearchStore {
  // Search params
  origin: City | null;
  destination: City | null;
  date: string;
  passengers: number;
  type: TransportType;

  // Filters
  filters: FilterState;

  // Recent searches
  recentSearches: RecentSearch[];

  // Actions
  setOrigin: (city: City | null) => void;
  setDestination: (city: City | null) => void;
  setDate: (date: string) => void;
  setPassengers: (count: number) => void;
  setType: (type: TransportType) => void;
  swapCities: () => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  addRecentSearch: () => void;
  loadRecentSearches: () => void;
  clearRecentSearches: () => void;
}

const defaultFilters: FilterState = {
  priceRange: [0, 500],
  departureTime: "any",
  stopsOnly: "any",
  sortBy: "best",
};

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  origin: null,
  destination: null,
  date: getTomorrowDate(),
  passengers: 1,
  type: "bus",
  filters: { ...defaultFilters },
  recentSearches: [],

  setOrigin: (city) => set({ origin: city }),
  setDestination: (city) => set({ destination: city }),
  setDate: (date) => set({ date }),
  setPassengers: (count) => set({ passengers: Math.max(1, Math.min(9, count)) }),
  setType: (type) => set({ type }),

  swapCities: () => {
    const { origin, destination } = get();
    set({ origin: destination, destination: origin });
  },

  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  addRecentSearch: () => {
    const { origin, destination, date, passengers, type, recentSearches } = get();
    if (!origin || !destination) return;

    const search: RecentSearch = {
      id: generateId(),
      params: { origin, destination, date, passengers, type },
      timestamp: Date.now(),
    };

    const filtered = recentSearches
      .filter(
        (s) =>
          !(
            s.params.origin?.id === origin.id &&
            s.params.destination?.id === destination.id &&
            s.params.type === type
          )
      )
      .slice(0, 4);

    const updated = [search, ...filtered];
    set({ recentSearches: updated });

    try {
      localStorage.setItem("tripix-recent", JSON.stringify(updated));
    } catch {}
  },

  loadRecentSearches: () => {
    try {
      const raw = localStorage.getItem("tripix-recent");
      if (raw) {
        set({ recentSearches: JSON.parse(raw) });
      }
    } catch {}
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });
    try {
      localStorage.removeItem("tripix-recent");
    } catch {}
  },
}));
