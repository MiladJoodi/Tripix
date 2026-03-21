"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Ticket, User } from "lucide-react";
import { cn } from "@/utils/helpers";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/bookings", icon: Ticket, label: "Bookings" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on booking flow
  if (pathname.startsWith("/booking") || pathname.startsWith("/confirmation")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-100 safe-bottom lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all",
                active
                  ? "text-primary-600"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon
                className={cn("w-5 h-5", active && "stroke-[2.5]")}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-primary-600 mt-[-2px]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
