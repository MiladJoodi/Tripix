"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Info } from "lucide-react";
import { useSearchStore } from "@/store/search-store";
import { useBookingStore } from "@/store/booking-store";
import { searchTickets, SearchResult } from "@/data/tickets";
import { cities } from "@/data/cities";
import { Ticket, TransportType } from "@/types";
import { TicketCard } from "@/components/ui/ticket-card";
import { SearchResultsSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterModal } from "@/features/search/filter-modal";
import { FilterPanel } from "@/features/search/filter-panel";
import { PageHeader } from "@/components/layout/page-header";
import { formatDate, getTimeOfDay, delay } from "@/utils/helpers";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filters } = useSearchStore();
  const { selectTicket } = useBookingStore();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const pax = searchParams.get("pax") || "1";
  const type = (searchParams.get("type") || "bus") as TransportType;

  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [matchType, setMatchType] = useState<SearchResult["matchType"]>("exact");
  const [matchMessage, setMatchMessage] = useState<string>();
  const [filterOpen, setFilterOpen] = useState(false);

  const originCity = cities.find((c) => c.id === from);
  const destCity = cities.find((c) => c.id === to);

  useEffect(() => {
    async function load() {
      setLoading(true);
      await delay(800);
      const result = searchTickets(from, to, type);
      setTickets(result.tickets);
      setMatchType(result.matchType);
      setMatchMessage(result.message);
      setLoading(false);
    }
    load();
  }, [from, to, type]);

  const filtered = useMemo(() => {
    let result = [...tickets];

    result = result.filter(
      (t) =>
        t.price >= filters.priceRange[0] && t.price <= filters.priceRange[1]
    );

    if (filters.departureTime !== "any") {
      result = result.filter(
        (t) => getTimeOfDay(t.departureTime) === filters.departureTime
      );
    }

    if (filters.stopsOnly === "direct") {
      result = result.filter((t) => t.stops.length === 0);
    } else if (filters.stopsOnly === "1stop") {
      result = result.filter((t) => t.stops.length === 1);
    } else if (filters.stopsOnly === "2plus") {
      result = result.filter((t) => t.stops.length >= 2);
    }

    if (filters.sortBy === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "fastest") {
      result.sort((a, b) => a.duration - b.duration);
    } else {
      result.sort(
        (a, b) =>
          a.price * 0.6 +
          a.duration * 0.4 -
          (b.price * 0.6 + b.duration * 0.4)
      );
    }

    return result;
  }, [tickets, filters]);

  function handleTicketClick(ticket: Ticket) {
    selectTicket(ticket);
    router.push(`/ticket/?id=${ticket.id}`);
  }

  const headerTitle =
    originCity && destCity
      ? `${originCity.name} → ${destCity.name}`
      : "Search Results";

  const headerSubtitle = date
    ? `${formatDate(date)} · ${pax} passenger${Number(pax) !== 1 ? "s" : ""}`
    : undefined;

  const hasActiveFilters =
    filters.departureTime !== "any" ||
    filters.stopsOnly !== "any" ||
    filters.priceRange[1] < 500;

  return (
    <div className="pb-20 lg:pb-8">
      <PageHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        showBack
        action={
          <button
            onClick={() => setFilterOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative lg:hidden"
          >
            <SlidersHorizontal className="w-5 h-5 text-text-primary" />
            {hasActiveFilters && (
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-600" />
            )}
          </button>
        }
      />

      {/* Mobile info bar */}
      <div className="px-4 py-3 flex items-center justify-between lg:hidden">
        <p className="text-sm text-text-secondary">
          {loading
            ? "Searching..."
            : matchType === "exact"
            ? `${filtered.length} results found`
            : `${filtered.length} suggested results`}
        </p>
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <ArrowUpDown className="w-3 h-3" />
          {filters.sortBy === "cheapest"
            ? "Cheapest"
            : filters.sortBy === "fastest"
            ? "Fastest"
            : "Best"}
        </div>
      </div>

      {/* Desktop: sidebar + results | Mobile: just results */}
      <div className="px-4 md:px-6 lg:flex lg:gap-6 lg:pt-4">
        {/* Desktop filter sidebar */}
        <div className="hidden lg:block lg:w-72 shrink-0">
          <FilterPanel />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Desktop info bar */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">
              {loading
                ? "Searching..."
                : matchType === "exact"
                ? `${filtered.length} results found`
                : `${filtered.length} suggested results`}
            </p>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <ArrowUpDown className="w-3 h-3" />
              Sorted by:{" "}
              {filters.sortBy === "cheapest"
                ? "Cheapest"
                : filters.sortBy === "fastest"
                ? "Fastest"
                : "Best"}
            </div>
          </div>

          {loading ? (
            <SearchResultsSkeleton />
          ) : (
            <>
              {/* Fallback / suggestion banner */}
              {matchType !== "exact" && matchMessage && (
                <div className="flex items-start gap-2.5 p-3 mb-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{matchMessage}</span>
                </div>
              )}

              {filtered.length === 0 ? (
                <EmptyState
                  title="No tickets match your filters"
                  description="Try adjusting your filters to see more results."
                  action={
                    <button
                      onClick={() => router.back()}
                      className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Go back
                    </button>
                  }
                />
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {filtered.map((ticket, i) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        index={i}
                        onClick={() => handleTicketClick(ticket)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter modal */}
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 md:px-6 pt-16">
          <SearchResultsSkeleton />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
