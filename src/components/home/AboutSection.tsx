"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { author } from "@/data/author";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="mx-auto max-w-7xl">
        <div className="glass rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/5">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Built By
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {author.name}
              </h2>
              <p className="text-xl text-slate-300 mb-2">{author.role}</p>
              <p className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <MapPin className="h-4 w-4" />
                {author.location} · {author.experience} experience
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                {author.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Featured Projects</h3>
              {author.projects.slice(0, 3).map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl bg-white/5 p-4 border border-white/10"
                >
                  <h4 className="font-medium text-white mb-1">{project.name}</h4>
                  <p className="text-xs text-blue-400 mb-2">{project.tech}</p>
                  <p className="text-sm text-slate-400">{project.description}</p>
                </div>
              ))}
              <Link
                href="/about"
                className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View full profile →
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
