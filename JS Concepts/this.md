# `globalThis`, `window`, Global Scope, `var`, `let`, and `const` — Summary Notes

## 1. What is `globalThis`?

`globalThis` is the **standard JavaScript way to access the global object**, regardless of the environment.

```javascript
console.log(globalThis);
```

The global object depends on where JavaScript is running:

| Environment                     | Global object       |
| ------------------------------- | ------------------- |
| Browser main page               | `window`            |
| Node.js                         | `global`            |
| Web Worker                      | Worker global scope |
| Standard cross-environment name | `globalThis`        |

---

## 2. Why was `globalThis` introduced?

Before `globalThis`, different JavaScript environments used different names:

```javascript
window; // Browser

global; // Node.js

self;   // Web Worker
```

This made cross-platform JavaScript difficult.

Developers had to write code like:

```javascript
const root =
    typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : self;
```

Now they can simply use:

```javascript
const root = globalThis;
```

Therefore:

> `globalThis` provides one standard name for the global object across JavaScript environments.

---

## 3. Does `globalThis` always point to `window`?

### In a normal browser page

```javascript
console.log(globalThis === window);
```

Output:

```text
true
```

Therefore:

```javascript
globalThis.document === window.document; // true
```

---

### In Node.js

```javascript
globalThis === global; // true
```

There is no browser `window` object.

---

### In a Web Worker

```javascript
globalThis === self; // true
```

`window` is not available because a Web Worker does not represent a browser page.

---

### Main rule

> `globalThis` points to the global object of the **current JavaScript environment**.

It points to `window` only in the browser page's main environment.

---

# 4. `this` vs `globalThis`

They are not the same.

| `this`                       | `globalThis`                                                     |
| ---------------------------- | ---------------------------------------------------------------- |
| Depends on how code executes | Always refers to the current environment's global object         |
| Can be an object             | Represents the global object                                     |
| Can be `undefined`           | Does not become `undefined` because of function/module execution |
| Changes based on call style  | Does not depend on how a function is called                      |

Example inside a browser module:

```html
<script type="module">
    console.log(this);
    console.log(globalThis);
</script>
```

Output:

```text
undefined
Window
```

Why?

* Module top-level `this` is `undefined`.
* `globalThis` still provides access to the browser's global object.

---

# 5. Why not use top-level `this` to access the global object?

In a classic browser script:

```javascript
console.log(this === window); // true
```

So older code sometimes used:

```javascript
const root = this;
```

But inside a module:

```javascript
console.log(this); // undefined
```

Therefore:

```javascript
const root = this;

root.app = {};
```

fails in a module because:

```javascript
root === undefined;
```

`globalThis` works consistently:

```javascript
globalThis.app = {};
```

---

# 6. Global scope and global object are different

These concepts are related but not identical.

### Global scope

Global scope is the environment where top-level variables can be found by JavaScript's **scope lookup**.

Example:

```javascript
let userName = "John";

console.log(userName); // John
```

JavaScript finds `userName` through the global lexical environment.

---

### Global object

The global object is an object containing global properties and APIs.

In a browser:

```javascript
window;
```

or:

```javascript
globalThis;
```

Examples:

```javascript
globalThis.document;
globalThis.setTimeout;
globalThis.console;
```

---

## Important rule

> A variable being globally scoped does **not necessarily mean** it is a property of `window` or `globalThis`.

---

# 7. Top-level `var`, `let`, and `const` in a classic browser script

```html
<script>
    var age = 30;
    let userName = "John";
    const country = "India";
</script>
```

All three are accessible directly:

```javascript
console.log(age);      // 30
console.log(userName); // John
console.log(country);  // India
```

But their relationship with `window` is different.

```javascript
console.log(window.age);      // 30
console.log(window.userName); // undefined
console.log(window.country);  // undefined
```

Because:

| Declaration | Global scope? | Added to `window`? | Added to `globalThis`? |
| ----------- | ------------: | -----------------: | ---------------------: |
| `var`       |             ✅ |                  ✅ |                      ✅ |
| `let`       |             ✅ |                  ❌ |                      ❌ |
| `const`     |             ✅ |                  ❌ |                      ❌ |
| `class`     |             ✅ |                  ❌ |                      ❌ |

This behaviour applies to **top-level declarations in a classic browser script**.

---

# 8. Why does `var` become a `window` property?

Example:

```javascript
var age = 30;
```

At the top level of a classic browser script:

```javascript
window.age; // 30
```

Conceptually:

```text
Global Object (window)
        │
        └── age → 30
```

Therefore:

```javascript
age === window.age; // true
```

---

# 9. Why do `let` and `const` not become `window` properties?

Example:

```javascript
let userName = "John";

console.log(userName);        // John
console.log(window.userName); // undefined
```

`let` and `const` create **global lexical bindings**, not global-object properties.

Conceptually:

```text
Global Environment
│
├── Global Lexical Environment
│       ├── userName → "John"
│       └── country → "India"
│
└── Global Object (window/globalThis)
        ├── document
        ├── setTimeout
        ├── console
        └── var declarations
```

Therefore:

```javascript
userName;             // ✅ Found through scope lookup
window.userName;      // ❌ Not found as a window property
globalThis.userName;  // ❌ Not found as a globalThis property
```

---

# 10. Can `let` and `const` be accessed through `window`?

Not automatically.

```javascript
let userName = "John";

console.log(window.userName); // undefined
```

Since, in a normal browser page:

```javascript
window === globalThis; // true
```

the result is also:

```javascript
console.log(globalThis.userName); // undefined
```

So:

> If a top-level `let`/`const` variable is not a property of `window`, it is also not a property of `globalThis`.

---

# 11. Can you manually add a `let`/`const` value to `window`?

Yes.

```javascript
let userName = "John";

window.userName = userName;

console.log(window.userName); // John
```

Or:

```javascript
const country = "India";

globalThis.countryName = country;

console.log(globalThis.countryName); // India
```

You explicitly created properties on the global object.

---

# 12. Are the `let` variable and `window` property the same?

No. They are separate.

```javascript
let userName = "John";

window.userName = "David";

console.log(userName);        // John
console.log(window.userName); // David
```

Conceptually:

```text
Global lexical binding:
userName → "John"

Window property:
userName → "David"
```

They have the same name but are separate storage/binding mechanisms.

---

# 13. What happens in a JavaScript module?

```html
<script type="module">
    let userName = "John";
    const country = "India";
</script>
```

These variables are **module-scoped**.

They are not:

* Global variables
* Properties of `window`
* Properties of `globalThis`

Another script cannot directly access them:

```html
<script type="module">
    let userName = "John";
</script>

<script>
    console.log(userName);
</script>
```

Output:

```text
ReferenceError: userName is not defined
```

---

# 14. How should modules share variables?

Use `export` and `import`.

```javascript
// user.js

export const userName = "John";
```

```javascript
// app.js

import { userName } from "./user.js";

console.log(userName); // John
```

Modules share values explicitly rather than placing them in the global scope.

---

# 15. Final comparison

## Classic browser script

```javascript
var a = 1;
let b = 2;
const c = 3;
```

| Variable | Direct access | `window` | `globalThis` |
| -------- | ------------: | -------: | -----------: |
| `a`      |             ✅ |        ✅ |            ✅ |
| `b`      |             ✅ |        ❌ |            ❌ |
| `c`      |             ✅ |        ❌ |            ❌ |

---

## Browser module

```javascript
<script type="module">
    var a = 1;
    let b = 2;
    const c = 3;
</script>
```

| Variable | Inside module | Outside module | `window`/`globalThis` |
| -------- | ------------: | -------------: | --------------------: |
| `a`      |             ✅ |              ❌ |                     ❌ |
| `b`      |             ✅ |              ❌ |                     ❌ |
| `c`      |             ✅ |              ❌ |                     ❌ |

All top-level declarations in a module are **module-scoped**.

---

# Complete mental picture

```text
JavaScript runs in an environment
                │
                ▼
       Current global object
                │
      ┌─────────┼─────────┐
      │         │         │
 Browser      Node.js   Web Worker
      │         │         │
   window     global     self
      │         │         │
      └─────────┼─────────┘
                │
                ▼
           globalThis
```

For top-level variables in a **classic browser script**:

```text
var
 │
 ├── Global scope
 └── window/globalThis property

let / const
 │
 ├── Global lexical scope
 └── Not a window/globalThis property
```

## Final one-line rules

> **`globalThis` is the standard cross-environment reference to the current global object.**

> **In a normal browser page, `globalThis === window`.**

> **Top-level `var` in a classic script becomes a global-object property, but top-level `let` and `const` create global lexical bindings and do not automatically become `window`/`globalThis` properties.**

> **In modules, top-level `var`, `let`, and `const` are module-scoped.**
