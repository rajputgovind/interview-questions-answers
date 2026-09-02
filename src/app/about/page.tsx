import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { author } from "@/data/author";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "About Govind Jadam",
  description: "MERN Stack Developer who built this interview prep platform for developers.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl font-bold text-white mb-6">
              GJ
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{author.name}</h1>
            <p className="text-xl text-blue-400 mb-2">{author.role}</p>
            <p className="flex items-center justify-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              {author.location}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">About Me</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{author.bio}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/30"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                {author.email}
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-400" />
              Why I Built This
            </h2>
            <p className="text-slate-400 leading-relaxed">{author.whyBuilt}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Experience</h2>
            <div className="space-y-6">
              {author.experienceList.map((exp) => (
                <div
                  key={exp.company}
                  className="border-l-2 border-blue-500/50 pl-6"
                >
                  <h3 className="font-semibold text-white">{exp.role}</h3>
                  <p className="text-blue-400 text-sm mb-1">{exp.company}</p>
                  <p className="text-slate-500 text-sm mb-3">
                    {exp.period} · {exp.location}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-slate-400 text-sm flex gap-2">
                        <span className="text-blue-400">•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {author.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl bg-white/5 p-5 border border-white/10"
                >
                  <h3 className="font-medium text-white mb-1">{project.name}</h3>
                  <p className="text-xs text-blue-400 mb-2">{project.tech}</p>
                  <p className="text-sm text-slate-400">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Skills</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(author.skills).map(([key, skills]) => (
                <div key={key}>
                  <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 capitalize">
                    {key}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-400" />
              Education
            </h2>
            <div className="space-y-4">
              {author.education.map((edu) => (
                <div key={edu.degree}>
                  <h3 className="font-medium text-white">{edu.degree}</h3>
                  <p className="text-slate-400 text-sm">
                    {edu.institution} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Start Interview Prep
          </Link>
        </div>
      </div>
    </div>
  );
}
