import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getQuestionsByCategory } from "@/lib/questions";
import { CategoryQuestionList } from "@/components/questions/CategoryQuestionList";
import type { CategorySlug } from "@/types/question";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.title} Interview Questions`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const questions = getQuestionsByCategory(slug as CategorySlug);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All Categories
        </Link>

        <div className="mb-10">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-wider mb-2"
            style={{ color: category.color }}
          >
            {category.questionCount} Questions
          </span>
          <h1 className="text-4xl font-bold text-white mb-4">{category.title}</h1>
          <p className="text-slate-400 text-lg">{category.description}</p>
        </div>

        <CategoryQuestionList category={category} questions={questions} />
      </div>
    </div>
  );
}
