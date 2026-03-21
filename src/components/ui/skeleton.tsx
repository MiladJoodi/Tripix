"use client";

import { cn } from "@/utils/helpers";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200",
        className
      )}
    />
  );
}

export function TicketCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex-1 mx-4">
          <Skeleton className="h-0.5 w-full" />
        </div>
        <div className="space-y-1 text-right">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <TicketCardSkeleton key={i} />
      ))}
    </div>
  );
}
