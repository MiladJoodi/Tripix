"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Home,
  Copy,
  Bus,
  Train,
  Plane,
  Calendar,
  Users,
} from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { Booking, TransportType } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import {
  formatTime,
  formatDuration,
  formatPrice,
  formatFullDate,
} from "@/utils/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const typeIcon: Record<TransportType, React.ReactNode> = {
  bus: <Bus className="w-4 h-4" />,
  train: <Train className="w-4 h-4" />,
  flight: <Plane className="w-4 h-4" />,
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentBooking, bookings, loadBookings } = useBookingStore();
  const [booking, setBooking] = useState<Booking | null>(null);

  const id = searchParams.get("id") || "";

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    if (currentBooking && currentBooking.id === id) {
      setBooking(currentBooking);
    } else {
      const found = bookings.find((b) => b.id === id);
      if (found) setBooking(found);
    }
  }, [id, currentBooking, bookings]);

  if (!booking) {
    return (
      <div>
        <PageHeader title="Confirmation" />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-text-secondary">Booking not found</p>
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

  function copyRef() {
    navigator.clipboard.writeText(booking!.bookingRef);
    toast.success("Booking reference copied!");
  }

  function downloadTicket() {
    toast.success("Ticket downloaded (mock)");
  }

  return (
    <div className="pb-8">
      <PageHeader title="Booking confirmed" showBack />

      <div className="px-4 md:px-6 pt-4 max-w-4xl">
        {/* Desktop: 2 columns | Mobile: stacked */}
        <div className="lg:flex lg:gap-8">
          {/* Left: success + ref */}
          <div className="lg:w-80 shrink-0 mb-6 lg:mb-0">
            {/* Success */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.1 }}
              className="flex flex-col items-center text-center mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-1">
                Booking confirmed!
              </h2>
              <p className="text-sm text-text-secondary">
                Your ticket has been booked successfully
              </p>
            </motion.div>

            {/* Booking ref */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary-50 rounded-2xl p-4 mb-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-primary-600 font-medium">
                  Booking reference
                </p>
                <p className="text-lg font-bold text-primary-700 tracking-wider">
                  {booking.bookingRef}
                </p>
              </div>
              <button
                onClick={copyRef}
                className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-primary-600" />
              </button>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <button
                onClick={downloadTicket}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download ticket
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-text-primary rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to home
              </button>
            </motion.div>
          </div>

          {/* Right: Ticket details */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* Ticket header */}
              <div className="bg-slate-50 px-4 md:px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {booking.ticket.provider.logo}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {booking.ticket.provider.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {booking.ticket.class}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  {typeIcon[booking.ticket.type]}
                  <span className="text-xs font-medium capitalize">
                    {booking.ticket.type}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-5">
                {/* Route */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-2xl font-bold">
                      {formatTime(booking.ticket.departureTime)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {booking.ticket.origin.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {booking.ticket.origin.code}
                    </p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs text-text-muted">
                      {formatDuration(booking.ticket.duration)}
                    </p>
                    <div className="w-20 flex items-center my-1">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                      <div className="flex-1 h-px bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-xs text-text-muted">
                      {booking.ticket.stops.length === 0
                        ? "Direct"
                        : `${booking.ticket.stops.length} stop`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {formatTime(booking.ticket.arrivalTime)}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {booking.ticket.destination.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {booking.ticket.destination.code}
                    </p>
                  </div>
                </div>

                {/* Passengers */}
                <div className="border-t border-dashed border-slate-200 pt-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                      Passengers
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {booking.passengers.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
                      >
                        <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-600">
                          {p.firstName[0]}
                          {p.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {p.firstName} {p.lastName}
                          </p>
                          <p className="text-xs text-text-muted">{p.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking info */}
                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Booked on</span>
                    <span className="font-medium">
                      {formatFullDate(booking.bookedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status</span>
                    <span className="font-medium text-emerald-600 capitalize">
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-base">
                    <span className="font-semibold text-text-primary">
                      Total paid
                    </span>
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(booking.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeader title="Confirmation" />
          <div className="px-4 md:px-6 space-y-4 pt-4 max-w-4xl">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
