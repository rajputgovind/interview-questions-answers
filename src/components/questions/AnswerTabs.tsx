"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, BookOpen, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import type { QuestionAnswers } from "@/types/question";

type Tab = "hinglish" | "english" | "example";

const tabs: { id: Tab; label: string; icon: typeof Languages }[] = [
  { id: "hinglish", label: "Hinglish", icon: Languages },
  { id: "english", label: "English", icon: BookOpen },
  { id: "example", label: "Example", icon: Lightbulb },
];

export function AnswerTabs({ answers }: { answers: QuestionAnswers }) {
  const [active, setActive] = useState<Tab>("hinglish");

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {answers.keyPoints && answers.keyPoints.length > 0 && (
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <h3 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">
            Key Points
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {answers.keyPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const disabled = tab.id === "example" && !answers.example;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={disabled}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap",
                active === tab.id
                  ? "text-blue-400 border-b-2 border-blue-400 bg-blue-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5",
                disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {active === "hinglish" && (
              <div className="prose-content">
                {answers.hinglish.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {active === "english" && (
              <div className="prose-content">
                {answers.english.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {active === "example" && answers.example && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {answers.example.title}
                </h3>
                {answers.example.code && (
                  <CodeBlock
                    code={answers.example.code}
                    language={answers.example.language || "javascript"}
                  />
                )}
                <div className="prose-content">
                  {answers.example.explanation.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
