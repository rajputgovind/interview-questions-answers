import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { author } from "@/data/author";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Interview Prep
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              115+ MERN & React interview questions with Hinglish + English
              answers and real-world examples.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-blue-400 transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/categories/react" className="text-slate-400 hover:text-blue-400 transition-colors">
                  React Questions
                </Link>
              </li>
              <li>
                <Link href="/categories/javascript" className="text-slate-400 hover:text-blue-400 transition-colors">
                  JavaScript Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  About Creator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${author.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {author.email}
              </a>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {year} {author.name}. Built with Next.js 15.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-400 fill-red-400" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
