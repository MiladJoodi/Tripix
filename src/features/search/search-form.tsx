"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRightLeft, Search, Bus, Train, Plane } from "lucide-react";
import { useSearchStore } from "@/store/search-store";
import { TransportType } from "@/types";
import { CityPicker } from "./city-picker";
import { DatePicker } from "./date-picker";
import { PassengerSelector } from "./passenger-selector";
import { cn } from "@/utils/helpers";
import { toast } from "sonner";

const tabs: { type: TransportType; label: string; icon: React.ReactNode }[] = [
  { type: "bus", label: "Bus", icon: <Bus className="w-4 h-4" /> },
  { type: "train", label: "Train", icon: <Train className="w-4 h-4" /> },
  { type: "flight", label: "Flight", icon: <Plane className="w-4 h-4" /> },
];

export function SearchForm() {
  const router = useRouter();
  const {
    origin,
    destination,
    date,
    passengers,
    type,
    setOrigin,
    setDestination,
    setDate,
    setPassengers,
    setType,
    swapCities,
    addRecentSearch,
  } = useSearchStore();

  function handleSearch() {
    if (!origin) {
      toast.error("Please select an origin city");
      return;
    }
    if (!destination) {
      toast.error("Please select a destination city");
      return;
    }
    if (origin.id === destination.id) {
      toast.error("Origin and destination can't be the same");
      return;
    }

    addRecentSearch();
    router.push(
      `/search?from=${origin.id}&to=${destination.id}&date=${date}&pax=${passengers}&type=${type}`
    );
  }

  return (
    <div className="space-y-4">
      {/* Transport type tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            type="button"
            onClick={() => setType(tab.type)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
              type === tab.type
                ? "bg-white text-primary-600 shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Origin / Destination */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2">
        <CityPicker
          label="From"
          value={origin}
          onChange={setOrigin}
          placeholder="Where from?"
        />

        <button
          type="button"
          onClick={swapCities}
          className="absolute left-1/2 -translate-x-1/2 top-[52px] md:top-1/2 md:-translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 active:scale-90 transition-all"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 rotate-90 md:rotate-0" />
        </button>

        <CityPicker
          label="To"
          value={destination}
          onChange={setDestination}
          placeholder="Where to?"
        />
      </div>

      {/* Date + Passengers */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <DatePicker value={date} onChange={setDate} />
        <PassengerSelector value={passengers} onChange={setPassengers} />
        <div className="col-span-2 md:col-span-1 hidden md:block" />
      </div>

      {/* Search button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleSearch}
        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 transition-colors"
      >
        <Search className="w-4 h-4" />
        Search tickets
      </motion.button>
    </div>
  );
}
