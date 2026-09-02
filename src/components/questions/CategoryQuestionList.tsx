"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { DifficultyBadge } from "@/components/questions/DifficultyBadge";
import type { Category, Question } from "@/types/question";

interface CategoryQuestionListProps {
  category: Category;
  questions: Question[];
}

export function CategoryQuestionList({
  category,
  questions,
}: CategoryQuestionListProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? questions.filter(
        (q) =>
          q.question.toLowerCase().includes(query.toLowerCase()) ||
          q.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : questions;

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        <input
          type="search"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl glass pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      <p className="text-sm text-slate-400 mb-4">
        Showing {filtered.length} of {questions.length} questions
      </p>

      <div className="space-y-3">
        {filtered.map((q, index) => (
          <Link
            key={q.slug}
            href={`/questions/${q.slug}`}
            className="group flex items-center gap-4 glass rounded-xl p-5 hover:bg-white/10 transition-all hover:border-blue-500/30"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
              }}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {q.question}
              </h3>
              {q.tags && q.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {q.difficulty && <DifficultyBadge difficulty={q.difficulty} />}
              <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No questions found for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
