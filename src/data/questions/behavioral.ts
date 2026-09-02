import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const behavioralQuestions: Question[] = [
  createQuestion({
    category: "behavioral",
    question: "Tell me about yourself",
    difficulty: "easy",
    tags: ["introduction", "behavioral"],
    answers: {
      hinglish:
        "Short intro do: 'Main Govind Jadam hoon, Indore se MERN Stack Developer hoon, 3.5+ saal ka experience hai.' Current role (VKAPS IT Solution) mention karo, key projects (Open Pedagogy, Swift Call) briefly batao, aur end mein bolo aap is role mein kya contribute kar sakte ho. 1-2 minute se zyada mat bolo.",
      english:
        "Give a short intro: 'I'm Govind Jadam, a MERN Stack Developer from Indore with 3.5+ years of experience.' Mention your current role (VKAPS IT Solution), briefly cover key projects (Open Pedagogy, Swift Call), and end with what you can contribute in this role. Keep it under 1–2 minutes.",
      keyPoints: [
        "Present → Past → Future structure",
        "Mention MERN stack and years of experience",
        "Highlight 1-2 strongest projects",
        "End with why this company/role excites you",
      ],
      example: {
        title: "Sample 90-second intro",
        explanation:
          "'I'm Govind, a MERN developer with 3.5 years building production apps. Currently at VKAPS, I work on Open Pedagogy — a Next.js platform for educators — and previously built Swift Call, a real-time voice app with Socket.io. I'm strong in React, Node.js, and REST APIs, and I'm looking for a role where I can grow into full-stack ownership.'",
      },
    },
  }),

  createQuestion({
    category: "behavioral",
    question: "What are your strengths and weaknesses?",
    difficulty: "medium",
    tags: ["self-awareness", "behavioral"],
    answers: {
      hinglish:
        "Strengths: React/Next.js mein strong, real-time apps (Socket.io) ka experience, team collaboration, API integration. Weakness honestly batao par improvement dikhayo — jaise 'Pehle TypeScript avoid karta tha, ab actively projects mein use kar raha hoon' ya 'Kabhi-kabhi feature complete karne mein jaldi ho jata hoon, ab code review se pehle self-review karta hoon.'",
      english:
        "Strengths: strong in React/Next.js, experience with real-time apps (Socket.io), team collaboration, API integration. State a weakness honestly but show improvement — e.g. 'I used to avoid TypeScript, now I actively use it in projects' or 'I sometimes rush to finish features, so now I self-review before code review.'",
      keyPoints: [
        "Strengths should match the job description",
        "Weakness should be real but not a deal-breaker",
        "Always show what you're doing to improve",
        "Avoid clichés like 'I'm a perfectionist'",
      ],
      example: {
        title: "Strength + weakness pairing",
        explanation:
          "Strength: 'I'm good at breaking down complex features into deliverable tasks — helped ship Trip Planning's role-based system on time.' Weakness: 'Public speaking was weak, so I started presenting sprint demos to the team — much better now.'",
      },
    },
  }),

  createQuestion({
    category: "behavioral",
    question: "Why do you want to switch?",
    difficulty: "medium",
    tags: ["motivation", "career"],
    answers: {
      hinglish:
        "Positive framing use karo — current job ko blame mat karo. Bolo aap growth, new challenges, ya better tech stack dhundh rahe ho. Example: 'Maine solid MERN foundation build kiya hai, ab larger scale products ya mentorship chahta hoon' ya 'Ye company ka product domain (fintech/edtech) mujhe excite karta hai.' Paisa sole reason mat banao.",
      english:
        "Use positive framing — don't blame your current job. Say you're looking for growth, new challenges, or a better tech stack. Example: 'I've built a solid MERN foundation and now want larger-scale products or mentorship' or 'This company's product domain excites me.' Don't make money the sole reason.",
      keyPoints: [
        "Focus on growth, learning, and impact",
        "Never badmouth current employer",
        "Connect your skills to what the new role offers",
        "Show you've researched the company",
      ],
      example: {
        title: "Sample answer",
        explanation:
          "'I've learned a lot at VKAPS building production MERN apps, but I'm ready for a product-focused team where I can own features end-to-end and work with a larger engineering team. Your company's work in [domain] aligns with projects like Open Pedagogy that I genuinely enjoy building.'",
      },
    },
  }),

  createQuestion({
    category: "behavioral",
    question: "Where do you see yourself in 5 years?",
    difficulty: "easy",
    tags: ["career-goals", "behavioral"],
    answers: {
      hinglish:
        "Realistic aur company ke saath aligned answer do. Example: '5 saal mein senior full-stack developer ya tech lead banana chahta hoon — mentoring juniors, architecture decisions mein involve hona, aur MERN se thoda aage cloud/DevOps mein grow karna.' CEO banne ka unrealistic answer mat do.",
      english:
        "Give a realistic answer aligned with the company. Example: 'In 5 years I want to be a senior full-stack developer or tech lead — mentoring juniors, involved in architecture decisions, and growing beyond MERN into cloud/DevOps.' Avoid unrealistic answers like 'I'll be CEO.'",
      keyPoints: [
        "Senior IC or tech lead is a safe target",
        "Show commitment to continuous learning",
        "Align with company's growth path",
        "Mention mentoring and ownership goals",
      ],
      example: {
        title: "Sample 5-year vision",
        explanation:
          "'In 5 years I see myself as a senior developer who owns major features, mentors 2-3 juniors, and contributes to system design. I want to deepen my skills in TypeScript, cloud deployment, and maybe lead a small squad on a product like the platforms I've built.'",
      },
    },
  }),

  createQuestion({
    category: "behavioral",
    question: "Do you have any questions for us?",
    difficulty: "easy",
    tags: ["interview-tips", "behavioral"],
    answers: {
      hinglish:
        "Hamesha 2-3 questions poocho — 'No' mat bolo. Achhe questions: team structure kya hai, onboarding process, day-to-day tech challenges, code review culture, growth opportunities. Company ke product ke baare mein specific question poocho taaki research dikhe.",
      english:
        "Always ask 2–3 questions — never say 'No.' Good questions: team structure, onboarding process, day-to-day tech challenges, code review culture, growth opportunities. Ask something specific about the company's product to show you've done research.",
      keyPoints: [
        "Ask about team, tech stack, and workflow",
        "Show genuine interest in the product",
        "Avoid salary/benefits in first round",
        "Prepare 3 questions; ask 2 based on time",
      ],
      example: {
        title: "Questions to ask",
        explanation:
          "1) 'What does a typical sprint look like for the frontend team?' 2) 'What's the biggest technical challenge the team is solving right now?' 3) 'How do you support learning and growth for mid-level developers?'",
      },
    },
  }),
];
