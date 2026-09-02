import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const projectQuestions: Question[] = [
  createQuestion({
    category: "project",
    question: "Walk me through a React project you have worked on",
    difficulty: "medium",
    tags: ["portfolio", "react", "experience"],
    answers: {
      hinglish:
        "Main Open Pedagogy App pe kaam karta hoon — Next.js aur NestJS based educator platform hai jahan teachers AI se lesson plans generate karte hain aur admin approval workflow hota hai. Frontend pe Next.js + Redux Toolkit, backend pe NestJS + MongoDB. Real-time features ke liye Swift Call App bhi banaya — Socket.io se voice matching hoti hai. Trip Planning App mein role-based access (Admin, Organizer, User) aur JWT auth implement kiya.",
      english:
        "I work on the Open Pedagogy App — a Next.js and NestJS educator platform where teachers generate AI-powered lesson plans with an admin approval workflow. Frontend uses Next.js + Redux Toolkit; backend uses NestJS + MongoDB. I also built Swift Call App for real-time voice matching with Socket.io. In Trip Planning App I implemented role-based access (Admin, Organizer, User) and JWT authentication.",
      keyPoints: [
        "Open Pedagogy: curriculum management + AI lesson plans",
        "Swift Call: real-time voice calling with Socket.io",
        "Trip Planning: multi-role trip enrollment platform",
        "Tijori: document lifecycle with RBAC and expiry reminders",
      ],
      example: {
        title: "Project overview structure",
        explanation:
          "Interview mein STAR format follow karo: Situation (problem kya tha), Task (aapki responsibility), Action (tech choices aur implementation), Result (impact/metrics). Har project 2-3 minute mein cover karo.",
      },
    },
  }),

  createQuestion({
    category: "project",
    question: "What was the most challenging part of the project?",
    difficulty: "hard",
    tags: ["portfolio", "problem-solving"],
    answers: {
      hinglish:
        "Swift Call App mein real-time voice matching sabse challenging tha — concurrent users ko queue mein manage karna, Socket.io events sync karna, aur connection drops handle karna. Open Pedagogy mein AI-generated content ka admin approval workflow complex tha — multiple states (draft, pending, approved, rejected) aur optimistic UI updates balance karna pada.",
      english:
        "In Swift Call App, real-time voice matching was the hardest part — managing concurrent users in a queue, syncing Socket.io events, and handling connection drops. In Open Pedagogy, the admin approval workflow for AI-generated content was complex — balancing multiple states (draft, pending, approved, rejected) with optimistic UI updates.",
      keyPoints: [
        "Swift Call: WebSocket reliability and matchmaking logic",
        "Open Pedagogy: multi-step approval state machine",
        "Tijori: automated expiry reminders with cron jobs",
        "Show how you debugged and iterated on the solution",
      ],
      example: {
        title: "How to frame the challenge",
        explanation:
          "Problem clearly batao, kya try kiya, kya fail hua, final solution kya tha, aur kya seekha — ye interviewers ko problem-solving ability dikhata hai.",
      },
    },
  }),

  createQuestion({
    category: "project",
    question: "How did you handle state management?",
    difficulty: "medium",
    tags: ["redux", "state", "react"],
    answers: {
      hinglish:
        "Open Pedagogy aur Trip Planning mein Redux Toolkit use kiya — server state (API data) ke liye createAsyncThunk, UI state ke liye slices. Local component state sirf form inputs aur modal open/close ke liye. Swift Call mein real-time socket state Context + useReducer se handle kiya kyunki Redux mein socket events sync karna awkward hota hai.",
      english:
        "In Open Pedagogy and Trip Planning I used Redux Toolkit — createAsyncThunk for server state and slices for UI state. Local component state only for form inputs and modal toggles. In Swift Call, real-time socket state was handled with Context + useReducer because syncing socket events in Redux is awkward.",
      keyPoints: [
        "Redux Toolkit for global/server state in larger apps",
        "Local useState for ephemeral UI (modals, inputs)",
        "Context + useReducer for real-time socket state",
        "Avoid prop drilling; colocate state when possible",
      ],
      example: {
        title: "Redux Toolkit slice example",
        language: "typescript",
        code: `const lessonSlice = createSlice({
  name: "lessons",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => { state.status = "loading"; })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      });
  },
});`,
        explanation:
          "Async thunks server data fetch karte hain; slice mein loading/success/error states centrally manage hote hain.",
      },
    },
  }),

  createQuestion({
    category: "project",
    question: "How did you optimize the performance?",
    difficulty: "medium",
    tags: ["performance", "react", "nextjs"],
    answers: {
      hinglish:
        "Next.js projects mein SSR/SSG use kiya SEO aur initial load ke liye. Images ke liye next/image, code splitting ke liye dynamic imports. React DevTools Profiler se slow components identify kiye aur React.memo lagaya. API responses cache kiye Redux mein taaki unnecessary refetch na ho. Tijori backend mein MongoDB indexes lagaye frequent queries ke liye.",
      english:
        "In Next.js projects I used SSR/SSG for SEO and fast initial load. next/image for images and dynamic imports for code splitting. Identified slow components with React DevTools Profiler and applied React.memo. Cached API responses in Redux to avoid unnecessary refetches. Added MongoDB indexes in Tijori backend for frequent queries.",
      keyPoints: [
        "Next.js SSR/SSG for faster first paint",
        "Dynamic imports and route-based code splitting",
        "React.memo + useMemo for expensive renders",
        "DB indexes and pagination for backend performance",
      ],
      example: {
        title: "Dynamic import for code splitting",
        language: "tsx",
        code: `import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
});

export default function Dashboard() {
  return <HeavyChart data={data} />;
}`,
        explanation:
          "Heavy component sirf tab load hota hai jab zarurat ho — initial bundle size kam rehta hai.",
      },
    },
  }),

  createQuestion({
    category: "project",
    question: "What libraries or tools did you use and why?",
    difficulty: "easy",
    tags: ["tools", "libraries", "stack"],
    answers: {
      hinglish:
        "Frontend: Next.js (SSR/SEO), Redux Toolkit (predictable state), Tailwind CSS (fast styling). Backend: NestJS (structured modules, DI), Express (lightweight APIs in Swift Call/Trip Planning). Database: MongoDB + Mongoose. Real-time: Socket.io (Swift Call). Deployment: Vercel (frontend), Render (backend). API testing: Postman, Swagger for docs.",
      english:
        "Frontend: Next.js (SSR/SEO), Redux Toolkit (predictable state), Tailwind CSS (fast styling). Backend: NestJS (structured modules, DI), Express (lightweight APIs in Swift Call/Trip Planning). Database: MongoDB + Mongoose. Real-time: Socket.io (Swift Call). Deployment: Vercel (frontend), Render (backend). API testing: Postman, Swagger for documentation.",
      keyPoints: [
        "Next.js — SEO, routing, API routes",
        "Redux Toolkit — less boilerplate than plain Redux",
        "NestJS — enterprise structure for Open Pedagogy/Tijori",
        "Socket.io — reliable real-time in Swift Call",
        "Vercel + Render — easy CI/CD deployment",
      ],
      example: {
        title: "Project-to-tool mapping",
        explanation:
          "Har library ke peeche reason batao: Next.js Open Pedagogy ke SEO ke liye, Socket.io Swift Call ke real-time matching ke liye, NestJS Tijori ke RBAC modules ke liye — generic list se better hai project-specific justification.",
      },
    },
  }),
];
