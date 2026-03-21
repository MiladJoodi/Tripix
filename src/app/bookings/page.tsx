"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Ticket,
  Bus,
  Train,
  Plane,
  ChevronRight,
  Calendar,
  Search,
} from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { TransportType } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { formatTime, formatPrice, formatDate, formatDuration, cn } from "@/utils/helpers";

const typeIcon: Record<TransportType, React.ReactNode> = {
  bus: <Bus className="w-4 h-4" />,
  train: <Train className="w-4 h-4" />,
  flight: <Plane className="w-4 h-4" />,
};

const statusColors = {
  confirmed: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  cancelled: "bg-red-50 text-red-600",
};

export default function BookingsPage() {
  const router = useRouter();
  const { bookings, loadBookings } = useBookingStore();

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return (
    <div className="pb-20 lg:pb-8">
      <PageHeader title="My bookings" />

      <div className="px-4 md:px-6 pt-2 max-w-5xl">
        {bookings.length === 0 ? (
          <EmptyState
            icon={<Ticket className="w-8 h-8 text-slate-400" />}
            title="No bookings yet"
            description="Once you book a trip, your tickets will appear here. Start searching for your next adventure!"
            action={
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search tickets
              </button>
            }
          />
        ) : (
          <>
            <p className="text-sm text-text-secondary mb-4">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => router.push(`/confirmation/?id=${booking.id}`)}
                  className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {booking.ticket.provider.logo}
                      </span>
                      <span className="text-sm font-medium text-text-secondary">
                        {booking.ticket.provider.name}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
                        statusColors[booking.status]
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-lg font-bold">
                        {formatTime(booking.ticket.departureTime)}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {booking.ticket.origin.name}
                      </p>
                    </div>
                    <div className="flex-1 mx-3 flex flex-col items-center">
                      <p className="text-[10px] text-text-muted">
                        {formatDuration(booking.ticket.duration)}
                      </p>
                      <div className="w-full flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="flex-1 h-px bg-slate-200 mx-1" />
                        <div className="text-slate-400">
                          {typeIcon[booking.ticket.type]}
                        </div>
                        <div className="flex-1 h-px bg-slate-200 mx-1" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                      <p className="text-[10px] text-text-muted">
                        {booking.ticket.stops.length === 0
                          ? "Direct"
                          : `${booking.ticket.stops.length} stop`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {formatTime(booking.ticket.arrivalTime)}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {booking.ticket.destination.name}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Calendar className="w-3 h-3" />
                        {formatDate(booking.bookedAt)}
                      </div>
                      <span className="text-xs text-text-muted">
                        Ref: {booking.bookingRef}
                      </span>
                    </div>
                    <span className="font-bold text-primary-600">
                      {formatPrice(booking.totalPrice)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
