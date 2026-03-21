"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bus, Train, Plane, Star, Luggage, Users } from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { getTicketById } from "@/data/tickets";
import { Ticket, TransportType } from "@/types";
import { Timeline } from "@/components/ui/timeline";
import { PriceBadge } from "@/components/ui/price-badge";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration, delay, cn } from "@/utils/helpers";

const typeIcon: Record<TransportType, React.ReactNode> = {
  bus: <Bus className="w-5 h-5" />,
  train: <Train className="w-5 h-5" />,
  flight: <Plane className="w-5 h-5" />,
};

function TicketDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedTicket, selectTicket } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const id = searchParams.get("id") || "";

  useEffect(() => {
    async function load() {
      setLoading(true);
      await delay(500);
      if (selectedTicket && selectedTicket.id === id) {
        setTicket(selectedTicket);
      } else {
        const found = getTicketById(id);
        if (found) {
          setTicket(found);
          selectTicket(found);
        }
      }
      setLoading(false);
    }
    load();
  }, [id, selectedTicket, selectTicket]);

  if (loading) {
    return (
      <div>
        <PageHeader title="Ticket details" showBack />
        <div className="px-4 md:px-6 space-y-4 pt-4 max-w-4xl">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div>
        <PageHeader title="Ticket details" showBack />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-text-secondary">Ticket not found</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm hover:bg-primary-700 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 lg:pb-8">
      <PageHeader title="Ticket details" showBack />

      <div className="px-4 md:px-6 pt-4 lg:flex lg:gap-6 max-w-5xl">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Provider card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ticket.provider.logo}</span>
                <div>
                  <p className="font-semibold text-text-primary">
                    {ticket.provider.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-text-secondary">
                      {ticket.provider.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                {typeIcon[ticket.type]}
                <span className="text-sm font-medium capitalize">
                  {ticket.type}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">{ticket.class}</span>
              <span className="text-text-secondary">
                {formatDuration(ticket.duration)}
              </span>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Trip timeline
            </h3>
            <Timeline
              origin={ticket.origin}
              destination={ticket.destination}
              departureTime={ticket.departureTime}
              arrivalTime={ticket.arrivalTime}
              duration={ticket.duration}
              stops={ticket.stops}
            />
          </motion.div>

          {/* Amenities + Baggage side by side on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ticket.amenities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-text-secondary"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {ticket.baggage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                  Baggage
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-text-secondary">
                      Cabin: {ticket.baggage.cabin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-text-secondary">
                      Checked: {ticket.baggage.checked}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Seats info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-4 md:p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-text-secondary">
                  {ticket.seatsAvailable} seats available
                </span>
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  ticket.seatsAvailable <= 10
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-600"
                )}
              >
                {ticket.seatsAvailable <= 10 ? "Limited" : "Available"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop booking sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sticky top-20"
          >
            <div className="text-center mb-4">
              <PriceBadge price={ticket.price} size="lg" />
              <p className="text-xs text-text-muted mt-1">per person</p>
            </div>

            <div className="space-y-3 mb-5 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-text-secondary">Provider</span>
                <span className="font-medium">{ticket.provider.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-text-secondary">Class</span>
                <span className="font-medium">{ticket.class}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-text-secondary">Duration</span>
                <span className="font-medium">
                  {formatDuration(ticket.duration)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-secondary">Stops</span>
                <span className="font-medium">
                  {ticket.stops.length === 0
                    ? "Direct"
                    : `${ticket.stops.length} stop${ticket.stops.length > 1 ? "s" : ""}`}
                </span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(`/booking/?ticket=${ticket.id}`)}
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/20 transition-colors"
            >
              Continue booking
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-100 safe-bottom lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <PriceBadge price={ticket.price} size="lg" />
            <p className="text-xs text-text-muted">per person</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(`/booking/?ticket=${ticket.id}`)}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/20 transition-colors"
          >
            Continue booking
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function TicketDetailsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeader title="Ticket details" showBack />
          <div className="px-4 md:px-6 space-y-4 pt-4 max-w-4xl">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      }
    >
      <TicketDetailsContent />
    </Suspense>
  );
}
