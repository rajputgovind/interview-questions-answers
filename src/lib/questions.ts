import { javascriptQuestions } from "@/data/questions/javascript";
import { reactQuestions } from "@/data/questions/react";
import { typescriptQuestions } from "@/data/questions/typescript";
import { performanceQuestions } from "@/data/questions/performance";
import { codingQuestions } from "@/data/questions/coding";
import { scenarioQuestions } from "@/data/questions/scenario";
import { projectQuestions } from "@/data/questions/project";
import { behavioralQuestions } from "@/data/questions/behavioral";
import type { CategorySlug, Question } from "@/types/question";

export const allQuestions: Question[] = [
  ...javascriptQuestions,
  ...reactQuestions,
  ...typescriptQuestions,
  ...performanceQuestions,
  ...codingQuestions,
  ...scenarioQuestions,
  ...projectQuestions,
  ...behavioralQuestions,
];

export function getAllQuestions(): Question[] {
  return allQuestions;
}

export function getQuestionBySlug(slug: string): Question | undefined {
  return allQuestions.find((q) => q.slug === slug);
}

export function getQuestionsByCategory(category: CategorySlug): Question[] {
  return allQuestions.filter((q) => q.category === category);
}

export function getAdjacentQuestions(slug: string) {
  const question = getQuestionBySlug(slug);
  if (!question) return { prev: undefined, next: undefined };

  const categoryQuestions = getQuestionsByCategory(question.category);
  const index = categoryQuestions.findIndex((q) => q.slug === slug);

  return {
    prev: index > 0 ? categoryQuestions[index - 1] : undefined,
    next:
      index < categoryQuestions.length - 1
        ? categoryQuestions[index + 1]
        : undefined,
  };
}

export function searchQuestions(query: string, category?: CategorySlug): Question[] {
  const normalized = query.toLowerCase().trim();
  const results = category
    ? getQuestionsByCategory(category)
    : allQuestions;

  if (!normalized) return results;

  return results.filter(
    (q) =>
      q.question.toLowerCase().includes(normalized) ||
      q.tags?.some((t) => t.toLowerCase().includes(normalized)) ||
      q.answers.hinglish.toLowerCase().includes(normalized) ||
      q.answers.english.toLowerCase().includes(normalized)
  );
}
