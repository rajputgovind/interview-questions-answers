import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const javascriptQuestions: Question[] = [
  createQuestion({
    category: "javascript",
    question: "Explain the JavaScript event loop with an example.",
    difficulty: "medium",
    tags: ["event-loop", "async", "concurrency"],
    answers: {
      hinglish: `JavaScript single-threaded hai, matlab ek time pe ek hi kaam karta hai. Event loop woh mechanism hai jo call stack, Web APIs, callback queue aur microtask queue ko coordinate karta hai. Pehle synchronous code chalta hai, phir microtasks (jaise Promise.then), phir macrotasks (jaise setTimeout). Swift Call App mein jab Socket.io se real-time messages aate hain, event loop un callbacks ko tab process karta hai jab main thread free ho.`,
      english: `JavaScript runs on a single main thread, and the event loop orchestrates when work gets executed. Synchronous code runs first on the call stack; when async APIs (timers, fetch, DOM events) finish, their callbacks are queued. Microtasks (Promise callbacks, queueMicrotask) drain completely before the next macrotask (setTimeout, I/O). In a Socket.io app like Swift Call, incoming message handlers are scheduled through this loop so the UI stays responsive while network I/O happens in the background.`,
      keyPoints: [
        "Single-threaded runtime with a non-blocking event loop",
        "Microtasks run before the next macrotask",
        "Call stack must be empty before queued callbacks execute",
        "Explains why async code order differs from source order",
      ],
      example: {
        title: "Event loop ordering in Swift Call App",
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2`,
        language: "javascript",
        explanation:
          "When a Socket.io client reconnects, connection handlers and Promise-based auth checks interleave exactly like this — sync logs first, then microtasks, then timer callbacks.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between microtasks and macrotasks?",
    difficulty: "medium",
    tags: ["event-loop", "promises", "async"],
    answers: {
      hinglish: `Macrotasks woh tasks hain jo setTimeout, setInterval, I/O callbacks jaise APIs queue karte hain — ek event loop tick mein ek macrotask process hota hai. Microtasks Promise.then, queueMicrotask, aur MutationObserver se aate hain, aur har macrotask ke baad poori microtask queue empty ho jati hai. Isliye Promise callback hamesha setTimeout(0) se pehle chalega, chahe delay 0 hi kyun na ho.`,
      english: `Macrotasks (tasks) include setTimeout, setInterval, message events, and I/O callbacks; the event loop picks one macrotask per iteration. Microtasks include Promise reactions and queueMicrotask callbacks; after each macrotask, the engine drains the entire microtask queue before rendering or the next macrotask. This guarantees Promise continuations run before deferred timers, which is critical when chaining API calls in apps like Trip Planning after JWT validation.`,
      keyPoints: [
        "Macrotasks: timers, I/O, UI events — one per loop tick",
        "Microtasks: Promise.then, queueMicrotask — fully drained each tick",
        "Microtasks always run before the next macrotask",
        "Order matters for race conditions and UI updates",
      ],
      example: {
        title: "Microtask vs macrotask in Trip Planning auth flow",
        code: `fetch("/api/trips")
  .then(res => res.json())   // microtask
  .then(data => renderTrips(data));

setTimeout(() => showToast("Loaded"), 0);  // macrotask — runs after .then chain`,
        language: "javascript",
        explanation:
          "After JWT-protected fetch resolves, all Promise .then handlers finish as microtasks before the success toast timer fires.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between var, let and const?",
    difficulty: "easy",
    tags: ["scope", "variables", "es6"],
    answers: {
      hinglish: `var function-scoped hai aur hoisted hota hai — redeclare bhi kar sakte ho. let aur const block-scoped hain (if, loop, {} ke andar). let ko reassign kar sakte ho, const ko nahi — lekin const objects/arrays ki properties change ho sakti hain. Modern code mein default const use karo, jahan value change ho let lo, var avoid karo kyunki loop bugs aur hoisting surprises deta hai.`,
      english: `var is function-scoped, hoisted with an initial value of undefined, and can be redeclared in the same scope. let and const are block-scoped and live in the temporal dead zone until initialized; let allows reassignment, const does not (though object contents can still mutate). Best practice in projects like Open Pedagogy (Next.js) is const by default, let when rebinding is needed, and avoid var to prevent subtle loop and closure bugs.`,
      keyPoints: [
        "var: function-scoped, hoisted, redeclarable",
        "let/const: block-scoped, TDZ until initialization",
        "const prevents rebinding, not deep immutability",
        "Prefer const > let > avoid var in modern code",
      ],
      example: {
        title: "Block scope in Open Pedagogy course list",
        code: `for (let i = 0; i < courses.length; i++) {
  buttons[i].onclick = () => enroll(courses[i].id); // correct i
}
// with var, all handlers would see the final i value`,
        language: "javascript",
        explanation:
          "Using let in event handlers inside a loop ensures each enrollment button captures the correct course index — a common Next.js client component pattern.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the Temporal Dead Zone?",
    difficulty: "medium",
    tags: ["scope", "let", "hoisting"],
    answers: {
      hinglish: `Temporal Dead Zone (TDZ) woh period hai jab let ya const declare ho chuke hain lekin initialize nahi hue — is window mein unhe access karoge to ReferenceError aayega. var isme nahi aata kyunki woh undefined ke saath hoist hota hai. TDZ bugs tab dikhte hain jab aap variable se pehle use karne ki koshish karte ho, especially destructuring ya class fields mein.`,
      english: `The Temporal Dead Zone is the span from the start of a block until a let or const declaration is evaluated. Accessing the binding in that window throws a ReferenceError, unlike var which is hoisted as undefined. TDZ enforces that variables cannot be used before initialization, catching bugs early. In Trip Planning, accessing a trip ID with let before the JWT payload is parsed would fail fast instead of silently using undefined.`,
      keyPoints: [
        "Applies to let and const, not var",
        "ReferenceError if accessed before declaration line runs",
        "Exists because bindings are hoisted but uninitialized",
        "Encourages declare-before-use discipline",
      ],
      example: {
        title: "TDZ with const trip config",
        code: `console.log(maxStops); // ReferenceError — TDZ
const maxStops = getUserLimit(jwtPayload);`,
        language: "javascript",
        explanation:
          "Moving the JWT decode above the usage avoids TDZ errors when configuring per-user trip limits.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "Explain hoisting with examples.",
    difficulty: "easy",
    tags: ["hoisting", "scope", "functions"],
    answers: {
      hinglish: `Hoisting ka matlab hai JS engine declarations ko scope ke top pe move kar deta hai compile time pe — lekin sirf declaration hoist hoti hai, initialization nahi. var undefined ke saath hoist hota hai; function declarations poori body ke saath hoist hote hain isliye call kar sakte ho pehle. let/const hoist hote hain par TDZ mein rehte hain. Class declarations bhi TDZ follow karte hain.`,
      english: `Hoisting is JavaScript's behavior of processing declarations before execution. var declarations are hoisted and initialized to undefined; function declarations are fully hoisted, so you can call them before their line in source. let, const, and class declarations are hoisted but remain in the TDZ until their line runs. Understanding this prevents surprises when organizing utility functions in a Next.js module like Open Pedagogy's shared helpers.`,
      keyPoints: [
        "Declarations processed before code execution",
        "var → undefined; function declarations → fully available",
        "let/const/class → hoisted but in TDZ",
        "Only declarations hoist, not assignments",
      ],
      example: {
        title: "Function declaration vs const arrow",
        code: `greet("Raj"); // works — hoisted
function greet(name) { return \`Hi \${name}\`; }

sayHi("Raj"); // TypeError — sayHi is TDZ/uninitialized
const sayHi = (name) => \`Hi \${name}\`;`,
        language: "javascript",
        explanation:
          "Team conventions often use function declarations for hoisted utilities and const arrows for callbacks passed to React components.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between == and ===?",
    difficulty: "easy",
    tags: ["operators", "type-coercion", "comparison"],
    answers: {
      hinglish: `== loose equality hai — pehle types ko coerce karta hai phir compare karta hai, jaise "5" == 5 true hota hai. === strict equality hai — type aur value dono match hone chahiye, coercion nahi hota. Interview aur production dono mein === prefer karo; sirf null/undefined check ke liye x == null acceptable hai. Weird cases jaise [] == false se bugs aate hain loose equality se.`,
      english: `== performs abstract equality comparison with type coercion (e.g., "5" == 5 is true). === performs strict equality — no coercion; both type and value must match. Always prefer === in application code to avoid subtle bugs; the lone exception is checking for null or undefined with value == null. In Trip Planning API responses, strict checks ensure JWT expiry numbers are not accidentally coerced from strings.`,
      keyPoints: [
        "== coerces types; === does not",
        "=== is the default choice in production code",
        "== null checks both null and undefined",
        "Coercion causes surprising results with objects and arrays",
      ],
      example: {
        title: "Strict check on Socket.io user ID",
        code: `if (socket.userId === payload.sub) {
  joinRoom(roomId);
}
// "123" === 123 is false — catches type mismatch from token`,
        language: "javascript",
        explanation:
          "Swift Call App uses strict equality when matching authenticated socket users to prevent coerced ID mismatches.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How does the this keyword work in JavaScript?",
    difficulty: "medium",
    tags: ["this", "context", "functions"],
    answers: {
      hinglish: `this runtime pe decide hota hai — kaise function call hua uspe depend karta hai, define kahan hua uspe nahi. Normal function call mein non-strict mode mein global object, strict mode mein undefined. Method call mein this woh object hota hai jiske saath call hua. Arrow functions apna this nahi rakhte — lexical this inherit karte hain. call/apply/bind se manually set kar sakte ho.`,
      english: `this is determined at call time, not definition time. In a plain function call, this is undefined in strict mode (or the global object otherwise). When invoked as obj.method(), this is obj. Arrow functions lexically capture this from the enclosing scope. Explicit binding uses call, apply, or bind. In React class components or Socket.io event handlers, losing this is a common bug — arrow methods or bind fix it.`,
      keyPoints: [
        "this depends on how a function is invoked",
        "Arrow functions inherit lexical this",
        "Method extraction loses implicit binding",
        "call/apply/bind set this explicitly",
      ],
      example: {
        title: "this in Swift Call socket handler",
        code: `class CallManager {
  constructor() { this.activeCall = null; }
  onConnect = () => {
    this.activeCall = null; // arrow preserves class instance this
  };
}`,
        language: "javascript",
        explanation:
          "Socket.io passes callbacks without a receiver; arrow class fields keep this pointing at the CallManager instance.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "Explain call(), apply() and bind() with examples.",
    difficulty: "medium",
    tags: ["this", "functions", "bind"],
    answers: {
      hinglish: `Teeno methods Function.prototype pe hain aur this set karne ke liye use hote hain. call() arguments individually leta hai aur turant invoke karta hai. apply() same hai but arguments array mein dete ho. bind() naya function return karta hai jisme this permanently set ho — baad mein invoke karo. Borrowing methods ya event handlers fix karne ke liye bahut useful hain.`,
      english: `call, apply, and bind control the this value of a function. call invokes immediately with individual arguments; apply invokes immediately with an arguments array. bind returns a new function with a fixed this (and optionally partial args) for later invocation. Use them to reuse methods across objects or fix handler context. In Open Pedagogy, you might bind a analytics tracker to a component instance before passing it to a debounced scroll listener.`,
      keyPoints: [
        "call(fn, arg1, arg2) — invoke now",
        "apply(fn, [args]) — invoke now with array",
        "bind(fn) — returns new function, does not invoke",
        "All three set or fix the this context",
      ],
      example: {
        title: "Borrowing Array.prototype.slice",
        code: `function logTypes() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args.map(a => typeof a));
}
const boundLog = logTypes.bind({ prefix: "[Trip]" });`,
        language: "javascript",
        explanation:
          "Before rest parameters were universal, apply/call converted array-like NodeList results from Next.js getStaticProps into real arrays.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is a closure? Give a real-world use case.",
    difficulty: "medium",
    tags: ["closures", "scope", "functions"],
    answers: {
      hinglish: `Closure tab banta hai jab function apne outer scope ke variables ko reference karta hai, chahe outer function return ho chuka ho. Inner function ko 'backpack' milti hai outer ke live bindings ki. Real use cases: data privacy (counters, modules), partial application, aur callbacks jo creation time ki state yaad rakhein. React hooks bhi closures pe heavily depend karte hain.`,
      english: `A closure is created when a function retains access to variables from its lexical scope even after the outer function has returned. The inner function closes over those bindings, keeping them alive. Real-world uses include encapsulating private state, factory functions, and callbacks that remember configuration. In Swift Call App, a closure around a socket room ID ensures each message handler only emits to the correct call session.`,
      keyPoints: [
        "Function + remembered lexical environment",
        "Enables private variables without classes",
        "Common in callbacks, factories, and modules",
        "Watch for stale closures in loops and hooks",
      ],
      example: {
        title: "Private rate limiter for Socket.io emits",
        code: `function createRateLimiter(maxPerSec) {
  let count = 0;
  return () => {
    if (++count > maxPerSec) throw new Error("Rate limited");
    count = 0;
  };
}
const guard = createRateLimiter(10);`,
        language: "javascript",
        explanation:
          "count stays private via closure — each caller gets an isolated limiter without polluting global scope.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How does prototypical inheritance work?",
    difficulty: "medium",
    tags: ["prototype", "inheritance", "objects"],
    answers: {
      hinglish: `JavaScript mein objects dusre objects se inherit karte hain — class-based nahi, prototype chain based. Har object ka hidden [[Prototype]] hota hai (Object.getPrototypeOf se dekho). Property lookup chain mein upar jaati hai jab tak null na mile. Constructor functions ka prototype shared hota hai; ES6 class syntax sugar hai isi model pe. hasOwnProperty se check karo property object pe hai ya prototype pe.`,
      english: `JavaScript uses prototypal inheritance: each object has an internal [[Prototype]] link. Property lookup walks the chain until the key is found or the chain ends at null. Constructor functions expose a shared prototype object; ES6 classes are syntactic sugar over this model. Methods on Object.prototype affect all objects, so prefer Object.create(null) for dictionaries. Understanding the chain helps debug unexpected properties in shared Socket.io event payload objects.`,
      keyPoints: [
        "Objects delegate to their prototype via [[Prototype]]",
        "Lookup walks the chain until null",
        "Classes compile to constructor + prototype",
        "Use hasOwnProperty vs in for own vs inherited keys",
      ],
      example: {
        title: "Extending a base EventEmitter pattern",
        code: `function CallSession(id) {
  this.id = id;
}
CallSession.prototype.end = function () {
  socket.emit("call:end", { id: this.id });
};
const session = new CallSession("abc");
session.end(); // finds end on CallSession.prototype`,
        language: "javascript",
        explanation:
          "Before switching to ES classes, Swift Call modeled sessions with constructor functions and shared prototype methods.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between null and undefined?",
    difficulty: "easy",
    tags: ["types", "null", "undefined"],
    answers: {
      hinglish: `undefined matlab value assign nahi hui — variable declare hai par value nahi, ya function ne kuch return nahi kiya. null intentional empty value hai — developer ne explicitly 'kuch nahi' set kiya. typeof undefined 'undefined' hai, typeof null weirdly 'object' (historical bug). API design mein null missing resource ke liye, undefined optional param ke liye use hota hai.`,
      english: `undefined means a variable has been declared but not assigned, a missing object property, or an implicit function return. null is an intentional assignment representing no value or empty reference. typeof undefined is "undefined"; typeof null is "object" (a long-standing language quirk). In Trip Planning, a trip without a cover image might be null in JSON, while an omitted optional field stays undefined until parsed.`,
      keyPoints: [
        "undefined: absent assignment or missing property",
        "null: explicit empty value by developer/API",
        "typeof null === 'object' (legacy quirk)",
        "Use null for intentional emptiness in APIs",
      ],
      example: {
        title: "JWT payload optional fields in Trip Planning",
        code: `const user = { name: "Asha", avatar: null };
// avatar explicitly none
console.log(user.phone); // undefined — never set`,
        language: "javascript",
        explanation:
          "Backend sends null for cleared avatar URLs and omits phone until verified — front-end checks differ for each case.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is event delegation? Where have you used it?",
    difficulty: "medium",
    tags: ["dom", "events", "performance"],
    answers: {
      hinglish: `Event delegation matlab ek parent element pe single listener lagao jo bubbling events handle kare, har child pe alag listener ki jagah. Event target se check karo kaun sa child click hua (event.target ya closest). Benefits: kam memory, dynamically added elements bina naye listeners ke kaam karte hain. Open Pedagogy ke course list ya chat message list mein maine yahi pattern use kiya — performance aur cleanup dono better rehte hain.`,
      english: `Event delegation attaches one listener on a parent element and relies on event bubbling to handle interactions on descendants. Use event.target or closest() to identify which child triggered the event. It reduces listener count, simplifies cleanup, and works for dynamically inserted nodes without rebinding. In Open Pedagogy's Next.js app, delegating clicks on a lesson list container handles items rendered from CMS data without per-row listeners.`,
      keyPoints: [
        "Single parent listener + event bubbling",
        "Identify source via target/closest",
        "Efficient for long or dynamic lists",
        "Not suitable when you need capture-only on many nodes",
      ],
      example: {
        title: "Delegated clicks on Open Pedagogy lesson list",
        code: `document.querySelector("#lesson-list").addEventListener("click", (e) => {
  const row = e.target.closest("[data-lesson-id]");
  if (row) router.push(\`/lesson/\${row.dataset.lessonId}\`);
});`,
        language: "javascript",
        explanation:
          "New lessons appended from SSR or client fetch automatically work — no addEventListener per row.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What are promises? How do they work?",
    difficulty: "medium",
    tags: ["promises", "async", "fetch"],
    answers: {
      hinglish: `Promise ek object hai jo async operation ke eventual result ko represent karta hai — states: pending, fulfilled, ya rejected. .then() success handle karta hai, .catch() errors, .finally() cleanup. Promise chain flat async code deti hai callback hell se bach ke. Fetch, JWT verify, ya Socket.io ack callbacks sab Promise pattern follow karte hain modern apps mein.`,
      english: `A Promise represents the eventual completion or failure of an asynchronous operation. It starts pending, then settles as fulfilled with a value or rejected with a reason. then handles success, catch handles failure, and finally runs regardless. Promises chain cleanly and integrate with async/await. Trip Planning uses fetch().then() to load trips after attaching a JWT header, propagating HTTP errors through catch for unified error UI.`,
      keyPoints: [
        "Three states: pending, fulfilled, rejected",
        "then/catch/finally compose async workflows",
        "Errors propagate down the chain unless caught",
        "Promise.all/race combine multiple async operations",
      ],
      example: {
        title: "Fetching trips with JWT in Trip Planning",
        code: `fetch("/api/trips", {
  headers: { Authorization: \`Bearer \${token}\` },
})
  .then(res => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  })
  .then(setTrips)
  .catch(showError);`,
        language: "javascript",
        explanation:
          "Non-OK responses reject the chain so the UI shows one error path instead of parsing invalid JSON.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between Promise.all and Promise.allSettled?",
    difficulty: "medium",
    tags: ["promises", "async", "error-handling"],
    answers: {
      hinglish: `Promise.all sab promises parallel chalata hai aur jab sab resolve hon tab array of results deta hai — ek bhi reject hua to poora fail ho jata hai (fail-fast). Promise.allSettled har promise ka outcome wait karta hai — chahe resolve ho ya reject — aur { status, value/reason } array deta hai. Jab partial success chahiye, jaise multiple API calls mein kuch fail ho sakti hain, allSettled better hai.`,
      english: `Promise.all runs promises concurrently and resolves to an array of results when all succeed; if any rejects, the whole promise rejects immediately (fail-fast). Promise.allSettled waits for every promise to finish regardless of outcome, returning { status: 'fulfilled'|'rejected', value|reason } per entry. Use all when all results are required; use allSettled when you need a full report, e.g., prefetching Open Pedagogy lesson assets where some CDN URLs may 404 without blocking others.`,
      keyPoints: [
        "Promise.all — fail-fast on first rejection",
        "Promise.allSettled — always waits for all, never rejects",
        "all for required dependencies; allSettled for partial reports",
        "Both run promises concurrently, not sequentially",
      ],
      example: {
        title: "Prefetching lesson assets in Open Pedagogy",
        code: `const results = await Promise.allSettled(
  lessonIds.map(id => fetch(\`/api/lesson/\${id}/preview\`))
);
const ok = results.filter(r => r.status === "fulfilled");`,
        language: "javascript",
        explanation:
          "One broken preview URL does not prevent rendering thumbnails for lessons that loaded successfully.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How does async/await work internally?",
    difficulty: "hard",
    tags: ["async-await", "promises", "generators"],
    answers: {
      hinglish: `async/await syntactic sugar hai Promises ke upar. async function hamesha Promise return karta hai; await expression ko pause karta hai jab tak Promise settle na ho, bina thread block kiye. Engine internally async function ko state machine mein transform karta hai — har await ke baad continuation microtask queue mein schedule hota hai. Isliye async code sequential lagta hai par non-blocking rehta hai.`,
      english: `async/await is syntactic sugar over Promises. An async function always returns a Promise; await pauses execution within that function until the awaited Promise settles, yielding control back to the event loop. Compilers transform async functions into continuations scheduled as microtasks after each await. Errors can use try/catch instead of .catch chains. In Trip Planning, awaiting sequential JWT refresh then trip fetch reads linearly while remaining non-blocking.`,
      keyPoints: [
        "async functions always return a Promise",
        "await pauses until settlement, then resumes as microtask",
        "try/catch works for rejected awaited promises",
        "Under the hood: Promise + generator-like state machine",
      ],
      example: {
        title: "Sequential auth then fetch in Trip Planning",
        code: `async function loadDashboard() {
  try {
    const token = await refreshJwt();
    const trips = await fetchTrips(token);
    return trips;
  } catch (e) {
    redirectToLogin();
  }
}`,
        language: "javascript",
        explanation:
          "Each await suspends loadDashboard without blocking the UI thread; resumption runs as microtasks after JWT and network complete.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between map(), forEach() and filter()?",
    difficulty: "easy",
    tags: ["arrays", "functional", "iteration"],
    answers: {
      hinglish: `Teeno Array methods hain par purpose alag hai. map() naya array return karta hai har element ko transform karke — original change nahi hota. forEach() sirf side effects ke liye — kuch return nahi karta (undefined). filter() naya array deta hai jisme sirf woh elements hain jo predicate pass karein. Chain kar sakte ho: trips.filter(...).map(...) common pattern hai.`,
      english: `map transforms each element and returns a new array of the same length. forEach executes a callback for each element and returns undefined — use it for side effects only. filter returns a new array containing elements that pass a predicate. None mutate the original array. In Open Pedagogy, filtering published courses then mapping to card props is a typical React data-prep pipeline before rendering.`,
      keyPoints: [
        "map → transform, same length, new array",
        "forEach → iterate for side effects, returns undefined",
        "filter → subset matching condition, new array",
        "Prefer map/filter over mutating loops for clarity",
      ],
      example: {
        title: "Preparing course cards in Open Pedagogy",
        code: `const cards = courses
  .filter(c => c.status === "published")
  .map(c => ({ id: c.id, title: c.title, slug: c.slug }));`,
        language: "javascript",
        explanation:
          "filter removes drafts; map shapes props for Next.js page components without altering the source CMS array.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How would you deep clone an object?",
    difficulty: "medium",
    tags: ["objects", "clone", "structured-clone"],
    answers: {
      hinglish: `Shallow copy sirf top level copy karta hai — nested objects reference share karte hain. Deep clone ke liye options: structuredClone() (modern, Dates/Maps support), JSON.parse(JSON.stringify(obj)) simple objects ke liye (functions/Dates lose), ya recursive custom function. Libraries jaise lodash cloneDeep bhi use kar sakte ho. Trip state ya socket message history clone karte waqt method choose karo data type ke hisaab se.`,
      english: `Deep cloning duplicates nested structures so mutations do not affect the original. structuredClone() is the modern built-in for most structured data (handles Date, Map, Set; not functions or DOM nodes). JSON round-trip works for plain JSON-serializable objects but drops functions, undefined, and Dates. Custom recursion or lodash.cloneDeep covers edge cases. When undoing edits in Trip Planning itinerary drafts, deep clone before optimistic UI updates prevents shared nested leg references.`,
      keyPoints: [
        "structuredClone() — preferred for structured data",
        "JSON trick — simple POJOs only, many types lost",
        "Recursive clone — full control, watch cycles with WeakMap",
        "Shallow spread {...obj} is not a deep clone",
      ],
      example: {
        title: "Cloning trip itinerary before edit in Trip Planning",
        code: `const draft = structuredClone(activeTrip);
draft.legs[0].city = "Goa"; // activeTrip.legs[0] unchanged`,
        language: "javascript",
        explanation:
          "Optimistic edit UI works on draft; cancel restores from activeTrip without nested reference bugs.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the difference between shallow copy and deep copy?",
    difficulty: "easy",
    tags: ["objects", "clone", "references"],
    answers: {
      hinglish: `Shallow copy naya object banata hai lekin nested objects/functions same reference share karte hain — spread {...obj}, Object.assign, ya Array.slice shallow hain. Deep copy poori tree recursively copy karta hai — nested changes isolated hote hain. Agar nested data mutate karna hai bina original ko touch kiye, deep chahiye; sirf top-level fields change karne hain to shallow kaafi ho sakta hai.`,
      english: `A shallow copy creates a new top-level object but nested objects remain shared by reference — spread, Object.assign, and slice are shallow. A deep copy recursively duplicates nested structures so changes in the copy do not affect the original. Choose shallow for flat config merges; use deep clone when nested arrays/objects must diverge, such as duplicating a Socket.io call participant list before local reordering in Swift Call App.`,
      keyPoints: [
        "Shallow: new container, shared nested references",
        "Deep: independent nested copies",
        "Spread/assign/slice are shallow only",
        "Mutation on nested props affects both if shallow",
      ],
      example: {
        title: "Shallow vs deep with call participants",
        code: `const shallow = { ...call, participants: call.participants };
shallow.participants.push(user); // mutates call.participants too

const deep = structuredClone(call);
deep.participants.push(user); // isolated`,
        language: "javascript",
        explanation:
          "Swift Call UI preview uses deep clone so staging participant order does not alter live call state.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How does function currying work?",
    difficulty: "medium",
    tags: ["functional", "currying", "functions"],
    answers: {
      hinglish: `Currying multi-argument function ko chain of single-argument functions mein convert karta hai. Har call ek argument leta hai aur naya function return karta hai jab tak saare args collect na ho jayein. Benefit: partial application — pehle kuch args fix kar do, baad mein baaki pass karo. Configuration builders aur reusable event handlers mein useful hai.`,
      english: `Currying transforms a function f(a, b, c) into f(a)(b)(c), each step returning a new function until all arguments are supplied. It enables partial application — fixing some parameters early and reusing the resulting function. Useful for configuring utilities or creating specialized handlers. In Open Pedagogy, currying a fetchWithBase('/api') then('/courses') avoids repeating base URL and auth headers across Next.js data loaders.`,
      keyPoints: [
        "Transforms n-ary function into nested unary functions",
        "Enables partial application of arguments",
        "Improves reusability and composition",
        "Closely related to bind(fn, arg1) partial application",
      ],
      example: {
        title: "Curried API builder for Open Pedagogy",
        code: `const fetchWith = (base) => (path) => (opts) =>
  fetch(\`\${base}\${path}\`, opts);

const fetchCms = fetchWith(process.env.CMS_URL);
fetchCms("/courses")({ headers: { Accept: "json" } });`,
        language: "javascript",
        explanation:
          "Base URL fixed once; each route call only supplies path and options — DRY across getStaticProps loaders.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is memoization? How have you used it?",
    difficulty: "medium",
    tags: ["performance", "memoization", "caching"],
    answers: {
      hinglish: `Memoization expensive pure function ke results cache karta hai same inputs ke liye — next time compute ki jagah cached value return. Function + Map/object se implement kar sakte ho; arguments ko cache key banate ho. React mein useMemo/memo bhi isi idea pe hain. Maine Trip Planning mein geocoding results memoize kiye taaki same city bar-bar API hit na kare; Open Pedagogy mein markdown parse cache kiya.`,
      english: `Memoization caches the return value of expensive pure functions keyed by arguments, returning cached results on repeated calls. Implement with a Map storing serialized args → result. React's useMemo and memo apply the same idea to computations and components. In Trip Planning, memoizing distance calculations between repeated city pairs avoided redundant work during itinerary drag-and-drop. Ensure functions are pure and watch memory growth on unbounded keys.`,
      keyPoints: [
        "Cache results of pure functions by input key",
        "Trade memory for repeated computation savings",
        "Requires stable cache keys (serialize args carefully)",
        "React useMemo/memo are framework-level memoization",
      ],
      example: {
        title: "Memoized geocode lookup in Trip Planning",
        code: `const cache = new Map();
function geocode(city) {
  if (cache.has(city)) return cache.get(city);
  const coords = expensiveLookup(city);
  cache.set(city, coords);
  return coords;
}`,
        language: "javascript",
        explanation:
          "Dragging legs between the same cities reuses cached coordinates instead of hitting the geocoding API again.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is the call stack?",
    difficulty: "easy",
    tags: ["call-stack", "execution", "debugging"],
    answers: {
      hinglish: `Call stack woh LIFO structure hai jahan JS track karta hai kaun sa function abhi run ho raha hai. Function call hota hai to stack pe push, return pe pop. Stack trace error mein dikhata hai kaunse functions chain mein the. Browser DevTools mein breakpoints pe stack inspect kar sakte ho. Single-threaded hone ki wajah se ek time pe ek stack frame execute hota hai.`,
      english: `The call stack is a LIFO structure tracking active function executions. Each invocation pushes a stack frame; returning pops it. Stack traces in errors list frames from the throw site up to the entry point. DevTools let you inspect frames during debugging. Because JavaScript is single-threaded, one call stack runs on the main thread — long synchronous work blocks UI and delays Socket.io heartbeat handling in Swift Call App.`,
      keyPoints: [
        "LIFO: push on call, pop on return",
        "Stack traces map errors to the call chain",
        "Single stack on the main JS thread",
        "Deep or infinite recursion exhausts stack space",
      ],
      example: {
        title: "Stack trace in Swift Call connect flow",
        code: `function connect() { authenticate(); }
function authenticate() { parseToken(); }
function parseToken() { throw new Error("JWT expired"); }
// Stack: parseToken → authenticate → connect`,
        language: "javascript",
        explanation:
          "Reading the stack trace quickly shows whether failure happened during token parse vs socket connect setup.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What causes a stack overflow?",
    difficulty: "medium",
    tags: ["call-stack", "recursion", "errors"],
    answers: {
      hinglish: `Stack overflow tab hota hai jab call stack ki limit exceed ho jaye — usually infinite recursion ya bahut deep recursion bina base case ke. Har recursive call naya stack frame push karta hai. Fix: proper base case, tail-call optimization (limited support), ya recursion ko loop mein convert karo. Mutual recursion ya accidental self-calling callbacks bhi cause kar sakte hain.`,
      english: `A stack overflow occurs when the call stack exceeds its maximum size, typically from unbounded or missing-base-case recursion. Each recursive call adds a frame until memory for the stack is exhausted, throwing RangeError: Maximum call stack size exceeded. Fix with correct base cases, iterative alternatives, or trampolining for deep recursion. In Trip Planning, recursively flattening a deeply nested folder tree without depth guards triggered this in development until replaced with an iterative walk.`,
      keyPoints: [
        "Exceeding max call stack frames → RangeError",
        "Common cause: infinite/missing-base-case recursion",
        "Mutual recursion and runaway callbacks also trigger it",
        "Prefer iteration or explicit stack for deep trees",
      ],
      example: {
        title: "Runaway recursion flattening nested folders",
        code: `function flatten(node) {
  return [node, ...node.children.flatMap(flatten)];
}
// 10k-deep tree → stack overflow without iterative approach`,
        language: "javascript",
        explanation:
          "Replacing flatMap recursion with an explicit while-loop and queue processed Trip Planning's nested trip folders safely.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "How do you handle errors in JavaScript?",
    difficulty: "medium",
    tags: ["error-handling", "try-catch", "promises"],
    answers: {
      hinglish: `Sync code mein try/catch/finally — errors throw karke catch block mein handle karo. Promises mein .catch() ya async/await ke saath try/catch. Global level pe window.onerror ya unhandledrejection listener. Custom Error classes se meaningful messages do. Production mein log karo (Sentry), user ko friendly message dikhao, sensitive details mat leak karo — especially JWT/auth errors mein.`,
      english: `Use try/catch/finally for synchronous code and thrown exceptions. For Promises, chain .catch or wrap await in try/catch. Listen for window 'error' and 'unhandledrejection' to catch stray failures. Throw custom Error subclasses with clear messages and optional cause. In production apps like Swift Call, normalize Socket.io disconnect errors in one handler, log to monitoring, and show actionable UI without exposing token details.`,
      keyPoints: [
        "try/catch for sync; .catch / async try/catch for Promises",
        "Always handle or rethrow — avoid silent failures",
        "Global handlers for uncaught sync/async errors",
        "Custom errors + centralized logging for production",
      ],
      example: {
        title: "Unified error handling in Trip Planning API layer",
        code: `async function api(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  } catch (e) {
    logger.error(e);
    throw e;
  }
}`,
        language: "javascript",
        explanation:
          "ApiError wraps HTTP failures so UI can branch on status 401 (refresh JWT) vs 500 (retry later).",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question: "What is a higher order function? Give an example.",
    difficulty: "easy",
    tags: ["functional", "higher-order", "arrays"],
    answers: {
      hinglish: `Higher order function woh function hai jo ya to dusra function argument ke taur pe leta hai ya function return karta hai — ya dono. map, filter, reduce built-in HOFs hain. Custom HOFs se repetition kam hoti hai — jaise withAuth(fn) jo JWT check karke original fn call kare. Functional composition aur middleware patterns isi pe based hain.`,
      english: `A higher-order function takes another function as an argument, returns a function, or both. Array methods map, filter, and reduce are built-in HOFs. Custom HOFs abstract cross-cutting logic — e.g., a withAuth wrapper that validates a JWT before invoking the inner handler. Express middleware and React HOCs follow the same pattern. HOFs enable reusable, composable behavior without duplicating boilerplate.`,
      keyPoints: [
        "Accepts and/or returns functions",
        "map, filter, reduce are classic examples",
        "Enables composition, middleware, and decorators",
        "Reduces duplication of cross-cutting concerns",
      ],
      example: {
        title: "withAuth HOF for Trip Planning API routes",
        code: `function withAuth(handler) {
  return async (req, res) => {
    const user = verifyJwt(req.headers.authorization);
    if (!user) return res.status(401).end();
    return handler(req, res, user);
  };
}
export const getTrips = withAuth(async (req, res, user) => { /* ... */ });`,
        language: "javascript",
        explanation:
          "Auth logic written once wraps every protected route handler without copying JWT checks into each function.",
      },
    },
  }),

  createQuestion({
    category: "javascript",
    question:
      "What is the difference between setTimeout(fn, 0) and Promise.resolve().then(fn)?",
    difficulty: "hard",
    tags: ["event-loop", "timers", "promises"],
    answers: {
      hinglish: `Dono code ko 'baad mein' chalate hain par event loop mein alag queue mein jaate hain. Promise.resolve().then(fn) microtask queue mein daalta hai — current sync code aur saari pending microtasks ke turant baad chalega. setTimeout(fn, 0) macrotask hai — pehle poori microtask queue drain hogi, phir timer callback, phir possibly render. Isliye .then hamesha setTimeout(0) se pehle execute hota hai.`,
      english: `Both defer execution but use different queues. Promise.resolve().then(fn) schedules a microtask that runs after the current synchronous code finishes and after all pending microtasks, but before the next macrotask or render. setTimeout(fn, 0) schedules a macrotask processed in a later event loop turn, after microtasks drain. Therefore .then always runs before setTimeout(0) in the same turn. In Swift Call, deferring UI updates with microtasks vs timers affects paint order after socket state changes.`,
      keyPoints: [
        "Promise.then → microtask queue (runs first)",
        "setTimeout(0) → macrotask queue (runs later)",
        "Microtasks fully drain before next macrotask",
        "Explains non-zero delay even for setTimeout(0)",
      ],
      example: {
        title: "Ordering after Socket.io state update in Swift Call",
        code: `socket.on("connected", () => {
  Promise.resolve().then(() => updateBadge("online"));  // microtask
  setTimeout(() => playConnectSound(), 0);              // macrotask
});
// Badge updates before sound; both after sync handler returns`,
        language: "javascript",
        explanation:
          "Microtask badge update paints before macrotask audio — important when batching DOM reads/writes after reconnect.",
      },
    },
  }),
];
