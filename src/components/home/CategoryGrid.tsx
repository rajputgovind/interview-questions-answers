"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Atom,
  Braces,
  Code2,
  FileCode,
  FolderKanban,
  Gauge,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";
import { categories } from "@/data/categories";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const iconMap: Record<string, typeof Atom> = {
  FileCode,
  Atom,
  Braces,
  Gauge,
  Code2,
  Lightbulb,
  FolderKanban,
  Users,
};

export function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore Categories
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Category choose karo aur interview questions padhna shuru karo — Hinglish,
            English aur real examples ke saath.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className={`group block glass rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br ${cat.gradient} hover:border-white/20`}
                  style={{ borderColor: `${cat.color}30` }}
                >
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: cat.color }}>
                      {cat.questionCount} questions
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}
