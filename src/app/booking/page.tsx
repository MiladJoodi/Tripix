"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/store/booking-store";
import { useSearchStore } from "@/store/search-store";
import { Passenger } from "@/types";
import { Stepper } from "@/components/ui/stepper";
import { PageHeader } from "@/components/layout/page-header";
import { PassengerForm } from "@/features/booking/passenger-form";
import { ReviewStep } from "@/features/booking/review-step";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatTime, formatDuration, delay } from "@/utils/helpers";
import { toast } from "sonner";

const steps = ["Passengers", "Review", "Confirmed"];

function BookingContent() {
  const router = useRouter();
  const {
    selectedTicket,
    step,
    setStep,
    setPassengers,
    confirmBooking,
    currentBooking,
  } = useBookingStore();
  const { passengers: paxCount } = useSearchStore();
  const [passengerData, setPassengerData] = useState<Passenger[]>([]);
  const [processing, setProcessing] = useState(false);

  if (!selectedTicket) {
    return (
      <div>
        <PageHeader title="Booking" showBack />
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <p className="text-text-secondary text-center mb-4">
            No ticket selected. Please search and select a ticket first.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
    );
  }

  if (step === 2 && currentBooking) {
    router.push(`/confirmation/?id=${currentBooking.id}`);
    return null;
  }

  const count = Math.max(1, paxCount);

  function handlePassengerSubmit(data: Passenger, index: number) {
    setPassengerData((prev) => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  }

  function handleContinue() {
    if (step === 0) {
      for (let i = 0; i < count; i++) {
        const form = document.getElementById(
          `passenger-form-${i}`
        ) as HTMLFormElement;
        if (form) form.requestSubmit();
      }

      setTimeout(() => {
        if (
          passengerData.length >= count &&
          passengerData.every((p) => p.firstName)
        ) {
          setPassengers(passengerData);
          setStep(1);
        } else {
          toast.error("Please fill in all passenger details");
        }
      }, 100);
    } else if (step === 1) {
      handleConfirm();
    }
  }

  async function handleConfirm() {
    setProcessing(true);
    await delay(1500);
    confirmBooking();
    setProcessing(false);
  }

  return (
    <div className="pb-28 lg:pb-8">
      <PageHeader title="Booking" showBack />

      {/* Stepper */}
      <div className="px-4 md:px-6 py-4 max-w-2xl">
        <Stepper steps={steps} currentStep={step} />
      </div>

      {/* Content: forms + sidebar on desktop */}
      <div className="px-4 md:px-6 lg:flex lg:gap-6 max-w-5xl">
        {/* Main form content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="passengers"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                {Array.from({ length: count }).map((_, i) => (
                  <PassengerForm
                    key={i}
                    index={i}
                    onSubmit={(data) => handlePassengerSubmit(data, i)}
                    defaultValues={passengerData[i]}
                  />
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ReviewStep
                  ticket={selectedTicket}
                  passengers={passengerData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop sidebar: trip summary */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sticky top-20">
            <h3 className="font-semibold text-text-primary mb-4">
              Trip summary
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{selectedTicket.provider.logo}</span>
              <div>
                <p className="text-sm font-medium">
                  {selectedTicket.provider.name}
                </p>
                <p className="text-xs text-text-muted">
                  {selectedTicket.class}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-y border-slate-100 mb-3">
              <div>
                <p className="font-bold">
                  {formatTime(selectedTicket.departureTime)}
                </p>
                <p className="text-xs text-text-muted">
                  {selectedTicket.origin.code}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-text-muted">
                  {formatDuration(selectedTicket.duration)}
                </p>
                <div className="w-12 h-px bg-slate-300" />
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {formatTime(selectedTicket.arrivalTime)}
                </p>
                <p className="text-xs text-text-muted">
                  {selectedTicket.destination.code}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  Ticket x {count}
                </span>
                <span>{formatPrice(selectedTicket.price * count)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Service fee</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 font-bold">
                <span>Total</span>
                <span className="text-primary-600 text-lg">
                  {formatPrice(selectedTicket.price * count)}
                </span>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="space-y-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleContinue}
                disabled={processing}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/20 transition-colors flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : step === 0 ? (
                  "Continue to review"
                ) : (
                  `Pay ${formatPrice(selectedTicket.price * count)}`
                )}
              </motion.button>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-text-secondary hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-100 safe-bottom lg:hidden">
        <div className="px-4 py-3 flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="py-3 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-text-secondary hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            disabled={processing}
            className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/20 transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : step === 0 ? (
              "Continue to review"
            ) : (
              `Pay ${formatPrice(selectedTicket.price * count)}`
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 md:px-6 pt-16">
          <Skeleton className="h-64 w-full" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
