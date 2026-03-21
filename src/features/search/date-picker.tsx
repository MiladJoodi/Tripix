"use client";

import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <label className="text-xs font-medium text-text-secondary mb-1 block">
        Date
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          min={today}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-text-primary outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all appearance-none"
        />
      </div>
    </div>
  );
}
