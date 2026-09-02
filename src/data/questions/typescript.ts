import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const typescriptQuestions: Question[] = [
  createQuestion({
    category: "typescript",
    question: "Why did you choose TypeScript over JavaScript?",
    difficulty: "easy",
    tags: ["typescript", "fundamentals", "decision"],
    answers: {
      hinglish: `Maine TypeScript choose kiya kyunki large MERN projects mein bugs compile time pe pakad aate hain, autocomplete better milta hai, aur team ke saath contracts clear rehte hain. JavaScript flexible hai lekin refactoring risky ho jata hai jab codebase bada ho — Trip Planning jaise apps mein API responses aur component props type-safe rakhna production bugs kam karta hai. TypeScript gradually adopt kar sakte ho, isliye existing JS code break nahi hota.`,
      english: `I choose TypeScript for production MERN apps because it catches type errors at compile time, improves IDE autocomplete and refactoring safety, and documents data shapes across the stack. JavaScript's flexibility becomes a liability in large codebases — untyped API payloads and prop drilling cause runtime surprises. In projects like Trip Planning, typing JWT payloads, MongoDB documents, and React props reduced integration bugs. TypeScript also supports gradual adoption, so migrating an existing JavaScript codebase is practical without a big-bang rewrite.`,
      keyPoints: [
        "Catch errors at compile time, not in production",
        "Better IDE support — autocomplete, go-to-definition, refactors",
        "Self-documenting contracts between frontend, API, and DB layers",
        "Gradual adoption — .js files can coexist during migration",
      ],
      example: {
        title: "Typed API response in Trip Planning",
        code: `interface Trip {
  id: string;
  title: string;
  stops: Stop[];
}

async function fetchTrips(): Promise<Trip[]> {
  const res = await fetch("/api/trips");
  return res.json(); // TS ensures callers expect Trip[]
}`,
        language: "typescript",
        explanation:
          "Without types, a renamed API field silently returns undefined in the UI. With Trip typed, the compiler flags mismatches before deploy.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is TypeScript?",
    difficulty: "easy",
    tags: ["typescript", "fundamentals"],
    answers: {
      hinglish: `TypeScript Microsoft ka open-source superset hai JavaScript ka — matlab valid JS hi valid TS hai, plus optional static types. Code compile hota hai (transpile) plain JavaScript mein, phir browser ya Node.js mein chalta hai. Types sirf development time pe hote hain; runtime pe strip ho jate hain. Ye JavaScript ko scalable banata hai bina language change kiye.`,
      english: `TypeScript is a typed superset of JavaScript developed by Microsoft. It adds optional static type annotations, interfaces, enums, and generics on top of standard ECMAScript syntax. The TypeScript compiler (tsc) transpiles .ts files to plain JavaScript that runs anywhere JS runs. Types exist only at compile time — they are erased at runtime, so there is no performance penalty in production bundles when using standard compilation.`,
      keyPoints: [
        "Superset of JavaScript — all valid JS is valid TS",
        "Static typing is optional and compile-time only",
        "Transpiles to JavaScript via tsc or bundlers (esbuild, SWC)",
        "Adds interfaces, generics, enums, and advanced type utilities",
      ],
      example: {
        title: "Basic TypeScript vs compiled output",
        code: `// source.ts
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

// compiled.js (types removed)
function greet(name) {
  return \`Hello, \${name}\`;
}`,
        language: "typescript",
        explanation:
          "The type annotation on name and the return type disappear after compilation — runtime behavior is identical to hand-written JavaScript.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is the difference between type and interface?",
    difficulty: "medium",
    tags: ["typescript", "types", "interfaces"],
    answers: {
      hinglish: `Dono object shapes describe karne ke liye use hote hain. interface primarily object structure ke liye hai aur declaration merging support karta hai — same naam ki do interfaces merge ho jati hain. type zyada flexible hai: unions, intersections, tuples, primitives alias kar sakta hai. Classes dono ko implement kar sakti hain. Modern TS mein zyada cases mein interchangeable hain; objects ke liye interface, complex unions ke liye type prefer karte hain.`,
      english: `Both type aliases and interfaces describe the shape of values, but they differ in capabilities. Interfaces are best for object contracts and support declaration merging — declaring the same interface name twice merges members. Type aliases can represent unions, intersections, tuples, mapped types, and primitive aliases. Both can be extended or implemented by classes. For public library APIs, interfaces are common because consumers can augment them; for unions and computed types, type is more expressive.`,
      keyPoints: [
        "interface: object shapes, declaration merging, extends keyword",
        "type: unions, intersections, tuples, mapped/conditional types",
        "Both work with implements and structural typing",
        "Prefer interface for object contracts; type for unions and utilities",
      ],
      example: {
        title: "Interface merging vs type union",
        code: `interface User {
  id: string;
}
interface User {
  name: string; // merged — User has id + name
}

type Status = "active" | "banned"; // union — not possible with interface
type ApiResult = { ok: true; data: User } | { ok: false; error: string };`,
        language: "typescript",
        explanation:
          "Use interface when you need mergeable object contracts (e.g. extending third-party types). Use type when modeling discriminated unions for API results.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What are the benefits of using TypeScript?",
    difficulty: "easy",
    tags: ["typescript", "benefits"],
    answers: {
      hinglish: `TypeScript ke main benefits hain: early error detection, better refactoring confidence, improved developer experience (IntelliSense), self-documenting code, aur safer collaboration in teams. Large codebases mein onboarding fast hota hai kyunki types batate hain function kya expect karta hai. Open Pedagogy jaise Next.js apps mein server components aur client components ke props typed rakhna integration mistakes rokta hai.`,
      english: `Key benefits include catching bugs before runtime, safer large-scale refactors, rich IDE tooling (autocomplete, inline docs, rename symbol), living documentation via types, and clearer contracts between modules and teams. TypeScript scales well in monorepos and full-stack MERN stacks where shared types between Express routes and React components prevent drift. It also enables advanced patterns like discriminated unions and exhaustive switch checks that JavaScript alone cannot enforce.`,
      keyPoints: [
        "Early error detection at compile time",
        "Safer refactoring across files and packages",
        "Enhanced IDE autocomplete and inline documentation",
        "Shared types across frontend, backend, and database layers",
      ],
      example: {
        title: "Exhaustive check on course status in Open Pedagogy",
        code: `type CourseStatus = "draft" | "published" | "archived";

function badge(status: CourseStatus): string {
  switch (status) {
    case "draft": return "Draft";
    case "published": return "Live";
    case "archived": return "Archived";
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}`,
        language: "typescript",
        explanation:
          "Adding a new CourseStatus value without updating the switch causes a compile error — JavaScript would silently fall through to default.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is a union type? Give an example.",
    difficulty: "easy",
    tags: ["typescript", "unions", "types"],
    answers: {
      hinglish: `Union type ka matlab hai value multiple types mein se koi ek ho sakti hai — syntax pipe (|) se likhte hain. Jaise string | number matlab ya to string ya number. Ye real-world data model karta hai jahan field alag-alag shapes le sakti hai. Narrowing se andar specific type pe kaam karte hain — typeof, in operator, ya discriminant property se.`,
      english: `A union type expresses that a value may be one of several types, written with the | operator. For example, string | number accepts either primitive. Unions model optional or variant data — API fields that can be null, IDs that are string or number, or discriminated unions with a shared tag field. TypeScript narrows unions inside control flow using typeof, instanceof, in checks, or discriminant properties, giving type-safe access to members.`,
      keyPoints: [
        "Syntax: A | B means value is A or B",
        "Models optional, variant, or polymorphic data",
        "Narrow with typeof, in, instanceof, or discriminant fields",
        "Discriminated unions enable exhaustive pattern matching",
      ],
      example: {
        title: "Payment method union in Trip Planning checkout",
        code: `type PaymentMethod =
  | { kind: "card"; last4: string }
  | { kind: "upi"; vpa: string };

function pay(method: PaymentMethod) {
  if (method.kind === "card") {
    return chargeCard(method.last4); // TS knows last4 exists
  }
  return chargeUpi(method.vpa);
}`,
        language: "typescript",
        explanation:
          "The kind discriminant narrows the union so each branch only accesses valid fields — no optional chaining soup.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What are generics? Give a real-time use case.",
    difficulty: "medium",
    tags: ["typescript", "generics"],
    answers: {
      hinglish: `Generics reusable code banane dete hain jo types ko parameters ki tarah accept karte hain — function, class, ya interface type-safe rehti hai bina any use kiye. Jaise Array<T> kisi bhi element type ke saath kaam karta hai. Real-time use case: API fetch wrapper jo response type caller specify kare, ya React useState<T> jahan T state ka shape hai. Swift Call App mein generic usePaginatedFetch<T> se messages aur contacts dono type-safe fetch hote hain.`,
      english: `Generics let you write reusable, type-safe code by parameterizing types — similar to function arguments but for types. A generic function or component preserves the relationship between input and output types. Real-world uses include typed API clients, reusable React hooks, repository patterns over MongoDB collections, and utility functions like pick or groupBy. Without generics you either duplicate code per type or fall back to any, losing safety.`,
      keyPoints: [
        "Type parameters make code reusable without sacrificing safety",
        "Preserve input/output type relationships",
        "Common in arrays, promises, hooks, and API wrappers",
        "Constraints with extends limit acceptable type arguments",
      ],
      example: {
        title: "Generic paginated fetch in Swift Call App",
        code: `async function fetchPage<T>(
  url: string,
  page: number
): Promise<{ items: T[]; total: number }> {
  const res = await fetch(\`\${url}?page=\${page}\`);
  return res.json();
}

// Caller specifies T — no casting needed
const { items } = await fetchPage<ChatMessage>("/api/messages", 1);`,
        language: "typescript",
        explanation:
          "One generic helper serves messages, contacts, and call logs — each call site gets correctly typed items without duplicating fetch logic.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is typeof in TypeScript?",
    difficulty: "medium",
    tags: ["typescript", "typeof", "type-operators"],
    answers: {
      hinglish: `TypeScript mein typeof do contexts mein use hota hai. Runtime pe JavaScript wala typeof — string, number, object check karta hai. Type level pe typeof ek value se uska type extract karta hai — jaise const config = { api: "..." } as const; type Config = typeof config; se Config ka exact shape milta hai. Ye DRY rakhta hai — code change karo, type automatically update.`,
      english: `typeof in TypeScript serves two roles. At runtime it is standard JavaScript typeof for primitive checks. At the type level, typeof extracts the type of a value or variable — typeof myFunction infers the function signature; typeof config where config is a const object yields a readonly shape. This pattern keeps types in sync with implementation (single source of truth) and is widely used with as const assertions and Redux reducer state inference.`,
      keyPoints: [
        "Runtime: JavaScript typeof for primitive checks",
        "Type-level: typeof value extracts a type from a value",
        "Pairs well with as const for literal inference",
        "Avoids duplicating shapes between code and type definitions",
      ],
      example: {
        title: "Inferring config type in Trip Planning",
        code: `const tripDefaults = {
  maxStops: 10,
  currency: "INR",
} as const;

type TripDefaults = typeof tripDefaults;
// { readonly maxStops: 10; readonly currency: "INR" }

function applyDefaults(partial: Partial<TripDefaults>) {
  return { ...tripDefaults, ...partial };
}`,
        language: "typescript",
        explanation:
          "Changing tripDefaults automatically updates TripDefaults — no manual interface duplication.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is the difference between any, unknown and never?",
    difficulty: "medium",
    tags: ["typescript", "any", "unknown", "never"],
    answers: {
      hinglish: `any type checking band kar deta hai — kuch bhi assign aur access kar sakte ho, lekin safety kho jaati hai; avoid karo jahan possible ho. unknown bhi kuch bhi accept karta hai lekin use karne se pehle narrow karna padta hai — safe alternative hai any ke liye. never ka matlab value kabhi exist nahi karegi — functions jo kabhi return nahi karte (throw/ infinite loop) ya exhaustive checks mein use hota hai.`,
      english: `any disables type checking — you can assign anything to it and access any property without errors, which defeats TypeScript's purpose; use sparingly or with eslint no-explicit-any. unknown is the type-safe top type: any value can be assigned to unknown, but you must narrow (typeof, validation, type guards) before using it. never represents values that never occur — functions that always throw, infinite loops, or the bottom type in exhaustive switch checks when all cases are handled.`,
      keyPoints: [
        "any: no checking — escape hatch, avoid in new code",
        "unknown: accept anything, narrow before use — prefer over any",
        "never: unreachable values — throws, infinite loops, exhaustiveness",
        "unknown forces validation; never proves all cases handled",
      ],
      example: {
        title: "Parsing untrusted JSON safely",
        code: `function parsePayload(raw: unknown): Trip {
  if (
    typeof raw === "object" &&
    raw !== null &&
    "title" in raw &&
    typeof (raw as { title: unknown }).title === "string"
  ) {
    return raw as Trip;
  }
  throw new Error("Invalid payload");
}

// any would let you skip validation:
// const t: any = JSON.parse(input); t.foo.bar; // no error`,
        language: "typescript",
        explanation:
          "unknown forces runtime validation before treating external JSON as a Trip — any would compile unsafe property access.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What are utility types? Which ones have you used?",
    difficulty: "medium",
    tags: ["typescript", "utility-types"],
    answers: {
      hinglish: `Utility types built-in type transformations hain jo existing types se naye types banate hain. Common ones: Partial<T> (sab optional), Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Readonly<T>, ReturnType<T>. Main inhe forms aur API layers mein use karta hoon — jaise update DTO ke liye Partial<User>, create ke liye Omit<User, 'id'>. Ye boilerplate kam karte hain aur source type se sync rehte hain.`,
      english: `Utility types are built-in generic type helpers that transform existing types. Frequently used ones include Partial<T> (all properties optional), Required<T>, Pick<T, Keys>, Omit<T, Keys>, Record<Keys, Type>, Readonly<T>, ReturnType<typeof fn>, Parameters<typeof fn>, and Exclude/Extract for unions. In MERN apps I use Partial for PATCH payloads, Pick/Omit for public vs internal DTOs, Record for lookup maps, and ReturnType to type hooks derived from fetch functions without duplicating signatures.`,
      keyPoints: [
        "Built-in generics that transform types",
        "Partial, Pick, Omit common for CRUD DTOs",
        "Record for dictionaries; Readonly for immutable config",
        "ReturnType/Parameters infer from functions — DRY types",
      ],
      example: {
        title: "CRUD DTOs from a User model",
        code: `interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "student";
}

type CreateUserDto = Omit<User, "id">;
type UpdateUserDto = Partial<Pick<User, "name" | "role">>;
type UserPublic = Pick<User, "id" | "name">;`,
        language: "typescript",
        explanation:
          "When User gains a field, Omit and Pick-derived DTOs stay aligned — no separate interfaces to update manually.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is keyof and how is it used?",
    difficulty: "medium",
    tags: ["typescript", "keyof", "generics"],
    answers: {
      hinglish: `keyof operator kisi type ke saare property names ka union deta hai — jaise keyof User = "id" | "email" | "name". Isse type-safe property access milta hai: function getField<T, K extends keyof T>(obj: T, key: K) safe hai kyunki key hamesha T ki valid key hogi. Mapped types aur Pick ke saath bhi keyof heavily use hota hai.`,
      english: `keyof produces a union of string literal keys of a type. For interface User { id: string; name: string }, keyof User is "id" | "name". It powers type-safe property accessors, generic get/set helpers, and mapped types like { [K in keyof T]: T[K] }. Combined with extends keyof T, generic functions ensure the key argument always matches the object shape, catching typos at compile time.`,
      keyPoints: [
        "keyof T yields a union of T's property names",
        "Used with generics: K extends keyof T",
        "Foundation for Pick, Omit, and mapped types",
        "Prevents invalid string keys on typed objects",
      ],
      example: {
        title: "Type-safe get in Open Pedagogy",
        code: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const course = { id: "1", title: "React 101", seats: 30 };
const title = getProp(course, "title");     // string
// getProp(course, "typo"); // compile error`,
        language: "typescript",
        explanation:
          "K extends keyof T ties the key parameter to the object — invalid keys fail at compile time, not runtime.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What are mapped types?",
    difficulty: "hard",
    tags: ["typescript", "mapped-types", "advanced"],
    answers: {
      hinglish: `Mapped types existing type ki har property par loop karke naya type banate hain — syntax { [K in keyof T]: ... }. Built-in utilities jaise Partial aur Readonly internally mapped types hain. Custom mapped types se aap har field ko optional, nullable, ya transform kar sakte ho. Conditional types ke saath combine karke powerful abstractions bante hain.`,
      english: `Mapped types iterate over keys of an existing type and produce a new object type, using the syntax { [K in keyof T]: NewType }. Built-in utilities Partial<T> and Readonly<T> are implemented as mapped types. You can add modifiers (+readonly, -?, etc.) to flip optionality or mutability across all properties. Mapped types underpin advanced patterns like making all API response fields nullable or converting all values to Promise<T>.`,
      keyPoints: [
        "Syntax: { [K in keyof T]: Transform }",
        "Partial/Readonly are standard mapped type patterns",
        "Modifiers +readonly, -?, +? control property flags",
        "Combine with conditional types for complex transforms",
      ],
      example: {
        title: "Nullable fields for API loading state",
        code: `type Nullable<T> = { [K in keyof T]: T[K] | null };

interface Course {
  title: string;
  instructor: string;
}

type CourseLoading = Nullable<Course>;
// { title: string | null; instructor: string | null }`,
        language: "typescript",
        explanation:
          "While fetching course details, every field can be null in UI state — mapped type generates this from Course without hand-writing each property.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is type assertion? How does it work?",
    difficulty: "medium",
    tags: ["typescript", "type-assertion", "casting"],
    answers: {
      hinglish: `Type assertion compiler ko batata hai ki aap value ka type zyada achhe se jaante ho — syntax value as Type ya <Type>value (JSX mein avoid karo). Ye runtime pe kuch nahi karta, sirf compile-time check bypass karta hai. DOM elements, JSON parse, ya third-party libs mein kabhi zaroori hota hai. Galat assertion se runtime bugs aate hain — pehle narrow karo, assertion last resort rakho.`,
      english: `Type assertion tells the compiler to treat a value as a specific type when you have more information than inference provides. Syntax: value as Type (preferred) or <Type>value. It performs no runtime conversion — unlike C# or Java casts, it is compile-time only and can be wrong at runtime. Common uses include document.getElementById as HTMLInputElement, asserting JSON after validation, and working with legacy untyped libraries. Prefer type guards and unknown narrowing over blind assertions.`,
      keyPoints: [
        "Compile-time only — no runtime conversion or check",
        "Syntax: value as Type",
        "Use after validation or when APIs guarantee shape",
        "Wrong assertions cause runtime errors — not a safety net",
      ],
      example: {
        title: "Asserting DOM input in a form",
        code: `const el = document.getElementById("email");
// el is HTMLElement | null

const input = document.getElementById("email") as HTMLInputElement;
// or, safer:
if (el instanceof HTMLInputElement) {
  console.log(el.value);
}`,
        language: "typescript",
        explanation:
          "instanceof is safer than as when narrowing DOM nodes. Use as only when you have verified the element type (e.g. by id in your own template).",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "How does TypeScript handle null and undefined?",
    difficulty: "medium",
    tags: ["typescript", "null", "strict"],
    answers: {
      hinglish: `strictNullChecks on hone par null aur undefined alag types hain — sirf unhe assign kar sakte ho jahan explicitly allow ho. Optional property (?), union (T | null), aur non-null assertion (!) se handle karte hain. Optional chaining (?.) aur nullish coalescing (??) runtime pe safe access dete hain. Pehle JS mein null/undefined confusion common thi — TS ise explicit banata hai.`,
      english: `With strictNullChecks enabled (recommended), null and undefined are distinct types and are not assignable to other types unless explicitly included (T | null | undefined). Optional properties use ? shorthand for T | undefined. Control-flow narrowing, optional chaining (?.), and nullish coalescing (??) handle absence safely. The non-null assertion operator (!) tells the compiler a value is not null/undefined — use sparingly. This catches a huge class of runtime errors from missing API fields or uninitialized state.`,
      keyPoints: [
        "strictNullChecks treats null/undefined as real types",
        "Optional ? and unions T | null model absence",
        "?. and ?? for safe access and defaults",
        "Avoid overusing ! — prefer narrowing and guards",
      ],
      example: {
        title: "Optional instructor in Open Pedagogy course",
        code: `interface Course {
  title: string;
  instructor?: string; // string | undefined
}

function label(course: Course) {
  return course.instructor?.toUpperCase() ?? "TBA";
}`,
        language: "typescript",
        explanation:
          "Without strict null checks, instructor could be assumed string and .toUpperCase() would throw. Optional chaining and ?? provide a safe fallback.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "How would you migrate a JavaScript project to TypeScript?",
    difficulty: "medium",
    tags: ["typescript", "migration"],
    answers: {
      hinglish: `Migration gradual hoti hai: pehle typescript aur types install karo, tsconfig.json banao (allowJs: true, strict false shuru mein). Files .ts/.tsx mein rename karo module-by-module — pehle shared types, utils, phir components. any se start karke strictness badhao. @types packages add karo npm libs ke liye. CI mein tsc --noEmit add karo. Poora ek din mein mat karo — critical paths pehle type karo.`,
      english: `Migrate incrementally: install typescript and @types/node, add tsconfig with allowJs and checkJs optional, then rename files to .ts/.tsx starting with leaf modules (utils, types) before core app code. Begin with loose strictness, replace any over time, and enable strictNullChecks and noImplicitAny gradually. Add @types/* for dependencies, use JSDoc @typedef in .js files if you cannot rename yet, and run tsc --noEmit in CI. For Next.js or CRA, use official TypeScript templates or follow framework guides for path aliases and JSX settings.`,
      keyPoints: [
        "Gradual migration — allowJs, rename file by file",
        "Start loose strictness, tighten over sprints",
        "Type shared utilities and API contracts first",
        "Add tsc --noEmit to CI; use @types for libraries",
      ],
      example: {
        title: "Incremental tsconfig for a MERN app",
        code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": false,
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}`,
        language: "json",
        explanation:
          "allowJs lets .js and .ts coexist. Flip strict to true and enable noImplicitAny once core modules are typed.",
      },
    },
  }),

  createQuestion({
    category: "typescript",
    question: "What is the difference between interface and type?",
    difficulty: "medium",
    tags: ["typescript", "types", "interfaces"],
    answers: {
      hinglish: `Ye Q3 se overlap karta hai — short recap: interface object contracts aur declaration merging ke liye; type unions, tuples, mapped types ke liye zyada powerful. Performance-wise compile time pe dono same hain. Team style guide decide karta hai — consistency important hai. Agar library extend karni ho to interface; agar complex union chahiye to type. Dono ko ek hi object describe karne ke liye mix mat karo bina reason ke.`,
      english: `This overlaps with the type vs interface question — recap: interfaces excel at object shapes and declaration merging (augmenting third-party modules); type aliases handle unions, intersections, tuples, and advanced mapped/conditional types. Neither exists at runtime. Performance is identical. Pick one convention per codebase for object shapes — many teams use interface for public object contracts and type for everything else. The compiler treats structurally equivalent shapes as compatible regardless of keyword used.`,
      keyPoints: [
        "Overlaps with type vs interface — same core distinction",
        "interface: merging, extends, object-focused APIs",
        "type: unions, tuples, mapped/conditional types",
        "Structural typing — shape matters, not keyword",
      ],
      example: {
        title: "When to pick which — quick reference",
        code: `// interface — extendable, mergeable object contract
interface ApiClient {
  get<T>(url: string): Promise<T>;
}

// type — discriminated union (interface cannot do this cleanly)
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };`,
        language: "typescript",
        explanation:
          "Use interface for stable object contracts like ApiClient. Use type for Result-style unions that interfaces cannot express as a single merged declaration.",
      },
    },
  }),
];
