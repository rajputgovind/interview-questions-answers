import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const performanceQuestions: Question[] = [
  createQuestion({
    category: "performance",
    question: "Your React application is running slow. How would you optimize it?",
    difficulty: "medium",
    tags: ["react", "optimization", "profiling"],
    answers: {
      hinglish:
        "Pehle measure karo — React DevTools Profiler, Lighthouse, aur Network tab se pata lagao bottleneck kahan hai. Phir targeted fixes: React.memo / useMemo / useCallback se unnecessary re-renders roko, React.lazy se routes code-split karo, lambi lists virtualize karo, images lazy load aur compress karo, API calls cache/debounce karo, aur Context ko chhote pieces mein todo taaki poora tree re-render na ho. Production build use karo, CDN lagao, aur heavy third-party libraries hatao ya dynamically import karo.",
      english:
        "Start by profiling — use React DevTools Profiler, Lighthouse, and the Network tab to find the bottleneck (slow renders, large bundles, or slow APIs). Then apply targeted fixes: prevent unnecessary re-renders with React.memo, useMemo, and useCallback; code-split routes with React.lazy; virtualize long lists; lazy-load and compress images; cache and debounce API calls; split Context to reduce re-render scope. Use production builds, serve assets from a CDN, and remove or dynamically import heavy third-party libraries.",
      keyPoints: [
        "Profile first — don't optimize blindly",
        "Reduce re-renders, bundle size, and network payload",
        "Virtualize lists and lazy-load routes/images",
        "Use production builds, caching, and CDN",
      ],
      example: {
        title: "Trip Planning App — Systematic Optimization",
        code: `// Before: 200 itinerary rows rendered at once
// After: virtualized list + memoized row
const ItineraryRow = React.memo(({ activity }) => (
  <div>{activity.title}</div>
));

function ItineraryList({ activities }) {
  return (
    <FixedSizeList height={600} itemCount={activities.length} itemSize={48}>
      {({ index, style }) => (
        <div style={style}>
          <ItineraryRow activity={activities[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}`,
        language: "tsx",
        explanation:
          "In Trip Planning App, profiling showed a 200-item itinerary list caused 120ms renders. Virtualizing with react-window and memoizing rows dropped it to ~8ms — a concrete before/after story for interviews.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you identify unnecessary re-renders?",
    difficulty: "medium",
    tags: ["react", "re-renders", "devtools"],
    answers: {
      hinglish:
        "React DevTools Profiler se record karo aur dekho kaunse components baar-baar render ho rahe hain jab aap kuch unrelated change karte ho. 'Highlight updates when components render' option enable karo — flash dikhega jahan unnecessary render ho raha hai. Console mein why-did-you-render library ya custom logging se props compare karo. Agar parent re-render par child bhi flash karta hai lekin props same hain, to React.memo lagao.",
      english:
        "Use React DevTools Profiler — record an interaction and inspect which components re-render when unrelated state changes. Enable 'Highlight updates when components render' to visually flash re-rendering components. Use why-did-you-render or log props in useEffect to detect shallow-equal props triggering renders. If a child flashes on every parent re-render but its props haven't changed, wrap it in React.memo.",
      keyPoints: [
        "React DevTools Profiler records render counts and duration",
        "Highlight updates shows visual flashes on re-render",
        "Compare props — same values but new references cause renders",
        "React.memo skips render when props are shallowly equal",
      ],
      example: {
        title: "Open Pedagogy App — Lesson Sidebar Re-renders",
        code: `// Profiler showed LessonItem re-rendering on every search keystroke
const LessonItem = React.memo(function LessonItem({ title, completed }) {
  return (
    <li className={completed ? "done" : ""}>{title}</li>
  );
});

function LessonSidebar({ lessons, searchQuery }) {
  const filtered = lessons.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filtered.map((l) => (
    <LessonItem key={l.id} title={l.title} completed={l.completed} />
  ));
}`,
        language: "tsx",
        explanation:
          "In Open Pedagogy App, typing in the course search re-rendered every LessonItem. Profiler confirmed it; React.memo stopped items with unchanged props from re-rendering.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is the difference between useMemo and useCallback?",
    difficulty: "medium",
    tags: ["react", "hooks", "memoization"],
    answers: {
      hinglish:
        "useMemo expensive calculation ka result cache karta hai — value return karta hai. useCallback function reference cache karta hai — function return karta hai. Dono dependency array par depend karte hain. useMemo tab use karo jab computation heavy ho (filter, sort, transform). useCallback tab jab stable function reference chahiye — jaise React.memo child ko handler pass karte waqt ya useEffect dependency mein.",
      english:
        "useMemo caches the result of an expensive computation and returns a value. useCallback caches a function reference and returns the same function between renders. Both depend on a dependency array. Use useMemo for heavy computations (filtering, sorting, transforming data). Use useCallback when you need a stable function reference — passing handlers to memoized children or listing functions in useEffect dependencies.",
      keyPoints: [
        "useMemo → cached value; useCallback → cached function",
        "Both skip recalculation when deps are unchanged",
        "useMemo for expensive derived data",
        "useCallback for stable references to memoized children",
      ],
      example: {
        title: "Trip Planning App — Filtered Destinations",
        code: `function DestinationPicker({ destinations, search, onSelect }) {
  const filtered = useMemo(
    () => destinations.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    ),
    [destinations, search]
  );

  const handleSelect = useCallback(
    (id) => onSelect(id),
    [onSelect]
  );

  return filtered.map((d) => (
    <MemoizedDestinationCard key={d.id} dest={d} onSelect={handleSelect} />
  ));
}`,
        language: "tsx",
        explanation:
          "Trip Planning App memoizes filtered destinations (useMemo) and stabilizes the select handler (useCallback) so MemoizedDestinationCard doesn't re-render on every parent render.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How does memoization improve performance?",
    difficulty: "easy",
    tags: ["memoization", "caching", "react"],
    answers: {
      hinglish:
        "Memoization matlab pehle calculate kiya hua result ya reference store karke reuse karna jab inputs same hon. Isse expensive calculations dobara nahi chalti aur React ko pata rehta hai kya change hua. React.memo component output cache karta hai, useMemo values, useCallback functions. Lekin har jagah mat lagao — memoization ka apna overhead hai; sirf measured bottlenecks par use karo.",
      english:
        "Memoization stores a previously computed result or reference and reuses it when inputs haven't changed. This avoids repeating expensive calculations and helps React skip unnecessary work. React.memo caches component output, useMemo caches values, and useCallback caches function references. Don't memoize everything — memoization has its own overhead; apply it only to measured bottlenecks.",
      keyPoints: [
        "Reuses results when inputs are unchanged",
        "Skips re-computation and unnecessary re-renders",
        "React.memo, useMemo, and useCallback are memoization tools",
        "Over-memoizing adds complexity and memory cost",
      ],
      example: {
        title: "Open Pedagogy App — Course Stats Dashboard",
        code: `function CourseStats({ enrollments }) {
  const stats = useMemo(() => ({
    total: enrollments.length,
    completed: enrollments.filter((e) => e.completed).length,
    avgScore: enrollments.reduce((s, e) => s + e.score, 0) / enrollments.length,
  }), [enrollments]);

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Avg Score: {stats.avgScore.toFixed(1)}</p>
    </div>
  );
}`,
        language: "tsx",
        explanation:
          "Open Pedagogy App's instructor dashboard recalculates stats only when enrollments change, not on every unrelated UI toggle like sidebar collapse.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is React lazy and how does it help in performance?",
    difficulty: "medium",
    tags: ["react", "lazy", "code-splitting"],
    answers: {
      hinglish:
        "React.lazy ek function return karta hai jo component ko dynamically import karta hai — matlab woh component initial bundle mein nahi aata, jab zaroorat ho tab load hota hai. Isse initial JavaScript bundle chhota rehta hai aur first paint fast hota hai. Hamesha Suspense ke saath use karo fallback UI ke liye jab chunk load ho raha ho. Routes, heavy modals, aur admin panels ke liye perfect hai.",
      english:
        "React.lazy returns a component that is loaded via dynamic import — it isn't included in the initial bundle and loads on demand. This reduces initial JavaScript payload and speeds up first paint. Always pair it with Suspense to show a fallback while the chunk loads. Ideal for routes, heavy modals, and admin panels that most users never visit.",
      keyPoints: [
        "Dynamic import — component loads on demand",
        "Reduces initial bundle size",
        "Must wrap with Suspense for loading fallback",
        "Best for routes and rarely-used heavy features",
      ],
      example: {
        title: "Swift Call App — Lazy Admin Panel",
        code: `const AdminPanel = React.lazy(() => import("./AdminPanel"));

function App() {
  return (
    <Suspense fallback={<AdminPanelSkeleton />}>
      <Routes>
        <Route path="/" element={<DialPad />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App lazy-loads AdminPanel — regular users never download the admin chunk, keeping the dial-pad bundle small and the call UI fast to load.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is code splitting?",
    difficulty: "medium",
    tags: ["bundling", "code-splitting", "webpack"],
    answers: {
      hinglish:
        "Code splitting matlab ek bade JavaScript bundle ko chhote chunks mein todna taaki user ko sirf wahi code load ho jo abhi chahiye. Route-based splitting sabse common hai — har page alag chunk. Webpack/Vite dynamic import() se automatically chunks banate hain. React.lazy + Suspense React side ka pattern hai. Isse Time to Interactive improve hota hai kyunki browser kam JS parse karta hai upfront.",
      english:
        "Code splitting breaks a large JavaScript bundle into smaller chunks so users download only the code needed for the current view. Route-based splitting is most common — each page becomes its own chunk. Webpack and Vite create chunks automatically from dynamic import(). React.lazy + Suspense is the React-side pattern. This improves Time to Interactive because the browser parses less JS upfront.",
      keyPoints: [
        "Splits bundle into smaller on-demand chunks",
        "Route-based splitting is the most common strategy",
        "Dynamic import() triggers automatic chunk creation",
        "Improves Time to Interactive and initial load",
      ],
      example: {
        title: "Open Pedagogy App — Route-Based Splitting",
        code: `// vite/webpack creates separate chunks per dynamic import
const CourseEditor = lazy(() => import("./pages/CourseEditor"));
const Analytics = lazy(() => import("./pages/Analytics"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));

// Student never downloads CourseEditor chunk unless they navigate there`,
        language: "tsx",
        explanation:
          "Open Pedagogy App splits instructor tools (CourseEditor, Analytics) from the student dashboard — students download a smaller initial chunk without editor dependencies.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is tree shaking?",
    difficulty: "medium",
    tags: ["bundling", "tree-shaking", "esbuild"],
    answers: {
      hinglish:
        "Tree shaking dead code elimination hai — bundler unused exports hata deta hai final bundle se. ES modules (import/export) static analysis allow karte hain, isliye sirf jo import kiya wahi bundle mein aata hai. Poora library import mat karo (import _ from 'lodash'), named import karo (import { debounce } from 'lodash-es'). sideEffects: false package.json mein help karta hai. Production build mein automatically hota hai.",
      english:
        "Tree shaking is dead code elimination — the bundler removes unused exports from the final bundle. ES modules (import/export) enable static analysis, so only what you import is included. Avoid importing entire libraries (import _ from 'lodash'); use named imports (import { debounce } from 'lodash-es'). Setting sideEffects: false in package.json helps. It runs automatically in production builds with Vite, Webpack, or esbuild.",
      keyPoints: [
        "Removes unused exports from the final bundle",
        "Requires ES modules for static analysis",
        "Prefer named imports over default whole-library imports",
        "Automatic in production builds (Vite, Webpack, esbuild)",
      ],
      example: {
        title: "Trip Planning App — Tree-Shakeable Imports",
        code: `// Bad: entire lodash (~70KB) bundled
import _ from "lodash";
_.debounce(fn, 300);

// Good: only debounce included (~2KB)
import debounce from "lodash-es/debounce";
const debouncedSearch = debounce(searchTrips, 300);`,
        language: "typescript",
        explanation:
          "Trip Planning App switched from full lodash to lodash-es named imports, shaving ~65KB from the search feature chunk via tree shaking.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you reduce the bundle size of a React application?",
    difficulty: "medium",
    tags: ["bundling", "bundle-size", "optimization"],
    answers: {
      hinglish:
        "Bundle size kam karne ke liye: code splitting aur lazy loading use karo, tree-shakeable ES imports prefer karo, heavy libraries replace karo (moment → date-fns, lodash → native methods), bundle analyzer se bade dependencies identify karo, images/fonts alag serve karo, unused CSS hatao (PurgeCSS/Tailwind JIT), aur dependencies audit karo — har package bundle mein aata hai. Production build hamesha analyze karo, dev build nahi.",
      english:
        "To reduce bundle size: use code splitting and lazy loading; prefer tree-shakeable ES imports; replace heavy libraries (moment → date-fns, lodash → native methods); use a bundle analyzer to find large dependencies; serve images/fonts separately; remove unused CSS (PurgeCSS/Tailwind JIT); audit dependencies — every package adds weight. Always analyze the production build, not dev.",
      keyPoints: [
        "Code split and lazy-load non-critical features",
        "Use tree-shakeable imports and lighter alternatives",
        "Analyze with webpack-bundle-analyzer or rollup-plugin-visualizer",
        "Audit and remove unused dependencies and CSS",
      ],
      example: {
        title: "Swift Call App — Bundle Analysis",
        code: `// package.json — analyze script
"scripts": {
  "analyze": "vite build && npx vite-bundle-visualizer"
}

// Replace heavy chart lib with lightweight alternative
// Before: import { Chart } from "chart.js"  (~200KB)
// After:  import { Sparkline } from "./ui/Sparkline" (~3KB)`,
        language: "json",
        explanation:
          "Swift Call App's bundle analyzer revealed chart.js was 40% of a settings page chunk. Replacing it with a tiny custom Sparkline cut that route's JS by nearly half.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What are the ways to improve the initial load time?",
    difficulty: "medium",
    tags: ["initial-load", "fcp", "tti"],
    answers: {
      hinglish:
        "Initial load fast karne ke liye: JavaScript bundle chhota karo (code splitting, tree shaking), critical CSS inline karo, fonts preload karo, images compress aur next-gen formats (WebP/AVIF) use karo, CDN se static assets serve karo, HTTP/2 ya HTTP/3 enable karo, server-side rendering ya static generation se HTML jaldi bhejo, aur third-party scripts defer/async karo. Lighthouse se FCP, LCP, aur TTI measure karo.",
      english:
        "To improve initial load: shrink the JS bundle (code splitting, tree shaking); inline critical CSS; preload fonts; compress images and use next-gen formats (WebP/AVIF); serve static assets from a CDN; enable HTTP/2 or HTTP/3; send HTML faster with SSR or SSG; defer/async third-party scripts. Measure FCP, LCP, and TTI with Lighthouse.",
      keyPoints: [
        "Reduce JS/CSS payload and split code",
        "Optimize fonts, images, and static asset delivery",
        "SSR/SSG delivers meaningful HTML faster",
        "Measure FCP, LCP, and TTI with Lighthouse",
      ],
      example: {
        title: "Open Pedagogy App — Landing Page Load",
        code: `// next.config.js — image optimization + font preload
module.exports = {
  images: { formats: ["image/avif", "image/webp"] },
};

// layout.tsx
<link rel="preload" href="/fonts/inter-var.woff2" as="font" crossOrigin="" />

// Homepage is SSG — HTML served instantly from CDN`,
        language: "javascript",
        explanation:
          "Open Pedagogy App's marketing landing page uses SSG with optimized images and preloaded fonts, achieving sub-1s LCP on Vercel's CDN.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is list virtualization? Have you implemented it?",
    difficulty: "hard",
    tags: ["virtualization", "react-window", "lists"],
    answers: {
      hinglish:
        "List virtualization matlab sirf visible items DOM mein render karna, baaki virtual space occupy karte hain bina actual nodes ke. 10,000 items ki list mein sirf ~15 DOM nodes hote hain jo screen par dikhte hain. Libraries: react-window, react-virtualized, TanStack Virtual. Scroll position ke hisaab se items recycle hote hain. Haan, Trip Planning App mein 200+ activity itinerary list virtualize ki thi — scroll smooth ho gaya aur render time 120ms se 8ms aa gaya.",
      english:
        "List virtualization renders only the visible items in the DOM; off-screen items occupy virtual space without actual nodes. A 10,000-item list might have only ~15 DOM nodes visible at once. Libraries: react-window, react-virtualized, TanStack Virtual. Items are recycled as the user scrolls. Yes — in Trip Planning App I virtualized a 200+ activity itinerary list, making scroll smooth and dropping render time from 120ms to 8ms.",
      keyPoints: [
        "Renders only visible rows, not the entire list",
        "Dramatically reduces DOM nodes and memory",
        "Libraries: react-window, TanStack Virtual",
        "Essential for lists with 100+ items",
      ],
      example: {
        title: "Trip Planning App — Virtualized Itinerary",
        code: `import { FixedSizeList } from "react-window";

function ItineraryList({ activities }) {
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={activities.length}
      itemSize={56}
    >
      {({ index, style }) => (
        <div style={style} className="activity-row">
          <span>{activities[index].time}</span>
          <span>{activities[index].title}</span>
        </div>
      )}
    </FixedSizeList>
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App virtualized a 200+ activity itinerary — only ~9 DOM nodes exist at a time instead of 200, eliminating scroll jank on mobile.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is the difference between CSR, SSR and SSG in terms of performance?",
    difficulty: "medium",
    tags: ["csr", "ssr", "ssg", "rendering"],
    answers: {
      hinglish:
        "CSR (Client-Side Rendering): browser ko poora JS download karna padta hai, phir render — initial load slow, baad mein fast navigation. SSR (Server-Side Rendering): server HTML bhejta hai — fast First Contentful Paint, lekin server load aur TTFB zyada ho sakta hai. SSG (Static Site Generation): build time par HTML ban jata hai, CDN se serve — sabse fast initial load, lekin dynamic data ke liye revalidation chahiye. Performance trade-off: SSG > SSR > CSR for initial load.",
      english:
        "CSR (Client-Side Rendering): the browser downloads all JS then renders — slow initial load, fast subsequent navigation. SSR (Server-Side Rendering): the server sends HTML — fast First Contentful Paint, but higher server load and TTFB. SSG (Static Site Generation): HTML is built at build time and served from CDN — fastest initial load, but needs revalidation for dynamic data. Performance trade-off for initial load: SSG > SSR > CSR.",
      keyPoints: [
        "CSR: slow initial load, fast client navigation",
        "SSR: fast FCP, server renders per request",
        "SSG: fastest initial load, pre-built static HTML",
        "Choose based on data freshness vs load speed needs",
      ],
      example: {
        title: "Open Pedagogy App — Mixed Rendering Strategy",
        code: `// SSG — marketing pages (instant CDN delivery)
export async function generateStaticParams() { /* ... */ }

// SSR — authenticated dashboard (fresh enrollment data)
export async function getServerSideProps() {
  const courses = await fetchEnrollments(userId);
  return { props: { courses } };
}

// CSR — interactive lesson player (heavy client JS)`,
        language: "tsx",
        explanation:
          "Open Pedagogy App uses SSG for public course catalog (instant load), SSR for logged-in dashboards (fresh data), and CSR for the interactive lesson player.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you optimize images in a web application?",
    difficulty: "medium",
    tags: ["images", "webp", "lazy-loading"],
    answers: {
      hinglish:
        "Images optimize karne ke liye: next-gen formats use karo (WebP, AVIF), responsive images ke liye srcset aur sizes attribute lagao, lazy loading (loading='lazy' ya Intersection Observer), proper dimensions set karo taaki layout shift na ho (CLS kam), CDN image optimization (Cloudinary, Vercel Image), aur SVG icons ke liye inline ya sprite use karo. Next.js mein next/image automatically resize, lazy load, aur format convert karta hai.",
      english:
        "To optimize images: use next-gen formats (WebP, AVIF); add srcset and sizes for responsive images; lazy-load with loading='lazy' or Intersection Observer; set explicit width/height to prevent layout shift (reduce CLS); use CDN image optimization (Cloudinary, Vercel Image); use inline SVG or sprites for icons. Next.js next/image automatically resizes, lazy-loads, and converts formats.",
      keyPoints: [
        "Use WebP/AVIF and responsive srcset/sizes",
        "Lazy-load below-the-fold images",
        "Set dimensions to prevent CLS",
        "Use next/image or CDN optimization services",
      ],
      example: {
        title: "Trip Planning App — Destination Photos",
        code: `import Image from "next/image";

function DestinationCard({ destination }) {
  return (
    <Image
      src={destination.photoUrl}
      alt={destination.name}
      width={400}
      height={300}
      sizes="(max-width: 768px) 100vw, 400px"
      loading="lazy"
      placeholder="blur"
      blurDataURL={destination.thumbnail}
    />
  );
}`,
        language: "tsx",
        explanation:
          "Trip Planning App uses next/image for destination photos — automatic WebP conversion, lazy loading, and blur placeholders cut LCP by 40% on the explore page.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is the difference between repaint, reflow and compositing?",
    difficulty: "hard",
    tags: ["browser", "rendering", "paint"],
    answers: {
      hinglish:
        "Reflow (layout): jab element ki geometry change hoti hai (width, height, position) — browser poori layout tree recalculate karta hai, bahut expensive. Repaint: jab sirf visual change hota hai bina layout ke (color, background, visibility) — layout nahi, sirf pixels paint. Compositing: browser layers ko GPU par combine karta hai — transform aur opacity changes usually compositor-only hain, reflow/repaint skip. Performance tip: transform/opacity prefer karo, layout properties (top, width) avoid karo animations mein.",
      english:
        "Reflow (layout): when an element's geometry changes (width, height, position) — the browser recalculates the layout tree, very expensive. Repaint: when only visual properties change without layout (color, background, visibility) — no layout, just pixel painting. Compositing: the browser combines layers on the GPU — transform and opacity changes are usually compositor-only, skipping reflow/repaint. Performance tip: prefer transform/opacity for animations; avoid layout-triggering properties like top and width.",
      keyPoints: [
        "Reflow/layout: geometry change — most expensive",
        "Repaint: visual-only change — cheaper than reflow",
        "Compositing: GPU layer merge — cheapest for animations",
        "Use transform/opacity instead of top/left/width animations",
      ],
      example: {
        title: "Swift Call App — Smooth Call Controls Animation",
        code: `/* Bad: triggers reflow every frame */
.mute-btn { transition: width 0.3s; }
.mute-btn.active { width: 120px; }

/* Good: compositor-only, no reflow */
.mute-btn { transition: transform 0.3s, opacity 0.3s; }
.mute-btn.active { transform: scale(1.1); opacity: 1; }`,
        language: "css",
        explanation:
          "Swift Call App animates mute button feedback with transform and opacity — compositor-only, 60fps on mobile without layout thrashing.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you avoid layout thrashing?",
    difficulty: "hard",
    tags: ["layout-thrashing", "browser", "dom"],
    answers: {
      hinglish:
        "Layout thrashing tab hota hai jab aap DOM read (offsetHeight, getBoundingClientRect) aur write (style changes) ko alternate karte ho — har write ke baad browser forced reflow karta hai. Avoid karne ke liye: saari reads pehle batch karo, phir saari writes; DocumentFragment use karo multiple inserts ke liye; transform use karo position change ke liye; requestAnimationFrame mein DOM updates group karo; aur virtual DOM frameworks ka fayda uthao jo batching karte hain.",
      english:
        "Layout thrashing occurs when you alternate DOM reads (offsetHeight, getBoundingClientRect) and writes (style changes) — each write forces a synchronous reflow. To avoid it: batch all reads first, then all writes; use DocumentFragment for multiple inserts; use transform for position changes; group DOM updates in requestAnimationFrame; leverage frameworks that batch DOM updates via Virtual DOM.",
      keyPoints: [
        "Don't interleave DOM reads and writes",
        "Batch reads first, then batch writes",
        "Use transform instead of top/left for movement",
        "requestAnimationFrame groups visual updates per frame",
      ],
      example: {
        title: "Open Pedagogy App — Tooltip Positioning",
        code: `// Bad: read-write-read-write loop
elements.forEach((el) => {
  const height = el.offsetHeight; // READ — forces reflow
  el.style.top = height + "px";   // WRITE
});

// Good: batch reads, then batch writes
const heights = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.top = heights[i] + "px";
});`,
        language: "javascript",
        explanation:
          "Open Pedagogy App's lesson tooltip positioning batches all offsetHeight reads before applying styles, avoiding layout thrashing when positioning 30+ tooltips.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you optimize API calls in a React application?",
    difficulty: "medium",
    tags: ["api", "caching", "react-query"],
    answers: {
      hinglish:
        "API calls optimize karne ke liye: React Query / SWR se caching aur deduplication karo, parallel requests jahan possible ho, pagination/infinite scroll se data chunks mein lo, debounce search APIs, request cancellation (AbortController) stale responses ke liye, optimistic updates se perceived speed badhao, aur server-side filtering/sorting karo client par nahi. Same data ke liye global cache rakho — har component alag fetch na kare.",
      english:
        "To optimize API calls: use React Query or SWR for caching and deduplication; fire parallel requests where possible; paginate or infinite-scroll data in chunks; debounce search APIs; cancel stale requests with AbortController; use optimistic updates for perceived speed; filter/sort on the server, not the client. Maintain a global cache so multiple components don't fetch the same data independently.",
      keyPoints: [
        "Cache with React Query/SWR — avoid duplicate fetches",
        "Paginate, debounce search, and cancel stale requests",
        "Parallelize independent requests",
        "Optimistic updates improve perceived performance",
      ],
      example: {
        title: "Swift Call App — Cached Contact Fetching",
        code: `function useContact(contactId) {
  return useQuery({
    queryKey: ["contact", contactId],
    queryFn: ({ signal }) =>
      fetch(\`/api/contacts/\${contactId}\`, { signal }).then((r) => r.json()),
    staleTime: 5 * 60 * 1000, // 5 min cache
    enabled: !!contactId,
  });
}

// DialPad and CallHistory share the same cached contact`,
        language: "tsx",
        explanation:
          "Swift Call App uses React Query so DialPad and CallHistory share one cached contact fetch — no duplicate network calls when switching views during a call.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What is debouncing and throttling? When do you use them?",
    difficulty: "medium",
    tags: ["debounce", "throttle", "events"],
    answers: {
      hinglish:
        "Debouncing: function tab call hoti hai jab user action ruk jaye (jaise typing ke 300ms baad search). Har keystroke par call nahi. Throttling: function fixed interval par call hoti hai chahe kitni baar event fire ho (jaise scroll par har 100ms). Debounce use karo search input, window resize, form validation ke liye. Throttle use karo scroll handlers, mouse move, aur real-time tracking ke liye jahan continuous updates chahiye lekin har event par nahi.",
      english:
        "Debouncing: the function fires only after the user stops acting (e.g., search 300ms after the last keystroke). Not on every keystroke. Throttling: the function fires at a fixed interval regardless of how many events fire (e.g., scroll handler every 100ms). Use debounce for search inputs, window resize, and form validation. Use throttle for scroll handlers, mouse move, and real-time tracking where you need continuous updates but not on every event.",
      keyPoints: [
        "Debounce: wait until activity stops, then fire once",
        "Throttle: fire at most once per interval",
        "Debounce → search, resize, validation",
        "Throttle → scroll, mousemove, rate-limited updates",
      ],
      example: {
        title: "Trip Planning App — Debounced Search",
        code: `import { useMemo, useState } from "react";
import debounce from "lodash-es/debounce";

function TripSearch() {
  const [query, setQuery] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((q) => fetchTrips(q), 300),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return <input value={query} onChange={handleChange} placeholder="Search trips..." />;
}`,
        language: "tsx",
        explanation:
          "Trip Planning App debounces trip search — typing 'Goa' fires one API call after 300ms idle instead of three calls for G, Go, and Goa.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How does lazy loading help in performance?",
    difficulty: "easy",
    tags: ["lazy-loading", "performance", "images"],
    answers: {
      hinglish:
        "Lazy loading matlab resources tab load karna jab unki zaroorat ho — pehle nahi. Images below the fold, route components, aur heavy modules defer ho sakte hain. Isse initial page load fast hota hai kyunki kam data download hota hai upfront. Browser native loading='lazy' images ke liye, React.lazy components ke liye, aur Intersection Observer custom cases ke liye. User experience better — page jaldi interactive hota hai.",
      english:
        "Lazy loading defers loading resources until they're needed — not upfront. Below-the-fold images, route components, and heavy modules can all be deferred. This speeds initial page load because less data downloads upfront. Use native loading='lazy' for images, React.lazy for components, and Intersection Observer for custom cases. Better UX — the page becomes interactive faster.",
      keyPoints: [
        "Defers non-critical resources until needed",
        "Reduces initial download and parse time",
        "loading='lazy' for images, React.lazy for components",
        "Intersection Observer for custom lazy-load triggers",
      ],
      example: {
        title: "Open Pedagogy App — Lazy Course Thumbnails",
        code: `function CourseGrid({ courses }) {
  return courses.map((course) => (
    <img
      key={course.id}
      src={course.thumbnail}
      alt={course.title}
      loading="lazy"
      width={320}
      height={180}
    />
  ));
}

// Only visible thumbnails load; off-screen ones defer`,
        language: "tsx",
        explanation:
          "Open Pedagogy App's course catalog has 50+ thumbnails — lazy loading means only the ~6 visible images fetch initially, cutting initial network requests by 80%.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you optimize rendering large lists in React?",
    difficulty: "hard",
    tags: ["lists", "virtualization", "react"],
    answers: {
      hinglish:
        "Badi lists optimize karne ke liye: virtualization (react-window) — sirf visible items render, stable keys use karo, React.memo se row components wrap karo, expensive calculations useMemo se, pagination ya infinite scroll se data chunks mein load karo, CSS contain property use karo, aur unnecessary state lift mat karo. Agar list chhoti hai (<50 items) virtualization ki zaroorat nahi — pehle measure karo.",
      english:
        "To optimize large lists: virtualize with react-window — render only visible items; use stable keys; wrap row components in React.memo; memoize expensive computations with useMemo; paginate or infinite-scroll data in chunks; use CSS contain property; avoid lifting unnecessary state. Lists under ~50 items may not need virtualization — measure first.",
      keyPoints: [
        "Virtualize with react-window or TanStack Virtual",
        "Memoize row components and derived data",
        "Stable keys and pagination/infinite scroll",
        "Measure before optimizing — small lists may not need it",
      ],
      example: {
        title: "Swift Call App — Call History List",
        code: `const CallRow = React.memo(({ call }) => (
  <div className="call-row">
    <span>{call.contactName}</span>
    <span>{call.duration}</span>
    <span>{call.timestamp}</span>
  </div>
));

function CallHistory({ calls }) {
  const sorted = useMemo(
    () => [...calls].sort((a, b) => b.timestamp - a.timestamp),
    [calls]
  );

  return (
    <FixedSizeList height={400} itemCount={sorted.length} itemSize={52}>
      {({ index, style }) => (
        <div style={style}>
          <CallRow call={sorted[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}`,
        language: "tsx",
        explanation:
          "Swift Call App virtualizes 500+ call history entries with memoized rows and useMemo-sorted data — smooth scroll even on low-end Android devices.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "What tools do you use to measure performance?",
    difficulty: "medium",
    tags: ["profiling", "lighthouse", "devtools"],
    answers: {
      hinglish:
        "Performance measure karne ke tools: Chrome DevTools Performance tab (flame charts, long tasks), React DevTools Profiler (component render time), Lighthouse (FCP, LCP, CLS, TTI scores), Web Vitals library (real user metrics), bundle analyzers (webpack-bundle-analyzer, vite-bundle-visualizer), Network tab (waterfall, payload size), aur React Strict Mode (development warnings). Production mein Sentry/Datadog RUM se real user performance track karo.",
      english:
        "Tools for measuring performance: Chrome DevTools Performance tab (flame charts, long tasks); React DevTools Profiler (component render time); Lighthouse (FCP, LCP, CLS, TTI scores); Web Vitals library (real user metrics); bundle analyzers (webpack-bundle-analyzer, vite-bundle-visualizer); Network tab (waterfall, payload size); React Strict Mode (development warnings). In production, track real user performance with Sentry or Datadog RUM.",
      keyPoints: [
        "Chrome DevTools + React Profiler for render bottlenecks",
        "Lighthouse for Core Web Vitals scores",
        "Bundle analyzers for JS payload inspection",
        "RUM tools (Sentry, Datadog) for production metrics",
      ],
      example: {
        title: "Trip Planning App — Performance Audit Workflow",
        code: `// 1. Lighthouse CI in pipeline
// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
      },
    },
  },
};

// 2. React Profiler: record → inspect slow components
// 3. web-vitals in production
import { onLCP, onFID, onCLS } from "web-vitals";
onLCP(console.log);`,
        language: "javascript",
        explanation:
          "Trip Planning App runs Lighthouse CI on every deploy, uses React Profiler during development, and reports Web Vitals from real users in production.",
      },
    },
  }),

  createQuestion({
    category: "performance",
    question: "How do you optimize a React application for mobile devices?",
    difficulty: "medium",
    tags: ["mobile", "responsive", "performance"],
    answers: {
      hinglish:
        "Mobile optimize karne ke liye: bundle size chhota rakho (slow networks), touch-friendly UI (44px min tap targets), images responsive aur compressed, reduce JavaScript execution (virtualize lists, avoid heavy animations), passive event listeners scroll ke liye, service worker se offline caching, test real devices par (not just Chrome DevTools mobile emulation), reduce third-party scripts, aur font subsetting. Network conditions simulate karo — Fast 3G par test karo.",
      english:
        "To optimize for mobile: keep bundle size small (slow networks); use touch-friendly UI (44px minimum tap targets); serve responsive, compressed images; reduce JavaScript execution (virtualize lists, avoid heavy animations); use passive event listeners for scroll; cache offline with a service worker; test on real devices, not just Chrome DevTools mobile emulation; reduce third-party scripts; subset fonts. Simulate network conditions — test on Fast 3G.",
      keyPoints: [
        "Small bundles and compressed images for slow networks",
        "Touch-friendly UI and passive scroll listeners",
        "Virtualize lists and minimize JS execution",
        "Test on real devices with throttled network",
      ],
      example: {
        title: "Swift Call App — Mobile Call UI",
        code: `// Passive scroll listener — doesn't block scrolling
useEffect(() => {
  const handler = () => setShowScrollTop(window.scrollY > 200);
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}, []);

// Touch-friendly dial pad buttons
<button className="min-h-[48px] min-w-[48px] text-xl">1</button>

// Code-split heavy features not needed on mobile dial screen`,
        language: "tsx",
        explanation:
          "Swift Call App targets low-end Android phones: 48px dial buttons, passive scroll listeners, code-split admin panel, and tested on real devices over 3G — call UI loads in under 2s.",
      },
    },
  }),
];
