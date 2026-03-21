"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/helpers";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  action?: React.ReactNode;
  transparent?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  action,
  transparent = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3",
        transparent
          ? "bg-transparent"
          : "bg-white/90 glass border-b border-slate-100"
      )}
    >
      {showBack && (
        <button
          onClick={() => router.back()}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-text-primary" />
        </button>
      )}
      <div className="flex-1">
        <h1 className="text-lg md:text-xl font-bold text-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {action}
    </header>
  );
}
