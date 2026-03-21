"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  CreditCard,
  Settings,
  Globe,
  Moon,
  Smartphone,
  MessageCircle,
  FileText,
  Check,
  X,
  Github,
  Linkedin,
} from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/utils/helpers";

type ActiveSection = null | "payment" | "notifications" | "privacy" | "preferences" | "help";

const paymentMethods = [
  { id: "1", type: "Visa", last4: "4242", expiry: "12/27", isDefault: true },
  { id: "2", type: "Mastercard", last4: "8888", expiry: "03/26", isDefault: false },
];

const notificationSettings = [
  { id: "push", label: "Push notifications", desc: "Booking updates & reminders", enabled: true },
  { id: "email", label: "Email notifications", desc: "Receipts & confirmations", enabled: true },
  { id: "promo", label: "Promotions", desc: "Deals & offers", enabled: false },
  { id: "sms", label: "SMS alerts", desc: "Trip reminders via text", enabled: false },
];

const faqItems = [
  { q: "How do I cancel a booking?", a: "Go to My Bookings, select the booking, and tap Cancel. Refunds are processed within 5-7 business days." },
  { q: "Can I change my travel date?", a: "Yes, you can modify your date up to 24 hours before departure from the booking details page." },
  { q: "What payment methods are accepted?", a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay." },
  { q: "How do I contact support?", a: "You can reach us via email at support@tripix.com or call us at +1 (800) 555-0199." },
];

export default function ProfilePage() {
  const { user } = useUserStore();
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  function toggleNotification(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  }

  if (activeSection) {
    return (
      <div className="pb-20 lg:pb-8">
        <PageHeader
          title={
            activeSection === "payment"
              ? "Payment Methods"
              : activeSection === "notifications"
              ? "Notifications"
              : activeSection === "privacy"
              ? "Privacy & Security"
              : activeSection === "preferences"
              ? "Preferences"
              : "Help & Support"
          }
          showBack
        />
        <div className="px-4 md:px-6 pt-4 max-w-2xl">
          {activeSection === "payment" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {paymentMethods.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4"
                >
                  <div className="w-12 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600">
                    {card.type === "Visa" ? "VISA" : "MC"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {card.type} ····{card.last4}
                    </p>
                    <p className="text-xs text-text-muted">
                      Expires {card.expiry}
                    </p>
                  </div>
                  {card.isDefault && (
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-medium text-text-secondary hover:border-primary-300 hover:text-primary-600 transition-colors">
                + Add new card
              </button>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {notifications.map((n, i) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex items-center justify-between px-4 py-4",
                    i < notifications.length - 1 && "border-b border-slate-50"
                  )}
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {n.label}
                    </p>
                    <p className="text-xs text-text-muted">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleNotification(n.id)}
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors relative",
                      n.enabled ? "bg-primary-600" : "bg-slate-200"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-all",
                        n.enabled ? "left-[22px]" : "left-0.5"
                      )}
                    />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === "privacy" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <h3 className="font-semibold text-text-primary mb-3">
                  Account security
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <div>
                      <p className="text-sm font-medium">Password</p>
                      <p className="text-xs text-text-muted">
                        Last changed 30 days ago
                      </p>
                    </div>
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <div>
                      <p className="text-sm font-medium">
                        Two-factor authentication
                      </p>
                      <p className="text-xs text-text-muted">
                        Extra security for your account
                      </p>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      Enabled
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">Login sessions</p>
                      <p className="text-xs text-text-muted">
                        2 active devices
                      </p>
                    </div>
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <h3 className="font-semibold text-text-primary mb-3">
                  Data & privacy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <p className="text-sm font-medium">Download my data</p>
                    <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                      Request
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-red-600">
                        Delete account
                      </p>
                      <p className="text-xs text-text-muted">
                        Permanently remove your account
                      </p>
                    </div>
                    <button className="text-xs font-medium text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "preferences" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-xs text-text-muted">
                      Display language
                    </p>
                  </div>
                </div>
                <span className="text-sm text-text-secondary">English</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Currency</p>
                    <p className="text-xs text-text-muted">
                      Prices displayed in
                    </p>
                  </div>
                </div>
                <span className="text-sm text-text-secondary">USD ($)</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Theme</p>
                    <p className="text-xs text-text-muted">Appearance</p>
                  </div>
                </div>
                <span className="text-sm text-text-secondary">Light</span>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Distance units</p>
                    <p className="text-xs text-text-muted">Miles or km</p>
                  </div>
                </div>
                <span className="text-sm text-text-secondary">Miles</span>
              </div>
            </motion.div>
          )}

          {activeSection === "help" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <h3 className="font-semibold text-text-primary px-4 pt-4 pb-2">
                  Frequently asked questions
                </h3>
                {faqItems.map((item, i) => (
                  <div
                    key={i}
                    className="border-t border-slate-50"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === i ? null : i)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-sm font-medium text-text-primary pr-4">
                        {item.q}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-slate-400 shrink-0 transition-transform",
                          expandedFaq === i && "rotate-90"
                        )}
                      />
                    </button>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-4 pb-3"
                      >
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <h3 className="font-semibold text-text-primary mb-3">
                  Contact us
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-text-muted">
                        support@tripix.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-xs text-text-muted">
                        +1 (800) 555-0199
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium">Live chat</p>
                      <p className="text-xs text-text-muted">
                        Available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  const menuItems = [
    { key: "payment" as ActiveSection, icon: CreditCard, label: "Payment methods", desc: "Manage your saved cards" },
    { key: "notifications" as ActiveSection, icon: Bell, label: "Notifications", desc: "Push, email & SMS settings" },
    { key: "privacy" as ActiveSection, icon: Shield, label: "Privacy & Security", desc: "Password, 2FA, data" },
    { key: "preferences" as ActiveSection, icon: Settings, label: "Preferences", desc: "Language, currency, theme" },
    { key: "help" as ActiveSection, icon: HelpCircle, label: "Help & Support", desc: "FAQ & contact us" },
  ];

  return (
    <div className="pb-20 lg:pb-8">
      <PageHeader title="Profile" />

      <div className="px-4 md:px-6 pt-4 max-w-4xl">
        {/* Desktop: side by side | Mobile: stacked */}
        <div className="lg:flex lg:gap-6">
          {/* Profile card */}
          <div className="lg:w-80 shrink-0 mb-4 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-bold text-primary-600">
                    {user.avatar}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-text-primary">
                    {user.name}
                  </h2>
                  <p className="text-xs text-text-muted">Member since 2024</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {user.phone}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">12</p>
                  <p className="text-xs text-text-muted">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">3</p>
                  <p className="text-xs text-text-muted">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-text-primary">4.8</p>
                  <p className="text-xs text-text-muted">Rating</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-text-secondary hover:bg-slate-50 transition-colors">
                Edit profile
              </button>
            </motion.div>
          </div>

          {/* Menu items */}
          <div className="flex-1 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {menuItems.map((item, i) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors",
                    i < menuItems.length - 1 && "border-b border-slate-50"
                  )}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-text-primary">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              ))}
            </motion.div>

            {/* Logout */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </motion.button>

            <div className="flex items-center justify-center gap-2 pt-2">
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
            <p className="text-center text-xs text-text-muted pt-1">
              Tripix v1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
