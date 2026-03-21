"use client";

import { motion } from "framer-motion";
import { Bus, Train, Plane, Clock, MapPin } from "lucide-react";
import { Ticket, TransportType } from "@/types";
import { formatTime, formatDuration, formatPrice, cn } from "@/utils/helpers";

const typeIcon: Record<TransportType, React.ReactNode> = {
  bus: <Bus className="w-4 h-4" />,
  train: <Train className="w-4 h-4" />,
  flight: <Plane className="w-4 h-4" />,
};

const typeColor: Record<TransportType, string> = {
  bus: "bg-emerald-50 text-emerald-600",
  train: "bg-blue-50 text-blue-600",
  flight: "bg-violet-50 text-violet-600",
};

interface TicketCardProps {
  ticket: Ticket;
  index?: number;
  onClick?: () => void;
}

export function TicketCard({ ticket, index = 0, onClick }: TicketCardProps) {
  const stopsLabel =
    ticket.stops.length === 0
      ? "Direct"
      : `${ticket.stops.length} stop${ticket.stops.length > 1 ? "s" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md"
    >
      {/* Provider + Type badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{ticket.provider.logo}</span>
          <span className="text-sm font-medium text-text-secondary">
            {ticket.provider.name}
          </span>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
            typeColor[ticket.type]
          )}
        >
          {typeIcon[ticket.type]}
          {ticket.class}
        </span>
      </div>

      {/* Route times */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-text-primary">
            {formatTime(ticket.departureTime)}
          </p>
          <p className="text-xs text-text-secondary">{ticket.origin.code}</p>
        </div>

        <div className="flex-1 mx-4 flex flex-col items-center">
          <span className="text-xs text-text-muted mb-1">
            {formatDuration(ticket.duration)}
          </span>
          <div className="w-full relative flex items-center">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <div className="flex-1 h-px bg-slate-300 mx-1 relative">
              {ticket.stops.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400"
                  style={{
                    left: `${((i + 1) / (ticket.stops.length + 1)) * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          <span
            className={cn(
              "text-xs mt-1",
              ticket.stops.length === 0 ? "text-emerald-600" : "text-amber-600"
            )}
          >
            {stopsLabel}
          </span>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-text-primary">
            {formatTime(ticket.arrivalTime)}
          </p>
          <p className="text-xs text-text-secondary">{ticket.destination.code}</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {ticket.amenities.slice(0, 2).map((a) => (
            <span key={a} className="text-xs text-text-muted">
              {a}
            </span>
          ))}
          {ticket.amenities.length > 2 && (
            <span className="text-xs text-text-muted">
              +{ticket.amenities.length - 2}
            </span>
          )}
        </div>
        <span className="text-xl font-bold text-primary-600">
          {formatPrice(ticket.price)}
        </span>
      </div>
    </motion.div>
  );
}
