"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-blue-400 mb-8"
        >
          <Sparkles className="h-4 w-4" />
          115 Questions · 8 Categories · Free Forever
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Ace Your{" "}
          <span className="gradient-text">MERN Interview</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed"
        >
          React, JavaScript, TypeScript aur Performance — har question ka answer
          <strong className="text-slate-300"> Hinglish</strong> aur{" "}
          <strong className="text-slate-300">English</strong> dono mein, real-world
          examples ke saath. Interview ki taiyari ab easy!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-600 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            Browse Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl glass px-8 py-4 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            About Creator
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
