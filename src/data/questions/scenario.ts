import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const scenarioQuestions: Question[] = [
  createQuestion({
    category: "scenario",
    question: "How would you handle simultaneous requests and avoid race conditions?",
    difficulty: "hard",
    tags: ["async", "race-condition", "react"],
    answers: {
      hinglish:
        "Jab user tezi se click kare ya search kare to purani requests naye results ke saath clash kar sakti hain. AbortController se in-flight requests cancel karo, ya har request ko unique ID do aur sirf latest ID ka response state mein set karo. Loading state alag rakho taaki stale data UI mein na dikhe.",
      english:
        "When users click or search rapidly, older requests can clash with newer results. Cancel in-flight requests with AbortController, or assign each request a unique ID and only apply the response from the latest ID. Keep loading state separate so stale data never renders.",
      keyPoints: [
        "AbortController cancels outdated fetch calls",
        "Request ID / sequence counter ignores stale responses",
        "Disable submit button while request is pending",
        "Optimistic updates need rollback on failure",
      ],
      example: {
        title: "Latest-request-wins pattern",
        language: "javascript",
        code: `let requestId = 0;

async function fetchData(query, setData) {
  const currentId = ++requestId;
  const res = await fetch(\`/api?q=\${query}\`);
  const data = await res.json();

  // Ignore if a newer request was sent
  if (currentId !== requestId) return;

  setData(data);
}`,
        explanation:
          "Har nayi request ID increment hoti hai; sirf latest ID wala response state update karta hai — baaki ignore ho jate hain.",
      },
    },
  }),

  createQuestion({
    category: "scenario",
    question: "What would you do if a component is re-rendering too often?",
    difficulty: "medium",
    tags: ["react", "performance", "debugging"],
    answers: {
      hinglish:
        "Pehle React DevTools Profiler se identify karo kaun sa component aur kyun re-render ho raha hai. Common fixes: React.memo for expensive child components, useMemo/useCallback for stable references, state ko neeche shift karo jahan zarurat ho, aur context ko split karo taaki poora tree re-render na ho.",
      english:
        "First use React DevTools Profiler to identify which component re-renders and why. Common fixes: React.memo for expensive children, useMemo/useCallback for stable references, colocate state lower in the tree, and split context so the entire tree does not re-render.",
      keyPoints: [
        "Profiler shows render count and duration",
        "Unstable object/function props break memo",
        "Lift state only as high as needed",
        "Split Context by concern (theme vs user)",
      ],
      example: {
        title: "Memoize expensive child",
        language: "tsx",
        code: `const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map((item) => <Row key={item.id} item={item} />);
});

function Parent({ data }) {
  const sorted = useMemo(() => data.sort((a, b) => a.name.localeCompare(b.name)), [data]);
  const handleClick = useCallback(() => console.log("clicked"), []);

  return <ExpensiveList items={sorted} onClick={handleClick} />;
}`,
        explanation:
          "useMemo aur useCallback stable references dete hain; React.memo unnecessary child re-renders rokta hai.",
      },
    },
  }),

  createQuestion({
    category: "scenario",
    question: "How would you build a real-time notification system in React?",
    difficulty: "hard",
    tags: ["react", "websocket", "socket.io"],
    answers: {
      hinglish:
        "Backend pe WebSocket ya Socket.io setup karo. Frontend pe custom hook banao jo connect/disconnect handle kare. Notifications ko global state mein rakho — Context, Zustand ya Redux. Toast library (react-hot-toast) se UI dikhao. Reconnect logic aur unread count badge add karo.",
      english:
        "Set up WebSocket or Socket.io on the backend. Create a custom hook on the frontend to handle connect/disconnect. Store notifications in global state — Context, Zustand, or Redux. Display UI with a toast library. Add reconnect logic and an unread count badge.",
      keyPoints: [
        "Socket.io or native WebSocket for real-time push",
        "Custom useNotifications hook encapsulates logic",
        "Toast + notification panel for UX",
        "Handle reconnect, auth token, and cleanup on unmount",
      ],
      example: {
        title: "Socket.io notification hook",
        language: "tsx",
        code: `import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useNotifications(token: string) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      auth: { token },
    });

    socket.on("notification", (payload) => {
      setNotifications((prev) => [payload, ...prev]);
    });

    return () => socket.disconnect();
  }, [token]);

  return notifications;
}`,
        explanation:
          "Socket connect hota hai auth ke saath; har event notification list mein prepend hota hai; cleanup pe disconnect.",
      },
    },
  }),

  createQuestion({
    category: "scenario",
    question: "How would you build a theme switcher (light/dark) in React?",
    difficulty: "medium",
    tags: ["react", "css", "theme"],
    answers: {
      hinglish:
        "Theme state Context ya Zustand mein rakho ('light' | 'dark'). document.documentElement pe data-theme ya class toggle karo taaki CSS variables apply hon. localStorage mein preference save karo. SSR apps (Next.js) mein flash avoid karne ke liye inline script se pehle theme set karo.",
      english:
        "Store theme state in Context or Zustand ('light' | 'dark'). Toggle data-theme or a class on document.documentElement so CSS variables apply. Persist preference in localStorage. In SSR apps (Next.js), set theme early with an inline script to avoid flash.",
      keyPoints: [
        "CSS variables for colors (--bg, --text)",
        "data-theme attribute on html element",
        "localStorage persistence",
        "Prevent flash of wrong theme in SSR",
      ],
      example: {
        title: "Theme context with CSS variables",
        language: "tsx",
        code: `const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
        explanation:
          "Theme html element pe set hoti hai; CSS variables se poori app ka look change hota hai; preference localStorage mein save rehti hai.",
      },
    },
  }),

  createQuestion({
    category: "scenario",
    question: "How would you handle session timeout in a React application?",
    difficulty: "medium",
    tags: ["auth", "security", "react"],
    answers: {
      hinglish:
        "JWT expiry track karo — decode karke exp time dekho ya backend se refresh token flow use karo. User activity (mouse, keyboard) pe idle timer reset karo. Timeout pe logout karo, token clear karo, aur login page pe redirect karo with message. Warning modal 2 minute pehle dikha sakte ho.",
      english:
        "Track JWT expiry — decode the exp claim or use a refresh token flow from the backend. Reset an idle timer on user activity (mouse, keyboard). On timeout, logout, clear tokens, and redirect to login with a message. Optionally show a warning modal two minutes before expiry.",
      keyPoints: [
        "Idle timer resets on user activity events",
        "Refresh token before access token expires",
        "Clear tokens from memory and httpOnly cookies",
        "Warning modal before forced logout improves UX",
      ],
      example: {
        title: "Idle timeout with activity listener",
        language: "tsx",
        code: `const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes

function useIdleTimeout(onTimeout: () => void) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(onTimeout, IDLE_LIMIT);
    };

    const events = ["mousemove", "keydown", "click"];
    events.forEach((e) => window.addEventListener(e, reset));
    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [onTimeout]);
}

// Usage: logout and redirect when idle
useIdleTimeout(() => {
  logout();
  router.push("/login?reason=session-expired");
});`,
        explanation:
          "User activity pe timer reset hota hai; 15 minute idle rehne pe logout aur redirect trigger hota hai.",
      },
    },
  }),
];
