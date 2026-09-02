import type { Question } from "@/types/question";
import { createQuestion } from "./helpers";

export const codingQuestions: Question[] = [
  createQuestion({
    category: "coding",
    question: "Reverse a string without using built-in functions",
    difficulty: "easy",
    tags: ["strings", "loops", "javascript"],
    answers: {
      hinglish:
        "Built-in reverse() ya split().reverse().join() use mat karo. Loop chalao — start aur end pointers se characters swap karte jao, ya naya string banao last character se pehle tak iterate karke. Time complexity O(n), space O(n) agar naya string banate ho.",
      english:
        "Avoid built-in reverse helpers. Use a two-pointer approach swapping characters from both ends, or iterate from the last index and build a new string. Time complexity is O(n); space is O(n) if you allocate a new string.",
      keyPoints: [
        "Two-pointer swap works in-place on a char array",
        "Loop from str.length - 1 down to 0 for a new string",
        "Handle empty strings and single-character inputs",
        "Time: O(n), Space: O(n) for immutable strings",
      ],
      example: {
        title: "Two-pointer reverse",
        language: "javascript",
        code: `function reverseString(str) {
  const chars = str.split("");
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join("");
}

reverseString("hello"); // "olleh"`,
        explanation:
          "Characters ko array mein convert karke start/end se swap karte hain jab tak pointers cross na ho jayein. Built-in reverse() use nahi kiya.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Find the first non-repeating character in a string",
    difficulty: "medium",
    tags: ["strings", "hash-map", "javascript"],
    answers: {
      hinglish:
        "Pehle frequency count karo — Map ya object se har character ki count store karo. Phir string ko left se right scan karo aur pehla character dhundho jiska count 1 ho. Agar koi nahi mila to null return karo.",
      english:
        "First pass: count frequency of each character using a Map or object. Second pass: scan left to right and return the first character with count 1. Return null if none exists.",
      keyPoints: [
        "Two-pass approach: count then scan",
        "Map preserves insertion order in modern JS",
        "Edge case: empty string returns null",
        "Time: O(n), Space: O(k) where k = unique chars",
      ],
      example: {
        title: "Frequency map approach",
        language: "javascript",
        code: `function firstNonRepeating(str) {
  const freq = new Map();

  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  for (const char of str) {
    if (freq.get(char) === 1) return char;
  }

  return null;
}

firstNonRepeating("swiss");   // "w"
firstNonRepeating("aabbcc");  // null`,
        explanation:
          "Pehle loop mein har character ki frequency store hoti hai, doosre loop mein pehla unique character milta hai.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Flatten a nested array",
    difficulty: "medium",
    tags: ["arrays", "recursion", "javascript"],
    answers: {
      hinglish:
        "Nested array ko single level array mein convert karna hai. Recursion use karo — har element check karo, agar array hai to usko recursively flatten karo, warna result mein push karo. Iterative approach ke liye stack bhi use kar sakte ho.",
      english:
        "Convert a nested array into a single-level array. Use recursion: for each element, if it is an array, flatten it recursively; otherwise push it to the result. An iterative stack-based approach also works.",
      keyPoints: [
        "Array.isArray() checks nesting",
        "Recursive or iterative with stack",
        "flat(Infinity) exists but interview mein manual likho",
        "Time: O(n) total elements, Space: O(depth) for recursion",
      ],
      example: {
        title: "Recursive flatten",
        language: "javascript",
        code: `function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]`,
        explanation:
          "Har nested array ko recursively flatten karke spread se result mein merge karte hain.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Implement debounce function",
    difficulty: "hard",
    tags: ["javascript", "closures", "performance"],
    answers: {
      hinglish:
        "Debounce ka matlab hai function tab hi call ho jab user action ruk jaye — jaise search input mein har keystroke pe API hit nahi karni. setTimeout use karo, har naye call pe purana timer clear karo. Leading/trailing edge options bhi discuss kar sakte ho.",
      english:
        "Debounce delays function execution until the user stops triggering it — e.g. wait until typing pauses before calling the API. Use setTimeout and clear the previous timer on each new invocation. Optionally support leading/trailing edge behavior.",
      keyPoints: [
        "Closure stores timer reference",
        "clearTimeout on every new call",
        "Return a wrapped function preserving this context",
        "Common use: search input, window resize",
      ],
      example: {
        title: "Trailing debounce",
        language: "javascript",
        code: `function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage
const handleSearch = debounce((query) => {
  console.log("Searching:", query);
}, 300);

input.addEventListener("input", (e) => handleSearch(e.target.value));`,
        explanation:
          "Har naye event pe purana timer cancel hota hai; function sirf tab run hota hai jab delay ke baad koi naya call na aaye.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Deep clone an object",
    difficulty: "hard",
    tags: ["javascript", "objects", "recursion"],
    answers: {
      hinglish:
        "Shallow copy se nested objects share hote hain — deep clone mein har level copy karna padta hai. Recursion se arrays aur plain objects handle karo. Date, Map, Set jaise special types alag se handle karo. structuredClone() modern browsers mein available hai par interview mein manual likhna better hai.",
      english:
        "Shallow copies share nested references — deep clone copies every level. Recursively handle arrays and plain objects. Handle special types like Date, Map, and Set separately. structuredClone() exists in modern environments but a manual solution is expected in interviews.",
      keyPoints: [
        "Distinguish arrays vs plain objects",
        "Handle null and primitives early",
        "Watch circular references (WeakMap for visited nodes)",
        "Date/RegExp need custom cloning logic",
      ],
      example: {
        title: "Recursive deep clone",
        language: "javascript",
        code: `function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);

  const cloned = {};
  for (const key of Object.keys(value)) {
    cloned[key] = deepClone(value[key]);
  }
  return cloned;
}

const original = { a: 1, b: { c: [1, 2] } };
const copy = deepClone(original);
copy.b.c.push(3);
console.log(original.b.c); // [1, 2] — unchanged`,
        explanation:
          "Primitives return as-is; arrays aur objects recursively clone hote hain taaki nested references share na hon.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Group anagrams from an array of strings",
    difficulty: "medium",
    tags: ["strings", "hash-map", "sorting"],
    answers: {
      hinglish:
        "Anagrams ke letters same hote hain bas order alag — har string ko sort karke key banao aur Map mein group karo. Alternative: har character ki frequency count karke key bana sakte ho (better for long strings).",
      english:
        "Anagrams share the same letters in different order — sort each string to form a key and group entries in a Map. Alternatively, use a character frequency signature as the key (better for long strings).",
      keyPoints: [
        "Sorted string as Map key",
        "Frequency count avoids sorting overhead",
        "Return Object.values(map) or [...map.values()]",
        "Time: O(n * k log k) with sort, k = word length",
      ],
      example: {
        title: "Sort-as-key grouping",
        language: "javascript",
        code: `function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }

  return [...map.values()];
}

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]`,
        explanation:
          "Sorted characters se unique key banti hai; same key wale words ek group mein push hote hain.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Implement a function to check for palindrome",
    difficulty: "easy",
    tags: ["strings", "two-pointer", "javascript"],
    answers: {
      hinglish:
        "Palindrome woh string hai jo ulta padhne pe bhi same ho — jaise 'madam'. Two pointers use karo: start aur end compare karo, match na ho to false return karo. Spaces aur case ignore karna ho to pehle normalize karo.",
      english:
        "A palindrome reads the same forwards and backwards — e.g. 'madam'. Use two pointers comparing start and end; return false on mismatch. Normalize by removing spaces and lowercasing if required.",
      keyPoints: [
        "Two-pointer from both ends",
        "Normalize: toLowerCase(), remove non-alphanumeric",
        "Single char and empty string are palindromes",
        "Time: O(n), Space: O(1) without normalization copy",
      ],
      example: {
        title: "Two-pointer palindrome check",
        language: "javascript",
        code: `function isPalindrome(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

isPalindrome("A man, a plan, a canal: Panama"); // true
isPalindrome("hello"); // false`,
        explanation:
          "String normalize karke dono ends se compare karte hain jab tak pointers middle mein na mil jayein.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Find the intersection of two arrays",
    difficulty: "easy",
    tags: ["arrays", "set", "javascript"],
    answers: {
      hinglish:
        "Do arrays mein common elements dhundhne hain. Chhote array ko Set mein daalo, bade array par loop chalao — jo element Set mein ho use result mein add karo aur Set se delete karo taaki duplicates na aayein.",
      english:
        "Find elements common to both arrays. Put the smaller array into a Set, iterate the larger array, and add elements found in the Set to the result — remove from the Set to avoid duplicates.",
      keyPoints: [
        "Set gives O(1) lookup",
        "Use smaller array for Set to save memory",
        "Remove from Set to handle duplicates",
        "Time: O(n + m), Space: O(min(n, m))",
      ],
      example: {
        title: "Set-based intersection",
        language: "javascript",
        code: `function intersection(a, b) {
  const set = new Set(a);
  const result = [];

  for (const num of b) {
    if (set.has(num)) {
      result.push(num);
      set.delete(num);
    }
  }

  return result;
}

intersection([1, 2, 2, 3], [2, 2, 4]); // [2]`,
        explanation:
          "Set se fast lookup milti hai; match hone par element result mein jata hai aur Set se hata diya jata hai duplicate avoid karne ke liye.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Implement a custom range slider in React",
    difficulty: "hard",
    tags: ["react", "ui", "accessibility"],
    answers: {
      hinglish:
        "Controlled component banao — value state mein rakho, input type range ya custom div track use karo. onChange se value update karo, min/max/step props expose karo. Accessibility ke liye aria-valuenow, aria-valuemin, aria-valuemax lagao aur keyboard support do.",
      english:
        "Build a controlled component — keep value in state, use a native range input or a custom track div. Update value on change, expose min/max/step props. Add aria-valuenow, aria-valuemin, aria-valuemax and keyboard support for accessibility.",
      keyPoints: [
        "Controlled input with useState",
        "CSS for custom thumb/track styling",
        "Clamp value between min and max",
        "ARIA attributes for screen readers",
      ],
      example: {
        title: "Custom RangeSlider component",
        language: "tsx",
        code: `import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />
      <span>{value}</span>
    </div>
  );
}`,
        explanation:
          "Controlled range input with state, typed props, and ARIA labels — CSS se thumb/track customize kar sakte ho.",
      },
    },
  }),

  createQuestion({
    category: "coding",
    question: "Build an autocomplete/search box with API integration",
    difficulty: "hard",
    tags: ["react", "api", "debounce"],
    answers: {
      hinglish:
        "Search input ke saath debounced API call lagao taaki har keystroke pe request na jaye. Loading, error aur empty states handle karo. Results ko dropdown mein dikhao, keyboard navigation (arrow keys, Enter) add karo. AbortController se purani requests cancel karo race condition avoid karne ke liye.",
      english:
        "Attach a debounced API call to the search input so every keystroke does not fire a request. Handle loading, error, and empty states. Show results in a dropdown with keyboard navigation. Cancel stale requests with AbortController to avoid race conditions.",
      keyPoints: [
        "Debounce input (300–500ms)",
        "AbortController cancels in-flight requests",
        "Loading / error / no-results UI states",
        "Click outside or Escape to close dropdown",
      ],
      example: {
        title: "Debounced autocomplete with fetch",
        language: "tsx",
        code: `import { useState, useEffect, useRef } from "react";

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(\`/api/search?q=\${encodeURIComponent(debouncedQuery)}\`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setResults(data.results))
      .catch((err) => {
        if (err.name !== "AbortError") setResults([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
        explanation:
          "Debounce se API calls kam hoti hain; AbortController purani requests cancel karta hai jab user tezi se type kare.",
      },
    },
  }),
];
