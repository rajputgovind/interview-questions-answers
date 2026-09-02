import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Atom,
  Braces,
  Code2,
  FileCode,
  FolderKanban,
  Gauge,
  Lightbulb,
  Users,
} from "lucide-react";

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

export const metadata = {
  title: "All Categories",
  description: "Browse all 8 interview question categories — JavaScript, React, TypeScript, and more.",
};

export default function CategoriesPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">All Categories</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            115 interview questions organized across 8 categories. Pick one and start preparing.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code2;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group glass rounded-2xl p-8 hover:scale-[1.01] transition-all bg-gradient-to-br ${cat.gradient}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-slate-400 text-sm mb-4">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: cat.color }}>
                        {cat.questionCount} questions
                      </span>
                      <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
