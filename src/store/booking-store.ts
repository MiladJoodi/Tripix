import { create } from "zustand";
import { Ticket, Passenger, Booking } from "@/types";
import { generateBookingRef, generateId } from "@/utils/helpers";

interface BookingStore {
  // Selected ticket for booking
  selectedTicket: Ticket | null;

  // Booking flow
  step: number; // 0: passenger info, 1: review, 2: confirmation
  passengers: Passenger[];

  // Completed bookings
  bookings: Booking[];
  currentBooking: Booking | null;

  // Actions
  selectTicket: (ticket: Ticket) => void;
  setStep: (step: number) => void;
  setPassengers: (passengers: Passenger[]) => void;
  confirmBooking: () => void;
  loadBookings: () => void;
  clearCurrentBooking: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  selectedTicket: null,
  step: 0,
  passengers: [],
  bookings: [],
  currentBooking: null,

  selectTicket: (ticket) => set({ selectedTicket: ticket, step: 0 }),

  setStep: (step) => set({ step }),

  setPassengers: (passengers) => set({ passengers }),

  confirmBooking: () => {
    const { selectedTicket, passengers, bookings } = get();
    if (!selectedTicket) return;

    const booking: Booking = {
      id: generateId(),
      bookingRef: generateBookingRef(),
      ticket: selectedTicket,
      passengers,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
      totalPrice: selectedTicket.price * passengers.length,
    };

    const updated = [booking, ...bookings];
    set({
      currentBooking: booking,
      bookings: updated,
      step: 2,
    });

    try {
      localStorage.setItem("tripix-bookings", JSON.stringify(updated));
    } catch {}
  },

  loadBookings: () => {
    try {
      const raw = localStorage.getItem("tripix-bookings");
      if (raw) {
        set({ bookings: JSON.parse(raw) });
      }
    } catch {}
  },

  clearCurrentBooking: () =>
    set({ currentBooking: null, selectedTicket: null, step: 0, passengers: [] }),

  reset: () =>
    set({ selectedTicket: null, step: 0, passengers: [], currentBooking: null }),
}));
