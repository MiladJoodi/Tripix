"use client";

import { Check } from "lucide-react";
import { cn } from "@/utils/helpers";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between px-2">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                i < currentStep &&
                  "bg-primary-600 text-white",
                i === currentStep &&
                  "bg-primary-600 text-white ring-4 ring-primary-100",
                i > currentStep &&
                  "bg-slate-100 text-slate-400"
              )}
            >
              {i < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 font-medium whitespace-nowrap",
                i <= currentStep ? "text-primary-600" : "text-slate-400"
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-2 mt-[-16px] transition-all duration-300",
                i < currentStep ? "bg-primary-600" : "bg-slate-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
