"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        {icon || <SearchX className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
