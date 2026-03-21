"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Bus,
  Train,
  Plane,
  ChevronRight,
  TrendingUp,
  Star,
  Shield,
  Headphones,
} from "lucide-react";
import { useSearchStore } from "@/store/search-store";
import { SearchForm } from "@/features/search/search-form";
import { TransportType, RecentSearch } from "@/types";
import { formatDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const typeIcons: Record<TransportType, React.ReactNode> = {
  bus: <Bus className="w-3.5 h-3.5" />,
  train: <Train className="w-3.5 h-3.5" />,
  flight: <Plane className="w-3.5 h-3.5" />,
};

const popularRoutes = [
  { from: "New York", to: "Boston", price: "$25+", type: "bus" as TransportType, duration: "4h", fromId: "nyc", toId: "bos" },
  { from: "NYC", to: "Washington DC", price: "$30+", type: "train" as TransportType, duration: "3h 15m", fromId: "nyc", toId: "was" },
  { from: "NYC", to: "Los Angeles", price: "$85+", type: "flight" as TransportType, duration: "5h 15m", fromId: "nyc", toId: "lax" },
  { from: "Miami", to: "Orlando", price: "$79+", type: "train" as TransportType, duration: "3h 30m", fromId: "mia", toId: "orl" },
  { from: "San Francisco", to: "Seattle", price: "$99+", type: "flight" as TransportType, duration: "2h 15m", fromId: "sfo", toId: "sea" },
  { from: "LA", to: "San Francisco", price: "$32+", type: "bus" as TransportType, duration: "6h", fromId: "lax", toId: "sfo" },
];

const features = [
  { icon: Shield, title: "Secure booking", desc: "Your data is protected with industry-standard encryption" },
  { icon: Star, title: "Best prices", desc: "Compare fares across all major carriers" },
  { icon: Headphones, title: "24/7 Support", desc: "Travel assistance whenever you need it" },
];

export default function HomePage() {
  const router = useRouter();
  const {
    recentSearches,
    loadRecentSearches,
    clearRecentSearches,
    setOrigin,
    setDestination,
    setDate,
    setPassengers,
    setType,
  } = useSearchStore();

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  function handleRecentClick(search: RecentSearch) {
    const { origin, destination, date, passengers, type } = search.params;
    if (origin) setOrigin(origin);
    if (destination) setDestination(destination);
    setDate(date);
    setPassengers(passengers);
    setType(type);
    router.push(
      `/search?from=${origin?.id}&to=${destination?.id}&date=${date}&pax=${passengers}&type=${type}`
    );
  }

  function handleRouteClick(route: (typeof popularRoutes)[0]) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = tomorrow.toISOString().split("T")[0];
    router.push(
      `/search?from=${route.fromId}&to=${route.toId}&date=${date}&pax=1&type=${route.type}`
    );
  }

  return (
    <div className="pb-20 lg:pb-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-5 md:px-8 pt-10 md:pt-16 pb-8 md:pb-12 lg:rounded-b-3xl">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
              Where to next?
            </h1>
            <p className="text-primary-200 text-sm md:text-base">
              Search and book bus, train & flight tickets in one place
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search card overlapping hero */}
      <div className="px-4 md:px-8 -mt-4 md:-mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 md:p-6 shadow-lg shadow-slate-200/60 max-w-3xl"
        >
          <SearchForm />
        </motion.div>
      </div>

      {/* Content grid - recent + popular side by side on desktop */}
      <div className="px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Recent searches + Features */}
        <div className="lg:col-span-1 space-y-8">
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <h2 className="text-sm font-semibold text-text-primary">
                    Recent searches
                  </h2>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-2">
                {recentSearches.map((search, i) => (
                  <motion.button
                    key={search.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    onClick={() => handleRecentClick(search)}
                    className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                      {typeIcons[search.params.type]}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
                        <span className="truncate">
                          {search.params.origin?.name}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {search.params.destination?.name}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">
                        {formatDate(search.params.date)} ·{" "}
                        {search.params.passengers}{" "}
                        {search.params.passengers === 1
                          ? "passenger"
                          : "passengers"}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-sm font-semibold text-text-primary mb-3">
              Why Tripix?
            </h2>
            <div className="space-y-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <f.icon className="w-4.5 h-4.5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {f.title}
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column: Popular routes */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-text-secondary" />
              <h2 className="text-sm font-semibold text-text-primary">
                Popular routes
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {popularRoutes.map((route) => (
                <button
                  key={`${route.fromId}-${route.toId}-${route.type}`}
                  onClick={() => handleRouteClick(route)}
                  className="p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all text-left active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">
                        {typeIcons[route.type]}
                      </span>
                      <span className="text-[10px] font-medium text-text-muted uppercase">
                        {route.type}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary-400 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary mb-1">
                    {route.from} → {route.to}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {route.duration}
                    </span>
                    <span className="text-sm text-primary-600 font-bold">
                      from {route.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
