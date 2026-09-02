# MERN Interview Prep Website

A modern **Next.js 15** interview preparation platform with **115+ questions** across 8 categories. Every question includes answers in **Hinglish**, **English**, and **real-world examples**.

Built by [Govind Jadam](https://linkedin.com/in/govind-jadam-11435323a) — MERN Stack Developer.

## Features

- **115 Interview Questions** — JavaScript, React, TypeScript, Performance, Coding, Scenario, Project & Behavioral
- **Trilingual Answers** — Hinglish (Roman Hindi) + English + Code Examples
- **Dark Modern UI** — Glassmorphism, animations, responsive design
- **Category-wise Navigation** — Search & filter questions
- **SEO Ready** — Open Graph, JSON-LD, static generation
- **Scalable Content** — Add questions easily via TypeScript data files

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── data/
│   ├── categories.ts       # 8 category definitions
│   ├── author.ts           # Creator profile
│   └── questions/          # Question content by category
├── lib/                    # Utilities & data helpers
└── types/                  # TypeScript interfaces
```

## Adding New Questions

Edit the relevant file in `src/data/questions/`:

```typescript
createQuestion({
  category: "react",
  question: "Your question here?",
  difficulty: "medium",
  tags: ["hooks", "state"],
  answers: {
    hinglish: "Roman Hindi explanation...",
    english: "Professional English answer...",
    keyPoints: ["Point 1", "Point 2", "Point 3"],
    example: {
      title: "Real-world Example",
      code: "// your code",
      language: "javascript",
      explanation: "How this is used in production...",
    },
  },
}),
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy — zero config needed for Next.js

## Categories

| Category | Questions |
|----------|-----------|
| JavaScript | 25 |
| React | 30 |
| TypeScript | 15 |
| Performance Optimization | 20 |
| Coding / Problem Solving | 10 |
| Scenario Based | 5 |
| Project Based | 5 |
| General / Behavioral | 5 |

## Author

**Govind Jadam** — MERN Stack Developer, Indore, India

- Email: govindjadam89@gmail.com
- LinkedIn: [linkedin.com/in/govind-jadam-11435323a](https://linkedin.com/in/govind-jadam-11435323a)
- GitHub: [github.com/rajputgovind](https://github.com/rajputgovind)

## License

Free to use for interview preparation. Built with ❤️ for the developer community.
