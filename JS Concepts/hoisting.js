/*
    Hoisting: It means, variables and functions in JS can be accessed before 
        they are atually decalred in the code.

        -> How it happens is, in memory allocation phase all variables and functions 
            are allocated memory and check Execition context and so on.

        -> Functions declared with Variables will also be considered as variables.

        -> So, before the code execution the value of variables is undefined, 
            and functions is actual function copy.

        -> If any variable is not in the memory and tried to access, 
            it throws an error: Reference error: variable is not defined.
*/

console.log(x); //undefined
console.log(y) //ReferenceError: y is not defined

var x = 10;
console.log(x); //10

getName(); //Sukumar
console.log(getName1); //undefined
getName1(); //TypeError: getName1 is not a function

function getName() {
  console.log("Sukumar");
}
var getName1 = () => {
  console.log("Reddy");
};

getName(); //Sukumar
getName1(); //Reddy

/*

-> When ReferenceError: x is not defined - Does JS continue execution 
    or does it halts the execution?

| Condition                   | Will Script Continue? |
| --------------------------- | --------------------- |
| ReferenceError (uncaught)   | ❌ No, it halts        |
| ReferenceError inside `try` | ✅ Yes, after `catch`  |

*/

/*

**Hoisting** in JavaScript is the behavior where **declarations** are processed before the code is executed. 
It often appears as if variables and functions are "moved to the top" of their scope,
but that's just a conceptual model—the code isn't actually rearranged.

### 1. Hoisting with `var`

`var` declarations are hoisted and initialized with `undefined`.

```javascript
console.log(a); // undefined
var a = 10;
console.log(a); // 10
```

JavaScript treats it roughly like this:

```javascript
var a;          // Hoisted declaration
console.log(a); // undefined
a = 10;
console.log(a); // 10
```

---

### 2. Hoisting with `let` and `const`

`let` and `const` are also hoisted, but they are **not initialized** until their declaration is reached. The time between entering the scope and the declaration is called the **Temporal Dead Zone (TDZ)**.

```javascript
console.log(b); // ReferenceError
let b = 20;
```

```javascript
console.log(c); // ReferenceError
const c = 30;
```

**Why?**

The variables exist in memory but cannot be accessed before their declaration.

---

### 3. Hoisting with Function Declarations

Function declarations are fully hoisted, so you can call them before they are defined.

```javascript
greet();

function greet() {
    console.log("Hello!");
}
```

**Output:**

```
Hello!
```

---

### 4. Hoisting with Function Expressions

If a function is assigned to a variable using `var`, only the variable is hoisted.

```javascript
sayHi(); // TypeError

var sayHi = function () {
    console.log("Hi");
};
```

Internally:

```javascript
var sayHi;

sayHi(); // undefined is not a function

sayHi = function () {
    console.log("Hi");
};
```

---

### 5. Function Expressions with `let` or `const`

```javascript
sayHello(); // ReferenceError

const sayHello = function () {
    console.log("Hello");
};
```

The variable is in the TDZ until its declaration.

---

## Summary Table

| Declaration Type                    | Hoisted       | Initialized     | Access Before Declaration |
| ----------------------------------- | ------------- | --------------- | ------------------------- |
| `var`                               | ✅ Yes         | `undefined`     | ✅ Returns `undefined`     |
| `let`                               | ✅ Yes         | No (TDZ)        | ❌ ReferenceError          |
| `const`                             | ✅ Yes         | No (TDZ)        | ❌ ReferenceError          |
| Function Declaration                | ✅ Yes         | Entire function | ✅ Can call normally       |
| Function Expression (`var`)         | Variable only | `undefined`     | ❌ TypeError               |
| Function Expression (`let`/`const`) | Variable only | No (TDZ)        | ❌ ReferenceError          |

### Interview Definition

> **Hoisting is JavaScript's behavior of processing declarations before code execution.**
>
> * `var` declarations are hoisted and initialized with `undefined`.
> * `let` and `const` declarations are hoisted but remain in the **Temporal Dead Zone (TDZ)** until their declaration is executed.
> * Function declarations are completely hoisted, allowing them to be called before they appear in the code.

### Example Covering Everything

```javascript
console.log(x);   // undefined
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError

foo();            // "Function Declaration"

// bar();         // TypeError
// baz();         // ReferenceError

var x = 10;
let y = 20;
const z = 30;

function foo() {
    console.log("Function Declaration");
}

var bar = function () {
    console.log("Function Expression with var");
};

const baz = function () {
    console.log("Function Expression with const");
};
```

The key idea to remember is: **only declarations are hoisted, not initializations.**

*/