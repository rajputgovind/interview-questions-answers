import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import {
  getAllQuestions,
  getQuestionBySlug,
  getAdjacentQuestions,
} from "@/lib/questions";
import { getCategoryBySlug } from "@/data/categories";
import { AnswerTabs } from "@/components/questions/AnswerTabs";
import { DifficultyBadge } from "@/components/questions/DifficultyBadge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllQuestions().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) return { title: "Question Not Found" };
  return {
    title: question.question,
    description: question.answers.english.slice(0, 160),
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();

  const category = getCategoryBySlug(question.category);
  const { prev, next } = getAdjacentQuestions(slug);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/categories/${question.category}`}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {category?.title || question.category}
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/categories/${question.category}`}
              className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              style={{ color: category?.color || "#3b82f6" }}
            >
              {category?.title}
            </Link>
            {question.difficulty && (
              <DifficultyBadge difficulty={question.difficulty} />
            )}
            {question.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {question.question}
          </h1>
        </div>

        <AnswerTabs answers={question.answers} />

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
          {prev ? (
            <Link
              href={`/questions/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors max-w-[45%]"
            >
              <ChevronLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="truncate">{prev.question}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/questions/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors max-w-[45%] text-right"
            >
              <span className="truncate">{next.question}</span>
              <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
