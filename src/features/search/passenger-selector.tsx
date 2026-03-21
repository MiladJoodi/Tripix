"use client";

import { Minus, Plus, Users } from "lucide-react";
import { cn } from "@/utils/helpers";

interface PassengerSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1 block">
        Passengers
      </label>
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 bg-white">
        <Users className="w-4 h-4 text-slate-400" />
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
            value <= 1
              ? "bg-slate-100 text-slate-300"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95"
          )}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold text-text-primary min-w-[2ch] text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(9, value + 1))}
          disabled={value >= 9}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
            value >= 9
              ? "bg-slate-100 text-slate-300"
              : "bg-primary-50 text-primary-600 hover:bg-primary-100 active:scale-95"
          )}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
