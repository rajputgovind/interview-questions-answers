import type { Category } from "@/types/question";

export const categories: Category[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    description:
      "Core JS concepts — event loop, closures, promises, hoisting, and more.",
    icon: "FileCode",
    color: "#facc15",
    gradient: "from-yellow-500/20 to-amber-600/10",
    questionCount: 25,
  },
  {
    slug: "react",
    title: "React",
    description:
      "Hooks, Virtual DOM, Fiber, routing, state management, and React patterns.",
    icon: "Atom",
    color: "#22d3ee",
    gradient: "from-cyan-500/20 to-blue-600/10",
    questionCount: 30,
  },
  {
    slug: "typescript",
    title: "TypeScript",
    description:
      "Types, interfaces, generics, utility types, and migration strategies.",
    icon: "Braces",
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-indigo-600/10",
    questionCount: 15,
  },
  {
    slug: "performance",
    title: "Performance Optimization",
    description:
      "Bundle size, memoization, code splitting, SSR/SSG, and profiling.",
    icon: "Gauge",
    color: "#22c55e",
    gradient: "from-green-500/20 to-emerald-600/10",
    questionCount: 20,
  },
  {
    slug: "coding",
    title: "Coding / Problem Solving",
    description:
      "Hands-on coding challenges — debounce, deep clone, palindrome, and more.",
    icon: "Code2",
    color: "#a855f7",
    gradient: "from-purple-500/20 to-violet-600/10",
    questionCount: 10,
  },
  {
    slug: "scenario",
    title: "Scenario Based",
    description:
      "Real-world scenarios — race conditions, re-renders, notifications, themes.",
    icon: "Lightbulb",
    color: "#f97316",
    gradient: "from-orange-500/20 to-red-600/10",
    questionCount: 5,
  },
  {
    slug: "project",
    title: "Project Based",
    description:
      "Explain your projects, challenges, state management, and tech choices.",
    icon: "FolderKanban",
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-600/10",
    questionCount: 5,
  },
  {
    slug: "behavioral",
    title: "General / Behavioral",
    description:
      "Tell me about yourself, strengths, career goals, and interview tips.",
    icon: "Users",
    color: "#64748b",
    gradient: "from-slate-500/20 to-gray-600/10",
    questionCount: 5,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
