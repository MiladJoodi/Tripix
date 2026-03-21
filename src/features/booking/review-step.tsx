"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, User, CreditCard } from "lucide-react";
import { Ticket, Passenger } from "@/types";
import { formatTime, formatDuration, formatPrice } from "@/utils/helpers";

interface ReviewStepProps {
  ticket: Ticket;
  passengers: Passenger[];
}

export function ReviewStep({ ticket, passengers }: ReviewStepProps) {
  const totalPrice = ticket.price * passengers.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Trip summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Trip summary
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">{ticket.provider.logo}</span>
          <div>
            <p className="font-medium text-text-primary">{ticket.provider.name}</p>
            <p className="text-xs text-text-secondary">{ticket.class}</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-y border-slate-100">
          <div>
            <p className="text-lg font-bold">{formatTime(ticket.departureTime)}</p>
            <p className="text-xs text-text-secondary">{ticket.origin.name}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted">{formatDuration(ticket.duration)}</p>
            <div className="w-16 h-px bg-slate-300 my-1" />
            <p className="text-xs text-text-muted">
              {ticket.stops.length === 0 ? "Direct" : `${ticket.stops.length} stop`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{formatTime(ticket.arrivalTime)}</p>
            <p className="text-xs text-text-secondary">{ticket.destination.name}</p>
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Passengers</h3>
        <div className="space-y-2">
          {passengers.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-2 border-b border-slate-50 last:border-0"
            >
              <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {p.firstName} {p.lastName}
                </p>
                <p className="text-xs text-text-muted">{p.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Price details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">
              Ticket × {passengers.length}
            </span>
            <span className="text-text-primary">
              {formatPrice(ticket.price)} × {passengers.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Service fee</span>
            <span className="text-text-primary">$0</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100 font-bold">
            <span className="text-text-primary">Total</span>
            <span className="text-primary-600 text-lg">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
