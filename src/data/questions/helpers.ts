import type { CategorySlug, Difficulty, Question, QuestionAnswers } from "@/types/question";

type QuestionInput = {
  category: CategorySlug;
  question: string;
  answers: QuestionAnswers;
  difficulty?: Difficulty;
  tags?: string[];
};

export function createQuestion({
  category,
  question,
  answers,
  difficulty = "medium",
  tags = [],
}: QuestionInput): Question {
  const slug = `${category}-${question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)}`;

  return {
    id: slug,
    slug,
    category,
    question,
    difficulty,
    tags,
    answers,
  };
}
