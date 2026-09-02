export type CategorySlug =
  | "javascript"
  | "react"
  | "typescript"
  | "performance"
  | "coding"
  | "scenario"
  | "project"
  | "behavioral";

export type Difficulty = "easy" | "medium" | "hard";

export interface QuestionExample {
  title: string;
  code?: string;
  language?: string;
  explanation: string;
}

export interface QuestionAnswers {
  hinglish: string;
  english: string;
  keyPoints?: string[];
  example?: QuestionExample;
}

export interface Question {
  id: string;
  slug: string;
  category: CategorySlug;
  question: string;
  difficulty?: Difficulty;
  tags?: string[];
  answers: QuestionAnswers;
}

export interface Category {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  questionCount: number;
}
