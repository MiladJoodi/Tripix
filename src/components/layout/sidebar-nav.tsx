"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Ticket, User, Search, Plane, Github, Linkedin } from "lucide-react";
import { cn } from "@/utils/helpers";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/bookings", icon: Ticket, label: "My Bookings" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-dvh bg-white border-r border-slate-100 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">Tripix</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
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
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-primary-50 text-primary-600"
                  : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", active && "stroke-[2.5]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/MiladJoodi/Tripix"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/joodi/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-text-muted">Tripix v1.0.0</p>
      </div>
    </aside>
  );
}
