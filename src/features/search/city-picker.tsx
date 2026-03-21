"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { City } from "@/types";
import { searchCities } from "@/data/cities";
import { cn } from "@/utils/helpers";

interface CityPickerProps {
  label: string;
  value: City | null;
  onChange: (city: City | null) => void;
  placeholder?: string;
}

export function CityPicker({ label, value, onChange, placeholder = "Select city" }: CityPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchCities(query);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="text-xs font-medium text-text-secondary mb-1 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setQuery("");
        }}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all",
          open
            ? "border-primary-400 ring-2 ring-primary-100 bg-white"
            : "border-slate-200 bg-white hover:border-slate-300"
        )}
      >
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        {value && !open ? (
          <div className="flex items-center justify-between flex-1 min-w-0">
            <span className="font-medium text-text-primary truncate">
              {value.name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="p-0.5 hover:bg-slate-100 rounded"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        ) : open ? (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-slate-400"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="text-sm text-slate-400">{placeholder}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg max-h-48 overflow-y-auto"
          >
            {results.length === 0 ? (
              <p className="text-sm text-slate-400 p-3">No cities found</p>
            ) : (
              results.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    onChange(city);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors",
                    value?.id === city.id && "bg-primary-50"
                  )}
                >
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {city.name}
                    </p>
                    <p className="text-xs text-text-muted">{city.code} · {city.country}</p>
                  </div>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
