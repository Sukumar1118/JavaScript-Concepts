This is a broad topic that covers much of JavaScript's variable system. The easiest way to understand it is to think like the JavaScript engine.

---

# 1. The Three Keywords

| Keyword | Scope             | Redeclare | Reassign | Hoisted | TDZ | Window Object       |
| ------- | ----------------- | --------- | -------- | ------- | --- | ------------------- |
| var     | Function / Global | ✅ Yes     | ✅ Yes    | Yes     | ❌   | Yes (global script) |
| let     | Block             | ❌ No      | ✅ Yes    | Yes     | ✅   | ❌                   |
| const   | Block             | ❌ No      | ❌        | Yes     | ✅   | ❌                   |

---

# 2. What happens internally?

Consider

```js
let age = 25;
```

JavaScript does **NOT** simply store `age`.

It creates a **binding**.

Think of it like

```
Variable Environment

age
 │
 ▼
Binding
 │
 ▼
25
```

The variable name doesn't directly contain the value.

Instead

```
identifier
     │
     ▼
binding(record)
     │
     ▼
value
```

This is why reassignment works.

```
let age = 25;

age = 30;
```

Only the binding changes.

```
Before

age
 │
 ▼
25

After

age
 │
 ▼
30
```

The identifier remains the same.

---

# 3. What is a Binding?

A binding is simply

> association between variable name and value/reference.

```
let x = 10;
```

Binding

```
"x"
 ↓
10
```

Object

```
const user = {};

"user"
   ↓
reference
   ↓
Object
```

---

# 4. Primitive vs Object Binding

Primitive

```
let a = 10;

a
 ↓
10
```

Object

```
let obj = {
   name:"John"
}

obj
 ↓
0x100
 ↓
{name:"John"}
```

Binding stores a reference.

Not the object itself.

---

# 5. var

Example

```js
var x = 10;

var x = 20;

console.log(x);
```

Output

```
20
```

Redeclaration allowed.

---

Reassignment

```js
var x = 10;

x = 30;
```

Binding now points to

```
30
```

---

# 6. let

```js
let x = 10;

x = 30;
```

Allowed.

Binding updated.

But

```js
let x = 10;

let x = 20;
```

Syntax Error

```
Identifier 'x' has already been declared
```

Because same scope already contains binding.

---

# 7. const

```js
const x = 10;

x = 20;
```

Output

```
TypeError
```

Binding cannot point somewhere else.

---

Internally

```
x
 ↓
10
```

Engine marks binding as immutable.

---

# 8. Why const object can be modified?

```js
const obj = {
    age:20
};

obj.age = 30;
```

Works.

Because

Binding never changes.

```
obj
 ↓
0x100
 ↓
{
 age:20
}
```

Property changes

```
obj
 ↓
0x100
 ↓
{
 age:30
}
```

Reference didn't change.

---

But

```js
obj = {};
```

Output

```
TypeError
```

Now binding tries pointing elsewhere.

```
Old

obj
 ↓
0x100

New

obj
 ↓
0x200
```

Not allowed.

---

# 9. Arrays

```js
const arr = [1,2];

arr.push(3);
```

Allowed.

Reference same.

```
arr
 ↓
0x100

[1,2]
```

After

```
arr
 ↓
0x100

[1,2,3]
```

---

But

```js
arr = [];
```

TypeError

---

# 10. Why?

Because const protects

**binding**

NOT

object contents.

---

# 11. Scope

Global

```
var a = 10;

let b = 20;

const c = 30;
```

```
Global Scope

a

b

c
```

---

Function

```js
function test(){

    let x=10;

}
```

Only visible inside.

---

Block

```js
{

let x=10;

}
```

Outside

```
ReferenceError
```

---

# 12. var Scope

```js
{

var x=10;

}

console.log(x);
```

Output

```
10
```

Because var ignores blocks.

Only function matters.

---

# 13. Function Scope

```js
function test(){

var x=10;

}

console.log(x);
```

ReferenceError

Function scope.

---

# 14. Loop Scope

```js
for(let i=0;i<3;i++){

}
```

i exists only loop block.

---

With var

```js
for(var i=0;i<3;i++){

}

console.log(i);
```

Output

```
3
```

Same function scope.

---

# 15. Closures in Loop

```js
for(var i=0;i<3;i++){

setTimeout(()=>{

console.log(i);

});

}
```

Output

```
3
3
3
```

Single binding.

```
i
 ↓
0→1→2→3
```

Callbacks share same binding.

---

let

```js
for(let i=0;i<3;i++){

setTimeout(()=>{

console.log(i);

});

}
```

Output

```
0
1
2
```

Engine creates new binding every iteration.

```
Iteration1

i→0

Iteration2

i→1

Iteration3

i→2
```

---

# 16. Hoisting

All declarations are hoisted.

```
var

let

const

function
```

All.

Difference is initialization.

---

var

Creation phase

```
x

↓

undefined
```

---

let

```
binding created

not initialized
```

---

const

Same.

Binding exists.

Not initialized.

---

# 17. TDZ

Temporal Dead Zone

```js
console.log(a);

let a=10;
```

Binding exists.

Cannot access.

```
ReferenceError
```

Timeline

```
Start

↓

binding created

↓

TDZ

↓

initialization

↓

usable
```

---

# 18. var Hoisting

```js
console.log(x);

var x=10;
```

Equivalent

```js
var x;

console.log(x);

x=10;
```

Output

```
undefined
```

---

# 19. let Hoisting

```js
console.log(x);

let x=10;
```

Output

```
ReferenceError
```

Because

```
binding exists

↓

TDZ
```

---

# 20. const Hoisting

```js
console.log(x);

const x=10;
```

Same.

ReferenceError.

---

# 21. Why TDZ exists?

To prevent accidental usage before initialization.

Imagine

```js
price = price + tax;

let price=100;
```

Without TDZ

Engine would use garbage or undefined.

TDZ prevents bugs.

---

# 22. Redeclaration

```js
var x;

var x;
```

OK.

---

```js
let x;

let x;
```

Syntax Error.

---

```js
const x=10;

const x=20;
```

Syntax Error.

---

# 23. Reassignment

```js
var x=10;

x=20;
```

OK

---

```js
let x=10;

x=20;
```

OK

---

```js
const x=10;

x=20;
```

TypeError

---

# 24. Shadowing

```js
let x=10;

{

let x=20;

console.log(x);

}

console.log(x);
```

Output

```
20

10
```

Two bindings.

```
Outer

x→10

Inner

x→20
```

---

# 25. var Shadowing

```js
var x=10;

function test(){

var x=20;

}
```

Allowed.

Different function scope.

---

Inside block

```js
var x=10;

{

var x=20;

}

console.log(x);
```

Output

```
20
```

Same variable.

---

# 26. Illegal Shadowing

```js
let x=10;

{

var x=20;

}
```

Syntax Error.

Reason

var wants enclosing function/global scope, which conflicts with existing `let` binding in that scope.

---

But

```js
var x=10;

{

let x=20;

}
```

Allowed.

---

# 27. Global Variables

```js
var a=10;
```

Creates

```
Global Object

window.a
```

Browser

```
window.a===10
```

True.

---

let

```js
let b=20;
```

```
window.b
```

undefined.

Because stored in global lexical environment.

---

const

Same.

---

# 28. Functions

Function declarations

```js
hello();

function hello(){

}
```

Works.

Fully initialized during creation phase.

---

Function expressions

```js
hello();

var hello=function(){};
```

Output

```
TypeError

hello is not a function
```

Because

```
hello

↓

undefined
```

---

With let

```
ReferenceError
```

Because TDZ.

---

# 29. Undefined vs ReferenceError

Undefined

Variable exists.

Value absent.

Example

```js
var x;

console.log(x);
```

Output

```
undefined
```

---

ReferenceError

Variable doesn't exist **or** is in TDZ.

```js
console.log(y);
```

Output

```
ReferenceError
```

---

```js
console.log(a);

let a=10;
```

ReferenceError.

---

# 30. SyntaxError vs TypeError vs ReferenceError

### SyntaxError

Code cannot be parsed.

```js
let a;

let a;
```

```
SyntaxError
```

Another example:

```js
const x;
```

```
SyntaxError: Missing initializer in const declaration
```

---

### ReferenceError

Binding is unavailable.

```js
console.log(a);
```

```
ReferenceError
```

or

```js
console.log(x);

let x=10;
```

```
ReferenceError
```

---

### TypeError

Operation is invalid for an existing value.

```js
const x=10;

x=20;
```

```
TypeError
```

Another example:

```js
null.toString();
```

```
TypeError
```

---

# 31. Memory Model (JavaScript Engine View)

When the engine executes:

```js
const person = { name: "Alice" };
let age = 25;
```

A simplified internal view is:

```
Lexical Environment
────────────────────────────────────
person ──────► Binding (immutable)
                  │
                  ▼
               0x100
                  │
                  ▼
          { name: "Alice" }

age ─────────► Binding (mutable)
                  │
                  ▼
                 25
```

If you execute:

```js
person.name = "Bob";
```

Only the object in heap memory changes:

```
Binding
   │
   ▼
 0x100
   │
   ▼
{ name: "Bob" }
```

The binding still points to `0x100`, so `const` is not violated.

If you execute:

```js
person = {};
```

The engine would need to change the binding:

```
Old:
person ─► 0x100

New:
person ─► 0x200
```

Since `const` bindings are immutable, it throws a **TypeError**.

---

# 32. Common Interview Tricky Questions

| Code                                                    | Output           | Reason                                           |
| ------------------------------------------------------- | ---------------- | ------------------------------------------------ |
| `console.log(x); var x = 10;`                           | `undefined`      | `var` is hoisted and initialized to `undefined`. |
| `console.log(x); let x = 10;`                           | `ReferenceError` | `let` is in the TDZ.                             |
| `console.log(x); const x = 10;`                         | `ReferenceError` | `const` is also in the TDZ.                      |
| `const obj = {}; obj.a = 1;`                            | Works            | Object contents can change; binding doesn't.     |
| `const obj = {}; obj = {};`                             | `TypeError`      | Attempt to reassign an immutable binding.        |
| `{ var x = 1; } console.log(x);`                        | `1`              | `var` is function-scoped, not block-scoped.      |
| `{ let x = 1; } console.log(x);`                        | `ReferenceError` | `let` is block-scoped.                           |
| `var x = 1; var x = 2;`                                 | Works            | `var` allows redeclaration.                      |
| `let x = 1; let x = 2;`                                 | `SyntaxError`    | Duplicate declaration in the same scope.         |
| `for (var i=0;i<3;i++) setTimeout(()=>console.log(i));` | `3 3 3`          | One shared binding for `i`.                      |
| `for (let i=0;i<3;i++) setTimeout(()=>console.log(i));` | `0 1 2`          | A fresh binding is created each iteration.       |

## Final Mental Model

Whenever you see `var`, `let`, or `const`, imagine the JavaScript engine following these steps:

1. **Parse the code** and build the lexical scopes.
2. **Create bindings** for every declared variable during the creation phase.
3. **Initialize**:

   * `var` → initialized immediately with `undefined`.
   * `let`/`const` → bindings created but left uninitialized (TDZ).
   * Function declarations → fully initialized with the function object.
4. During execution:

   * Assign values or references to bindings.
   * `let` bindings can point to new values.
   * `const` bindings cannot point to a different value/reference after initialization.
5. For objects and arrays, the binding stores a **reference**, so modifying the object's contents is allowed, but changing the reference itself is not for `const`.

This binding-based model explains almost every behavior of `var`, `let`, and `const`, including scope, hoisting, TDZ, closures, shadowing, redeclaration, reassignment, and the different kinds of runtime and compile-time errors.
