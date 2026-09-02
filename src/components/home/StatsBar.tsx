"use client";

import { motion } from "framer-motion";
import { BookOpen, Layers, Users, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const stats = [
  { icon: BookOpen, value: "115+", label: "Questions" },
  { icon: Layers, value: "8", label: "Categories" },
  { icon: Zap, value: "3", label: "Answer Formats" },
  { icon: Users, value: "Free", label: "For Everyone" },
];

export function StatsBar() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors"
            >
              <Icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
