import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const reactQuestions: Question[] = [
  createQuestion({
    category: "react",
    question: "What is React?",
    difficulty: "easy",
    tags: ["react", "fundamentals", "library"],
    answers: {
      hinglish:
        "React ek JavaScript library hai jo user interfaces banane ke liye use hoti hai, especially single-page applications ke liye. Ye components par based hai — UI ko chhote reusable pieces mein tod deta hai. React DOM ko efficiently update karta hai aur developer ko declarative syntax deta hai jahan aap batate ho UI kaisa dikhna chahiye, React decide karta hai kaise update karna hai.",
      english:
        "React is an open-source JavaScript library for building user interfaces, maintained by Meta. It follows a component-based architecture where UIs are broken into reusable, composable pieces. React uses a declarative programming model — you describe what the UI should look like for a given state, and React handles updating the DOM efficiently. It focuses on the view layer and pairs with libraries like React Router for routing, Redux or Context for state management, and various tools for data fetching.",
      keyPoints: [
        "Component-based UI library, not a full framework",
        "Declarative: describe UI as a function of state",
        "Uses Virtual DOM for efficient updates",
        "Unidirectional data flow from parent to child via props",
      ],
      example: {
        title: "Open Pedagogy App — Course Card Component",
        code: `function CourseCard({ title, instructor, enrolled }) {
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>By {instructor}</p>
      {enrolled ? <span>Enrolled</span> : <button>Enroll</button>}
    </div>
  );
}`,
        language: "tsx",
        explanation:
          "In the Open Pedagogy App, each course on the dashboard is a reusable CourseCard component. Props like title and enrolled drive what renders — declarative UI that React keeps in sync when enrollment state changes.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How does React work?",
    difficulty: "easy",
    tags: ["react", "fundamentals", "rendering"],
    answers: {
      hinglish:
        "React kaam karta hai components ko render karke aur jab state ya props change hote hain to sirf affected parts ko update karke. Pehle aap JSX likhte ho jo describe karta hai UI kaisa dikhna chahiye. React is JSX ko JavaScript mein convert karta hai, Virtual DOM tree banata hai, purani aur nayi tree compare karta hai (diffing), aur phir minimum DOM changes apply karta hai. Ye cycle har re-render par repeat hota hai.",
      english:
        "React works by rendering components into a tree structure and re-rendering when state or props change. You write JSX describing the UI; Babel compiles it to React.createElement calls. On each render, React builds a Virtual DOM representation, compares it with the previous tree (reconciliation), and computes the minimal set of DOM mutations. The render phase is pure — it produces a description of UI — while the commit phase applies changes to the real DOM. Hooks and lifecycle methods let you run side effects after rendering.",
      keyPoints: [
        "Render phase produces a Virtual DOM tree",
        "Reconciliation diffs old vs new tree",
        "Commit phase applies minimal DOM updates",
        "State/prop changes trigger re-renders down the tree",
      ],
      example: {
        title: "Swift Call App — Call Status Updates",
        code: `function CallScreen({ callStatus }) {
  // React re-renders when callStatus changes:
  // "ringing" → "connected" → "ended"
  return (
    <div>
      <Avatar />
      <p>{callStatus === "connected" ? "On call" : "Calling..."}</p>
    </div>
  );
}`,
        language: "tsx",
        explanation:
          "In Swift Call App, when callStatus changes from 'ringing' to 'connected', React re-renders CallScreen, diffs the Virtual DOM, and updates only the text node — not the entire page.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "Explain Virtual DOM in React.",
    difficulty: "medium",
    tags: ["react", "virtual-dom", "performance"],
    answers: {
      hinglish:
        "Virtual DOM ek lightweight JavaScript representation hai real DOM ka. React pehle changes Virtual DOM mein karta hai, phir purani aur nayi Virtual DOM trees ko compare karke sirf wahi changes real DOM mein apply karta hai jo zaroori hain. Isse direct DOM manipulation se zyada efficient updates milte hain, kyunki DOM operations expensive hote hain.",
      english:
        "The Virtual DOM is an in-memory JavaScript object tree that mirrors the real DOM structure. When state changes, React builds a new Virtual DOM tree and compares it with the previous one through a diffing algorithm. Only the differences (patches) are applied to the actual DOM, batching updates for performance. This avoids expensive full-page repaints and gives React a predictable, optimized update path regardless of how complex your component tree is.",
      keyPoints: [
        "Lightweight JS copy of the real DOM",
        "Diffing finds minimal changes between renders",
        "Batches DOM updates for better performance",
        "Abstraction layer — you rarely touch the real DOM directly",
      ],
      example: {
        title: "Trip Planning App — Itinerary List",
        code: `function ItineraryList({ days }) {
  return (
    <ul>
      {days.map((day) => (
        <li key={day.id}>{day.title} — {day.activities.length} activities</li>
      ))}
    </ul>
  );
}`,
        language: "tsx",
        explanation:
          "When one day is added in Trip Planning App, React diffs the Virtual DOM list and inserts a single new <li> instead of rebuilding the entire itinerary DOM subtree.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How does React decide which components to re-render?",
    difficulty: "medium",
    tags: ["react", "rendering", "reconciliation"],
    answers: {
      hinglish:
        "React default mein parent ke re-render par saare child components ko bhi re-render karta hai, chahe unke props same hon. Lekin agar component ka state ya props change hue hain to definitely re-render hoga. React.memo, PureComponent, aur shouldComponentUpdate se aap batate ho ki props same hon to skip karo. Context value change hone par subscribed components re-render hote hain.",
      english:
        "By default, when a component re-renders, React re-renders all of its children recursively — even if their props haven't changed. A component re-renders when its own state changes, its parent passes new props (by reference equality), or a Context it consumes updates. React does not re-render siblings or unrelated branches. Optimizations like React.memo wrap components to skip re-rendering when props are shallowly equal. Fiber enables React to pause, prioritize, and interrupt renders.",
      keyPoints: [
        "Default: parent re-render triggers child re-renders",
        "State change, new props, or Context update cause re-renders",
        "React.memo and PureComponent can skip unnecessary renders",
        "Re-rendering ≠ DOM update — reconciliation may find no changes",
      ],
      example: {
        title: "Open Pedagogy App — Lesson Sidebar",
        code: `const LessonItem = React.memo(function LessonItem({ title, completed }) {
  return <li className={completed ? "done" : ""}>{title}</li>;
});

function LessonSidebar({ lessons, activeModule }) {
  return lessons.map((l) => <LessonItem key={l.id} title={l.title} completed={l.done} />);
}`,
        language: "tsx",
        explanation:
          "When activeModule changes in Open Pedagogy App, LessonSidebar re-renders but React.memo prevents LessonItem from re-rendering if its title and completed props are unchanged.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is React Fiber? Why was it introduced?",
    difficulty: "hard",
    tags: ["react", "fiber", "architecture"],
    answers: {
      hinglish:
        "React Fiber React ka naya reconciliation engine hai jo React 16 mein aaya. Purana stack reconciler synchronous tha — ek baar render shuru hua to poora khatam hona padta tha, jisse UI freeze ho sakta tha. Fiber rendering ko chhote units (fibers) mein tod deta hai, priority-based scheduling allow karta hai, aur rendering ko pause/resume kar sakta hai. Isse Concurrent Mode, Suspense, aur better UX possible hua.",
      english:
        "React Fiber is the reconciliation engine introduced in React 16, replacing the old stack-based reconciler. Each unit of work is a 'fiber' — a JS object representing a component instance with links to its parent, child, and sibling. Fiber enables incremental rendering: work can be split, paused, aborted, and prioritized. High-priority updates (user input) can interrupt low-priority work (data fetching). This foundation powers Concurrent React features like Suspense, transitions (useTransition), and smoother animations without blocking the main thread.",
      keyPoints: [
        "Replaces synchronous stack reconciler with linked fiber nodes",
        "Enables incremental, interruptible rendering",
        "Priority-based scheduling for responsive UI",
        "Foundation for Concurrent React, Suspense, and transitions",
      ],
      example: {
        title: "Swift Call App — Priority During Active Call",
        code: `function CallControls() {
  const [isMuted, setIsMuted] = useState(false);
  const [callHistory, setCallHistory] = useState([]);

  // Mute toggle = urgent update (user interaction)
  // History fetch = lower priority, can be deferred
  return (
    <>
      <button onClick={() => setIsMuted(!isMuted)}>Mute</button>
      <CallHistoryList history={callHistory} />
    </>
  );
}`,
        language: "tsx",
        explanation:
          "Fiber lets Swift Call App prioritize the mute button click instantly while deferring a heavy call history re-render, keeping the call UI responsive.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the difference between functional and class components?",
    difficulty: "easy",
    tags: ["react", "components", "hooks"],
    answers: {
      hinglish:
        "Class components ES6 classes hote hain jo React.Component extend karte hain — state this.state se manage hota hai, lifecycle methods jaise componentDidMount use hote hain. Functional components simple functions hain jo props lete hain aur JSX return karte hain — state aur lifecycle ke liye hooks (useState, useEffect) use karte hain. Aaj industry mein functional components standard hain kyunki code chhota, readable aur hooks se logic reuse easy hai.",
      english:
        "Class components are ES6 classes extending React.Component with state in this.state and lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount). Functional components are plain functions returning JSX; since React 16.8, hooks provide state (useState) and lifecycle equivalents (useEffect). Functional components produce less boilerplate, avoid 'this' binding issues, and work better with custom hooks for logic reuse. React team recommends functional components for all new code.",
      keyPoints: [
        "Class: this.state + lifecycle methods; Functional: hooks",
        "Functional components are the modern standard",
        "Hooks enable logic reuse via custom hooks in functions only",
        "Both produce the same output — syntax and patterns differ",
      ],
      example: {
        title: "Trip Planning App — Budget Tracker",
        code: `// Modern functional approach (preferred)
function BudgetTracker({ tripId }) {
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    fetchBudget(tripId).then(setSpent);
  }, [tripId]);

  return <p>Spent: {spent}</p>;
}`,
        language: "tsx",
        explanation:
          "Trip Planning App uses functional components with useState and useEffect for budget tracking — cleaner than equivalent class component with constructor, setState, and componentDidMount.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What are React hooks?",
    difficulty: "easy",
    tags: ["react", "hooks", "fundamentals"],
    answers: {
      hinglish:
        "Hooks special functions hain jo aap functional components ke andar call karte ho — useState, useEffect, useContext, useRef wagairah. Ye state, lifecycle, context aur refs ko functional components mein use karne dete hain bina class likhe. Rules: hooks sirf top level par call karo (loops/conditions mein nahi), aur sirf React functions ke andar.",
      english:
        "Hooks are functions that let functional components use React features previously only available in classes — state, side effects, context, refs, and more. Built-in hooks include useState, useEffect, useContext, useReducer, useRef, useMemo, and useCallback. Custom hooks extract reusable stateful logic. Rules of Hooks: call hooks only at the top level (not inside loops/conditions) and only from React function components or custom hooks.",
      keyPoints: [
        "Enable state and lifecycle in functional components",
        "Must follow Rules of Hooks (top-level calls only)",
        "Custom hooks share logic between components",
        "Each hook serves a specific purpose — no single 'do everything' hook",
      ],
      example: {
        title: "Open Pedagogy App — useEnrollment Hook",
        code: `function useEnrollment(courseId) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkEnrollment(courseId).then((status) => {
      setEnrolled(status);
      setLoading(false);
    });
  }, [courseId]);

  return { enrolled, loading, enroll: () => setEnrolled(true) };
}`,
        language: "tsx",
        explanation:
          "Open Pedagogy App wraps enrollment logic in a custom hook reused across CourseCard, CourseDetail, and Dashboard — DRY and testable.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "Explain useState with an example.",
    difficulty: "easy",
    tags: ["react", "hooks", "useState"],
    answers: {
      hinglish:
        "useState ek hook hai jo functional component mein state add karta hai. Ye [value, setter] array return karta hai. Initial value pass karte ho, setter se state update karte ho — update par component re-render hota hai. Functional update bhi de sakte ho: setCount(prev => prev + 1) jab nayi value purani state par depend karti ho.",
      english:
        "useState adds local state to a functional component. It returns a tuple: the current state value and a setter function. Calling the setter schedules a re-render with the new state. You can pass an initial value or a lazy initializer function for expensive computations. Use functional updates setState(prev => prev + 1) when the new state depends on the previous state to avoid stale closure bugs.",
      keyPoints: [
        "Returns [state, setState] tuple",
        "Setter triggers re-render with new state",
        "Use functional updates when next state depends on previous",
        "Each useState call is independent isolated state",
      ],
      example: {
        title: "Swift Call App — Mute Toggle",
        code: `function MuteButton() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <button
      aria-pressed={isMuted}
      onClick={() => setIsMuted((prev) => !prev)}
    >
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App's mute button uses useState to track isMuted. Clicking toggles state, re-renders the button label, and syncs with the WebRTC audio track.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the difference between useEffect and useLayoutEffect?",
    difficulty: "medium",
    tags: ["react", "hooks", "useEffect", "useLayoutEffect"],
    answers: {
      hinglish:
        "Dono side effects ke liye hain, lekin timing alag hai. useEffect browser paint ke BAAD async run hota hai — zyada tar side effects (API calls, subscriptions) ke liye. useLayoutEffect paint se PEHLE synchronously run hota hai — jab DOM measurements ya layout changes chahiye bina flicker ke. useLayoutEffect blocking hai, isliye sirf zaroorat par use karo.",
      english:
        "Both run after render but at different times. useEffect fires asynchronously after the browser paints — ideal for data fetching, subscriptions, and non-visual side effects. useLayoutEffect fires synchronously after DOM mutations but before the browser paints — use it when you need to measure DOM elements or make layout changes without visible flicker. Because useLayoutEffect blocks painting, prefer useEffect unless you need synchronous DOM access.",
      keyPoints: [
        "useEffect: after paint, non-blocking, async",
        "useLayoutEffect: before paint, synchronous, blocking",
        "Use useLayoutEffect for DOM measurements and layout fixes",
        "Default to useEffect; useLayoutEffect only when flicker occurs",
      ],
      example: {
        title: "Trip Planning App — Map Tooltip Position",
        code: `function MapPin({ location }) {
  const ref = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setTooltipStyle({ top: rect.top - 40, left: rect.left });
  }, [location]);

  return (
    <>
      <div ref={ref} className="pin" />
      <Tooltip style={tooltipStyle}>{location.name}</Tooltip>
    </>
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App uses useLayoutEffect to measure pin position and place the tooltip before paint — preventing a visible jump that useEffect would cause.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "When do you use useMemo and useCallback?",
    difficulty: "medium",
    tags: ["react", "hooks", "useMemo", "useCallback"],
    answers: {
      hinglish:
        "useMemo expensive calculation ka result cache karta hai — dependency change hone par hi dubara calculate hota hai. useCallback function reference cache karta hai taaki child ko har render par naya function na mile. Dono premature optimization nahi hain — tab use karo jab measured performance problem ho, ya jab memoized child ko stable reference chahiye.",
      english:
        "useMemo memoizes a computed value, recalculating only when dependencies change — useful for expensive filters, sorts, or derived data. useCallback memoizes a function reference, preventing child components wrapped in React.memo from re-rendering due to new function props each render. Use them when profiling shows a bottleneck or when passing callbacks/values to optimized children. Avoid blanket use — memoization itself has overhead.",
      keyPoints: [
        "useMemo caches values; useCallback caches function references",
        "Both accept dependency arrays like useEffect",
        "Use when profiling shows unnecessary recalculation or re-renders",
        "Don't overuse — adds complexity and memory overhead",
      ],
      example: {
        title: "Open Pedagogy App — Filtered Course List",
        code: `function CourseCatalog({ courses, searchTerm }) {
  const filtered = useMemo(
    () => courses.filter((c) => c.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [courses, searchTerm]
  );

  const handleEnroll = useCallback((id) => enrollCourse(id), []);

  return filtered.map((c) => (
    <MemoizedCourseCard key={c.id} course={c} onEnroll={handleEnroll} />
  ));
}`,
        language: "tsx",
        explanation:
          "Open Pedagogy App memoizes filtered courses so sorting 500+ courses doesn't rerun on unrelated state changes, and useCallback keeps MemoizedCourseCard stable.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the dependency array in useEffect?",
    difficulty: "easy",
    tags: ["react", "hooks", "useEffect"],
    answers: {
      hinglish:
        "Dependency array useEffect ka second argument hai jo batata hai effect kab dubara run ho. Empty array [] = sirf mount par ek baar. [userId] = jab userId change ho. No array = har render ke baad. Galat dependencies se stale data ya infinite loops ho sakte hain — ESLint exhaustive-deps rule follow karo.",
      english:
        "The dependency array is the second argument to useEffect controlling when the effect re-runs. Omitting it runs the effect after every render. An empty array [] runs once on mount (and cleanup on unmount). Listing values [userId, filter] re-runs when any dependency changes by reference or value. Incorrect dependencies cause stale closures, missed updates, or infinite loops. Follow the exhaustive-deps ESLint rule and include all reactive values used inside the effect.",
      keyPoints: [
        "Controls when useEffect re-executes",
        "[] = mount only; no array = every render; [deps] = on change",
        "Missing deps cause stale closure bugs",
        "Cleanup function runs before re-run and on unmount",
      ],
      example: {
        title: "Swift Call App — Fetch Contact on ID Change",
        code: `function ContactProfile({ contactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchContact(contactId).then((data) => {
      if (!cancelled) setContact(data);
    });
    return () => { cancelled = true; };
  }, [contactId]); // re-fetch when contactId changes

  return contact ? <Profile data={contact} /> : <Spinner />;
}`,
        language: "tsx",
        explanation:
          "Swift Call App re-fetches contact details when contactId changes. The cleanup prevents setting state on an unmounted component if the user navigates quickly.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do you prevent unnecessary re-renders in React?",
    difficulty: "medium",
    tags: ["react", "performance", "optimization"],
    answers: {
      hinglish:
        "Unnecessary re-renders rokne ke liye: React.memo se component memoize karo, useMemo/useCallback se stable props do, state ko jahan zaroori ho wahan rakho (locally), Context ko split karo, lists mein proper keys use karo, aur expensive children ko alag memoized component mein rakho. Pehle React DevTools Profiler se measure karo, phir optimize karo.",
      english:
        "Strategies include: React.memo to skip re-renders when props are unchanged; useMemo and useCallback for stable references; colocate state so changes don't bubble unnecessarily; split Context to avoid broad re-renders; virtualize long lists; lazy load heavy routes; and avoid creating new objects/arrays inline in JSX props. Always profile with React DevTools first — optimize only proven bottlenecks, not every component.",
      keyPoints: [
        "React.memo + stable props via useCallback/useMemo",
        "Colocate state close to where it's used",
        "Split Context providers to narrow re-render scope",
        "Profile first, optimize second — avoid premature optimization",
      ],
      example: {
        title: "Trip Planning App — Day Planner Optimization",
        code: `const ActivityRow = React.memo(({ activity, onEdit }) => (
  <div>{activity.name} <button onClick={() => onEdit(activity.id)}>Edit</button></div>
));

function DayPlanner({ dayId, activities }) {
  const [selectedId, setSelectedId] = useState(null);
  const handleEdit = useCallback((id) => setSelectedId(id), []);

  return activities.map((a) => (
    <ActivityRow key={a.id} activity={a} onEdit={handleEdit} />
  ));
}`,
        language: "tsx",
        explanation:
          "In Trip Planning App, only the edited activity row needs attention — React.memo and useCallback prevent all 20+ activity rows from re-rendering when selectedId changes.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is React.memo? When would you use it?",
    difficulty: "medium",
    tags: ["react", "performance", "React.memo"],
    answers: {
      hinglish:
        "React.memo ek higher-order component hai jo aapke component ko wrap karke props shallow compare karta hai — agar props same hain to re-render skip. Tab use karo jab component expensive ho ya frequently same props ke saath render ho. Custom comparison function bhi pass kar sakte ho. Har component par mat lagao — sirf jahan profiling se benefit dikhe.",
      english:
        "React.memo is a higher-order component that memoizes a functional component, performing a shallow comparison of props by default. If props haven't changed, React skips re-rendering that component. Use it for expensive pure components that receive stable props, especially in large lists. You can pass a custom arePropsEqual function for deep comparisons. Don't wrap every component — memoization adds comparison overhead and only helps when re-renders are frequent and props often unchanged.",
      keyPoints: [
        "Shallow prop comparison to skip re-renders",
        "Best for expensive pure components in lists",
        "Pair with useCallback/useMemo for stable prop references",
        "Optional custom comparison function for complex props",
      ],
      example: {
        title: "Open Pedagogy App — Video Lecture Player",
        code: `const VideoPlayer = React.memo(function VideoPlayer({ src, onProgress }) {
  // Expensive: initializes HLS stream
  useEffect(() => { initHLS(src); }, [src]);
  return <video src={src} onTimeUpdate={onProgress} />;
});`,
        language: "tsx",
        explanation:
          "Open Pedagogy App wraps VideoPlayer in React.memo so scrolling the lesson sidebar doesn't re-initialize the HLS stream when unrelated parent state changes.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What are React keys? Why are they important?",
    difficulty: "easy",
    tags: ["react", "lists", "keys"],
    answers: {
      hinglish:
        "Keys React ko batate hain list items mein kaunsa element kaunsa hai across re-renders. Unique stable key se React efficiently identify karta hai kya add, remove ya reorder hua. Index as key tab theek hai jab list static ho — reorder/delete ke saath bugs aate hain (wrong state, input values mix). Unique ID best practice hai.",
      english:
        "Keys are special string attributes on list elements helping React identify which items changed, were added, or removed during reconciliation. They must be stable, unique among siblings, and predictable — typically database IDs. Using array index as key breaks when items are reordered, inserted, or deleted: component state and DOM focus can attach to the wrong item. Keys are not passed as props to the component.",
      keyPoints: [
        "Help React track identity across re-renders",
        "Must be stable, unique among siblings — prefer IDs over index",
        "Index keys cause bugs with reorder/delete/filter operations",
        "Keys are not accessible as props inside the component",
      ],
      example: {
        title: "Swift Call App — Call History List",
        code: `function CallHistory({ calls }) {
  return (
    <ul>
      {calls.map((call) => (
        <li key={call.id}>
          {call.contactName} — {call.duration}s
        </li>
      ))}
    </ul>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App uses call.id as key so deleting a call from the middle correctly removes its DOM node without shifting state to the wrong row.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "Explain the reconciliation algorithm in React.",
    difficulty: "hard",
    tags: ["react", "reconciliation", "fiber"],
    answers: {
      hinglish:
        "Reconciliation wo process hai jisme React purani aur nayi Virtual DOM trees compare karta hai aur minimum changes real DOM mein apply karta hai. Same type ka element update hota hai (props diff), different type par purana subtree destroy karke naya banata hai. Lists mein keys se elements match hote hain. Fiber is process ko incremental aur interruptible banata hai.",
      english:
        "Reconciliation is React's diffing algorithm comparing the new element tree with the previous one. Rules: different element types tear down the old subtree and build new; same type updates props in place; list children are matched by key. React assumes cross-level moves are rare and handles them via keys. The algorithm is O(n) heuristic, not optimal O(n³) tree diff. Fiber implements reconciliation as a linked list of work units that can be paused and resumed.",
      keyPoints: [
        "Diffs Virtual DOM trees to find minimal DOM updates",
        "Same type → update props; different type → replace subtree",
        "Keys enable efficient list reordering",
        "Fiber makes reconciliation incremental and interruptible",
      ],
      example: {
        title: "Trip Planning App — Switching Day Tabs",
        code: `function TripView({ activeDay, days }) {
  const day = days.find((d) => d.id === activeDay);
  // Same TripDayPanel type, different props → update in place
  return <TripDayPanel key={day.id} day={day} />;
}`,
        language: "tsx",
        explanation:
          "When switching days in Trip Planning App, reconciliation sees the same component type with new props and updates efficiently instead of destroying the entire panel subtree.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What are controlled and uncontrolled components?",
    difficulty: "medium",
    tags: ["react", "forms", "controlled"],
    answers: {
      hinglish:
        "Controlled component mein form data React state se control hota hai — value={state} aur onChange se update. React single source of truth hai. Uncontrolled mein DOM apna state rakhta hai — ref se value access karte ho, defaultValue use karte ho. Controlled zyada predictable hain validation aur dynamic UI ke liye; uncontrolled simple forms ya third-party libraries ke liye.",
      english:
        "Controlled components have form values driven by React state — input value={state} with onChange updating state. React is the single source of truth, enabling instant validation and conditional rendering. Uncontrolled components store values in the DOM; you read them via refs (ref.current.value) and set defaults with defaultValue/defaultChecked. Controlled is preferred for most React forms; uncontrolled suits simple cases, file inputs, or integrating non-React widgets.",
      keyPoints: [
        "Controlled: React state owns the value via value + onChange",
        "Uncontrolled: DOM owns the value; access via refs",
        "Controlled enables real-time validation and dynamic UI",
        "File inputs are typically uncontrolled",
      ],
      example: {
        title: "Open Pedagogy App — Assignment Submission Form",
        code: `function SubmissionForm() {
  const [answer, setAnswer] = useState("");

  return (
    <textarea
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Write your answer..."
    />
  );
}`,
        language: "tsx",
        explanation:
          "Open Pedagogy App uses a controlled textarea so word count, submit button disabled state, and auto-save all react instantly to answer state changes.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do you handle forms in React?",
    difficulty: "medium",
    tags: ["react", "forms", "validation"],
    answers: {
      hinglish:
        "Forms handle karne ke do main tareeke: controlled components (har field ka state + onChange) ya form libraries jaise React Hook Form / Formik jo boilerplate kam karte hain. Validation client-side (required, pattern, custom rules) aur server-side dono karo. handleSubmit mein preventDefault() zaroori hai. Error messages field-level ya form-level dikhao.",
      english:
        "Handle forms with controlled components (useState per field or a single form object), or form libraries like React Hook Form or Formik for less boilerplate and better performance (uncontrolled with refs internally). Always call e.preventDefault() in onSubmit. Implement client-side validation for UX and server-side for security. Display field-level errors, disable submit while loading, and reset form state after successful submission.",
      keyPoints: [
        "Controlled components or form libraries (React Hook Form, Formik)",
        "preventDefault on submit; validate client + server side",
        "Show field-level errors and loading/disabled submit state",
        "Reset or redirect after successful submission",
      ],
      example: {
        title: "Trip Planning App — Add Destination Form",
        code: `function AddDestinationForm({ onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError("Destination required");
    onAdd({ name: name.trim() });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Add</button>
    </form>
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App's add destination form uses controlled state, client validation, and preventDefault for a smooth inline UX without page reload.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is lifted state up?",
    difficulty: "easy",
    tags: ["react", "state", "lifting-state"],
    answers: {
      hinglish:
        "Lifting state up ka matlab hai shared state ko common ancestor component mein move karna jab do ya zyada sibling components ko same data chahiye. State parent mein rehta hai, props se children ko pass hota hai, aur callbacks se updates wapas parent ko jate hain. Isse single source of truth maintain hota hai.",
      english:
        "Lifting state up moves shared state to the closest common ancestor when multiple components need the same data or must stay synchronized. The parent owns the state and passes it down as props along with callback functions for updates. This maintains a single source of truth and follows React's unidirectional data flow. Use it for sibling communication before reaching for Context or external state libraries.",
      keyPoints: [
        "Move shared state to the nearest common parent",
        "Parent passes state down and callbacks up",
        "Single source of truth for synchronized siblings",
        "Preferred over syncing duplicate local state",
      ],
      example: {
        title: "Swift Call App — Volume Controls",
        code: `function CallScreen() {
  const [volume, setVolume] = useState(50);

  return (
    <>
      <VolumeSlider value={volume} onChange={setVolume} />
      <VolumeIndicator level={volume} />
    </>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App lifts volume state to CallScreen so the slider and indicator always show the same level — siblings can't get out of sync.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is prop drilling? How do you avoid it?",
    difficulty: "medium",
    tags: ["react", "props", "context"],
    answers: {
      hinglish:
        "Prop drilling tab hota hai jab aap props ko intermediate components se sirf pass karne ke liye bhejte ho jo unhe khud use nahi karte. Ye boilerplate badhata hai. Avoid karne ke liye: Context API, state management (Zustand, Redux), component composition (children/render props), ya state ko jahan chahiye wahan colocate karo.",
      english:
        "Prop drilling is passing props through multiple intermediate layers that don't need the data themselves, only to reach a deep child. It creates verbose, brittle code. Avoid it with: React Context for widely shared data (theme, auth); state management libraries (Zustand, Redux); component composition (passing children or render props); or restructuring the component tree to colocate state closer to consumers.",
      keyPoints: [
        "Passing props through layers that don't use them",
        "Context API for global/shared data like theme or auth",
        "State libraries (Zustand, Redux) for complex app state",
        "Component composition can eliminate intermediate prop passing",
      ],
      example: {
        title: "Open Pedagogy App — Theme Without Drilling",
        code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Layout /> {/* no theme prop needed */}
    </ThemeContext.Provider>
  );
}

function LessonContent() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`,
        language: "tsx",
        explanation:
          "Instead of passing theme through Layout → Sidebar → LessonContent, Open Pedagogy App uses Context so LessonContent reads theme directly.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is Context API? When would you use it?",
    difficulty: "medium",
    tags: ["react", "context", "state"],
    answers: {
      hinglish:
        "Context API React ka built-in feature hai jo data ko component tree mein bina prop drilling ke pass karne deta hai. createContext, Provider, aur useContext use karte hain. Use karo low-frequency updates ke liye jaise theme, locale, auth user — har chhoti cheez ke liye nahi kyunki Provider value change par saare consumers re-render ho sakte hain.",
      english:
        "Context provides a way to share values (theme, locale, authenticated user) across the component tree without prop drilling. Create a context with createContext, wrap subtrees in Provider, and consume with useContext. Use it for global-ish data that many components need and that changes infrequently. Avoid for high-frequency updates or as a replacement for all state — Context changes re-render all consuming components unless you split contexts or memoize values.",
      keyPoints: [
        "Built-in solution for sharing data across deep trees",
        "createContext + Provider + useContext pattern",
        "Best for infrequently changing global data (theme, auth, locale)",
        "Split contexts to avoid broad unnecessary re-renders",
      ],
      example: {
        title: "Swift Call App — Auth Context",
        code: `const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, login: setUser, logout: () => setUser(null) }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function DialPad() {
  const { user } = useContext(AuthContext);
  if (!user) return <LoginPrompt />;
  return <Keypad />;
}`,
        language: "tsx",
        explanation:
          "Swift Call App shares auth state via Context so DialPad, CallHistory, and Settings all access the current user without prop drilling from App.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How does React Router work?",
    difficulty: "medium",
    tags: ["react", "routing", "react-router"],
    answers: {
      hinglish:
        "React Router client-side routing provide karta hai — page reload ke bina URL change karke different components render karta hai. BrowserRouter History API use karta hai. Routes define karte hain path-to-component mapping, Link/NavLink navigation ke liye, useParams dynamic segments ke liye, useNavigate programmatic navigation ke liye. Nested routes aur layouts bhi support hai.",
      english:
        "React Router enables client-side routing in SPAs by syncing UI with the URL without full page reloads. Wrap the app in a router (BrowserRouter uses the History API). Define Route elements mapping paths to components. Link and NavLink handle declarative navigation; useNavigate for programmatic redirects; useParams reads dynamic URL segments; useSearchParams for query strings. Supports nested routes, layout routes, loaders, and route guards for protected pages.",
      keyPoints: [
        "Client-side routing synced with browser URL",
        "Routes map paths to components; nested routes for layouts",
        "Hooks: useNavigate, useParams, useLocation, useSearchParams",
        "Enables protected routes and code-split lazy routes",
      ],
      example: {
        title: "Trip Planning App — Route Structure",
        code: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/trips/:tripId" element={<TripDetail />} />
    <Route path="/trips/:tripId/edit" element={<TripEditor />} />
  </Routes>
</BrowserRouter>`,
        language: "tsx",
        explanation:
          "Trip Planning App uses React Router so navigating from the dashboard to /trips/abc123 renders TripDetail with tripId from useParams — no server round-trip.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the difference between BrowserRouter and HashRouter?",
    difficulty: "easy",
    tags: ["react", "routing", "react-router"],
    answers: {
      hinglish:
        "BrowserRouter clean URLs use karta hai (example.com/trips/123) History API ke through — production SPAs ke liye standard. Server ko sab routes par index.html serve karna padta hai. HashRouter URL mein hash use karta hai (example.com/#/trips/123) — server config ki zaroorat nahi, legacy systems ya static hosting ke liye useful jahan rewrite rules nahi hain.",
      english:
        "BrowserRouter uses the HTML5 History API for clean URLs (example.com/about). It requires server configuration to serve index.html for all routes (fallback rewrite). HashRouter uses the hash portion of the URL (example.com/#/about) — the server only sees the part before #, so no server-side routing config is needed. Prefer BrowserRouter for production; use HashRouter for static hosts without rewrite support or legacy environments.",
      keyPoints: [
        "BrowserRouter: clean URLs via History API; needs server fallback",
        "HashRouter: #/ paths; no server config required",
        "BrowserRouter is the production standard",
        "HashRouter suits static hosting without rewrite rules",
      ],
      example: {
        title: "Open Pedagogy App — Deployment Choice",
        code: `// Production (Vercel/Netlify with rewrites)
<BrowserRouter>
  <App />
</BrowserRouter>

// Static GitHub Pages (no server rewrites)
<HashRouter>
  <App />
</HashRouter>`,
        language: "tsx",
        explanation:
          "Open Pedagogy App on Vercel uses BrowserRouter for SEO-friendly /courses/react-101 URLs; a demo on GitHub Pages would use HashRouter to avoid 404s on refresh.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do you lazy load components in React?",
    difficulty: "medium",
    tags: ["react", "lazy-loading", "code-splitting"],
    answers: {
      hinglish:
        "React.lazy() dynamic import use karke components ko lazy load karta hai — component tab load hota hai jab zaroorat ho. Suspense se wrap karo fallback UI ke liye loading state mein. Route-based splitting sabse common hai — har page alag chunk ban jata hai. Vite/Webpack automatically code splitting handle karte hain.",
      english:
        "Use React.lazy(() => import('./Component')) to dynamically import components, creating separate JS chunks loaded on demand. Wrap lazy components in Suspense with a fallback (spinner, skeleton) shown while loading. Route-based splitting is the most common pattern — each page becomes its own chunk. Bundlers like Vite and Webpack handle chunk generation automatically. Also lazy load heavy modals, charts, or admin panels not needed on initial load.",
      keyPoints: [
        "React.lazy + dynamic import for on-demand loading",
        "Wrap in Suspense with a fallback UI",
        "Route-based splitting reduces initial bundle size",
        "Bundlers auto-create separate chunks",
      ],
      example: {
        title: "Swift Call App — Lazy Admin Panel",
        code: `const AdminPanel = lazy(() => import("./AdminPanel"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<DialPad />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App lazy loads AdminPanel — regular users never download the admin chunk, keeping the initial call UI bundle small and fast.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is React Suspense?",
    difficulty: "medium",
    tags: ["react", "suspense", "lazy-loading"],
    answers: {
      hinglish:
        "Suspense ek component hai jo apne children ke 'wait' karne par fallback UI dikhata hai — jaise lazy loaded component load ho raha ho ya data fetch ho raha ho (React 18+ with frameworks). Ye declarative loading states deta hai bina har jagah isLoading state likhe. Nested Suspense boundaries se granular loading control milta hai.",
      english:
        "Suspense lets you declaratively handle loading states by displaying a fallback while children are not ready to render. Initially used with React.lazy for code splitting. In React 18, Suspense integrates with concurrent rendering and data fetching in frameworks like Next.js. When a child suspends (throws a promise), the nearest Suspense boundary shows its fallback. Nested boundaries enable granular loading — shell loads first, then content sections.",
      keyPoints: [
        "Shows fallback UI while children are loading",
        "Required wrapper for React.lazy components",
        "React 18 enables Suspense for data fetching in frameworks",
        "Nested boundaries provide granular loading control",
      ],
      example: {
        title: "Trip Planning App — Lazy Map View",
        code: `const TripMap = lazy(() => import("./TripMap"));

function TripDetail({ tripId }) {
  return (
    <div>
      <TripHeader tripId={tripId} />
      <Suspense fallback={<MapSkeleton />}>
        <TripMap tripId={tripId} />
      </Suspense>
    </div>
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App shows TripHeader immediately while Suspense displays MapSkeleton until the heavy TripMap chunk and map tiles load.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do Error Boundaries work in React?",
    difficulty: "medium",
    tags: ["react", "error-boundary", "error-handling"],
    answers: {
      hinglish:
        "Error Boundaries class components hain (ya react-error-boundary library) jo child tree mein JavaScript errors catch karte hain, crash poore app ko nahi karte. getDerivedStateFromError se fallback UI dikhate hain, componentDidCatch se error log karte hain. Ye event handlers, async code, ya SSR errors catch NAHI karte — sirf render/lifecycle errors.",
      english:
        "Error Boundaries are components that catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors. They display a fallback UI instead of crashing the entire app. Implement via class component with getDerivedStateFromError and componentDidCatch, or use the react-error-boundary package. They do NOT catch errors in event handlers, async code, SSR, or within the boundary itself. Place them around route sections or risky widgets.",
      keyPoints: [
        "Catch render/lifecycle errors in child tree",
        "Display fallback UI; log errors in componentDidCatch",
        "Don't catch event handler, async, or SSR errors",
        "Use react-error-boundary for functional component apps",
      ],
      example: {
        title: "Open Pedagogy App — Lesson Error Boundary",
        code: `function LessonErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>Failed to load lesson: {error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={LessonErrorFallback}>
  <InteractiveLesson lessonId={id} />
</ErrorBoundary>`,
        language: "tsx",
        explanation:
          "If InteractiveLesson throws during render, Open Pedagogy App shows a retry fallback instead of a white screen — the sidebar and navigation still work.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the difference between CSR, SSR and SSG?",
    difficulty: "medium",
    tags: ["react", "csr", "ssr", "ssg"],
    answers: {
      hinglish:
        "CSR (Client-Side Rendering): browser mein JS run karke HTML banata hai — SPA jaisa, slow first load lekin fast navigation. SSR (Server-Side Rendering): har request par server HTML generate karta hai — fast first paint, SEO achha. SSG (Static Site Generation): build time par HTML ban jata hai — sabse fast, CDN se serve, lekin dynamic data ke liye revalidation chahiye.",
      english:
        "CSR renders pages entirely in the browser via JavaScript — fast subsequent navigation but slower initial load and weaker SEO (Create React App pattern). SSR generates HTML on each request on the server — good first contentful paint and SEO (Next.js getServerSideProps). SSG pre-renders pages at build time into static HTML — fastest delivery via CDN, ideal for blogs and marketing pages (Next.js getStaticProps). Modern apps mix all three per route.",
      keyPoints: [
        "CSR: render in browser; fast SPA navigation, slow first load",
        "SSR: HTML per request on server; good SEO and FCP",
        "SSG: HTML at build time; fastest, CDN-friendly",
        "Frameworks like Next.js support mixing strategies per route",
      ],
      example: {
        title: "Trip Planning App — Mixed Rendering",
        code: `// SSG: marketing landing page (pre-built at deploy)
export async function getStaticProps() { return { props: { featured: trips } }; }

// SSR: user's private trip dashboard (fresh each request)
export async function getServerSideProps({ req }) {
  return { props: { trips: await fetchTrips(req.cookies.token) } };
}`,
        language: "tsx",
        explanation:
          "Trip Planning App uses SSG for the public landing page (instant CDN delivery) and SSR for authenticated dashboards showing live trip data.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do you integrate APIs in React?",
    difficulty: "medium",
    tags: ["react", "api", "data-fetching"],
    answers: {
      hinglish:
        "APIs integrate karne ke tareeke: useEffect + fetch/axios (basic), custom hooks (useFetch), ya libraries jaise TanStack Query (React Query) jo caching, refetching, loading/error states handle karte hain. Environment variables mein API URL rakho. Loading, error, aur empty states UI mein handle karo. AbortController se cleanup karo unmount par.",
      english:
        "Integrate APIs using fetch or axios inside useEffect for simple cases, wrapped in custom hooks for reuse, or TanStack Query (React Query) / SWR for production apps handling caching, deduplication, background refetch, and stale-while-revalidate. Store API URLs in environment variables. Always handle loading, error, and empty states in UI. Use AbortController in useEffect cleanup to cancel in-flight requests on unmount or dependency change.",
      keyPoints: [
        "fetch/axios in useEffect, custom hooks, or TanStack Query/SWR",
        "Handle loading, error, and empty states in UI",
        "Environment variables for API base URLs",
        "Cancel requests on unmount with AbortController",
      ],
      example: {
        title: "Swift Call App — Fetch Contacts",
        code: `function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contacts", { signal: controller.signal })
      .then((r) => r.json())
      .then(setContacts)
      .catch((e) => { if (e.name !== "AbortError") setError(e); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return { contacts, loading, error };
}`,
        language: "tsx",
        explanation:
          "Swift Call App fetches contacts on mount with proper loading/error states and aborts the request if the user navigates away before it completes.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How do you handle authentication in React applications?",
    difficulty: "medium",
    tags: ["react", "auth", "security"],
    answers: {
      hinglish:
        "Auth handle karne ke liye: login form se credentials backend ko bhejo, JWT ya session cookie mile. Token ko httpOnly cookie mein rakho (secure) ya memory mein — localStorage se bachna chahiye XSS ke liye. AuthContext se user state share karo. Protected routes mein check karo user logged in hai ya nahi, nahi to redirect /login. Token refresh aur logout flow bhi implement karo.",
      english:
        "Authentication flow: user submits credentials to a backend endpoint; receive a JWT or session cookie. Store tokens in httpOnly cookies (most secure against XSS) or in memory; avoid localStorage for sensitive tokens. Share auth state via Context or auth libraries (Auth0, Clerk, NextAuth). Implement protected routes checking auth status and redirecting unauthenticated users. Handle token refresh, logout (clear state + invalidate cookie), and role-based access for admin features.",
      keyPoints: [
        "Backend validates credentials; returns JWT or session cookie",
        "Prefer httpOnly cookies over localStorage for token storage",
        "Auth Context + protected routes for access control",
        "Implement refresh, logout, and role-based permissions",
      ],
      example: {
        title: "Open Pedagogy App — Protected Instructor Route",
        code: `function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

<Route path="/instructor" element={
  <ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>
} />`,
        language: "tsx",
        explanation:
          "Open Pedagogy App wraps instructor routes in ProtectedRoute — unauthenticated students redirect to login, authenticated students can't access instructor tools.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "How have you optimized the performance of a React application?",
    difficulty: "hard",
    tags: ["react", "performance", "optimization"],
    answers: {
      hinglish:
        "Performance optimize karne ke practical steps: React DevTools Profiler se bottlenecks identify karo, code splitting (React.lazy) se bundle chhota karo, React.memo/useMemo/useCallback jahan zaroori ho, virtualize long lists (react-window), debounce search inputs, images lazy load karo, unnecessary Context re-renders avoid karo, aur production build use karo. Real project mein measure karke optimize karo, guess mat karo.",
      english:
        "A systematic approach: profile with React DevTools to find slow renders; code-split routes with React.lazy; memoize expensive components and computations; virtualize long lists with react-window or TanStack Virtual; debounce/throttle search and scroll handlers; lazy load images and below-fold content; split Context to reduce re-render scope; use production builds; enable HTTP caching and CDN. In interviews, cite a real example: 'In Trip Planning App, virtualizing a 200-item itinerary list dropped render time from 120ms to 8ms.'",
      keyPoints: [
        "Profile first with React DevTools — measure, don't guess",
        "Code splitting, memoization, list virtualization",
        "Debounce inputs; lazy load images and heavy components",
        "Split Context; use production builds and CDN caching",
      ],
      example: {
        title: "Trip Planning App — Itinerary Virtualization",
        code: `import { FixedSizeList } from "react-window";

function ItineraryList({ activities }) {
  return (
    <FixedSizeList height={600} itemCount={activities.length} itemSize={72} width="100%">
      {({ index, style }) => (
        <ActivityRow style={style} activity={activities[index]} />
      )}
    </FixedSizeList>
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App virtualized a 200+ activity itinerary — only ~8 DOM nodes exist at a time instead of 200, cutting scroll jank and render time dramatically.",
      },
    },
  }),

  createQuestion({
    category: "react",
    question: "What is the difference between useRef and useState?",
    difficulty: "easy",
    tags: ["react", "hooks", "useRef", "useState"],
    answers: {
      hinglish:
        "useState value change par re-render trigger karta hai — UI update ke liye. useRef mutable container hai jiska change re-render NAHI karta — DOM elements reference karne, previous values store karne, ya timers/intervals ke liye. ref.current update karo silently. Rule: UI dikhana hai to useState; DOM access ya mutable value bina re-render ke chahiye to useRef.",
      english:
        "useState stores state that triggers a re-render when updated via its setter — use for anything that affects UI. useRef returns a mutable object { current } persisting across renders without causing re-renders when .current changes. Use useRef for: accessing DOM elements, storing previous values, holding timer IDs, or any mutable value that shouldn't trigger rendering. Changing ref.current is synchronous and silent.",
      keyPoints: [
        "useState updates trigger re-renders; useRef does not",
        "useRef persists mutable values across renders",
        "useRef for DOM access, timers, previous values",
        "useState for any value that should update the UI",
      ],
      example: {
        title: "Swift Call App — Auto-Focus Dial Input",
        code: `function DialPad() {
  const inputRef = useRef(null);
  const [number, setNumber] = useState("");

  useEffect(() => {
    inputRef.current?.focus(); // DOM access — no re-render needed
  }, []);

  return (
    <input
      ref={inputRef}
      value={number}
      onChange={(e) => setNumber(e.target.value)}
    />
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App uses useRef to focus the dial input on mount (DOM side effect) and useState for the number string that updates the displayed digits and enables the call button.",
      },
    },
  }),
];
